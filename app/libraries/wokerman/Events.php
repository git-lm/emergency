<?php

/**
 * This file is part of workerman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link http://www.workerman.net/
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 * 用于检测业务代码死循环或者长时间阻塞等问题
 * 如果发现业务卡死，可以将下面declare打开（去掉//注释），并执行php start.php reload
 * 然后观察一段时间workerman.log看是否有process_timeout异常
 */
//declare(ticks=1);

use \GatewayWorker\Lib\Gateway;

/**
 * 主逻辑
 * 主要是处理 onConnect onMessage onClose 三个方法
 * onConnect 和 onClose 如果不需要可以不用实现并删除
 */
class Events {

    /**
     * 当客户端连接时触发
     * 为了绑定uid  为 client_id 
     * 
     * @param int $client_id 连接id
     */
    public static function onConnect($client_id) {
        echo $client_id;
        // 向当前client_id发送数据 
        $resjson['type'] = 'login';
        $resjson['client_id'] = $client_id;
        Gateway::sendToClient($client_id, json_encode($resjson));
    }

    /**
     * 当客户端发来消息时触发
     * @param int $client_id 连接id
     * @param mixed $message 具体消息
     */
    public static function onMessage($client_id, $message) {

        // 客户端传递的是json数据
        $message_data = json_decode($message, true);
        if (!$message_data) {
            return;
        }

        // 根据类型执行不同的业务
        switch ($message_data['type']) {
            // 客户端回应服务端的心跳
            case 'pong':
                return;
            // 客户端登录 message格式: {type:login, name:xx, room_id:1} ，添加到客户端，广播给所有客户端xx进入聊天室
            case 'login':
                // 判断是否有房间号
                if (!isset($message_data['room_id'])) {
                    throw new \Exception("\$message_data['room_id'] not set. client_ip:{$_SERVER['REMOTE_ADDR']} \$message:$message");
                }

                // 把房间号昵称放到session中
                $room_id = $message_data['room_id'];
                // echo  $room_id ;
                $client_name = htmlspecialchars($message_data['client_name']);
                $_SESSION['room_id'] = $room_id;
                $_SESSION['client_name'] = $client_name;
                // echo  $client_name ;
                // 获取房间内所有用户列表 
                $clients_list = Gateway::getClientSessionsByGroup($room_id);
                foreach ($clients_list as $tmp_client_id => $item) {
                    $clients_list[$tmp_client_id] = $item['client_name'];
                }
                $clients_list[$client_id] = $client_name;

                // 转播给当前房间的所有客户端，xx进入聊天室 message {type:login, client_id:xx, name:xx} 
                $new_message = array('type' => $message_data['type'], 'client_id' => $client_id, 'client_name' => htmlspecialchars($client_name), 'time' => date('Y-m-d H:i:s'));
                Gateway::sendToGroup($room_id, json_encode($new_message));
                Gateway::joinGroup($client_id, $room_id);

                // 给当前用户发送用户列表 
                $new_message['client_list'] = $clients_list;
                Gateway::sendToCurrentClient(json_encode($new_message));
                return;

            // 客户端发言 message: {type:say, to_client_id:xx, content:xx}
            case 'say':
                // 非法请求
                if (!isset($_SESSION['room_id'])) {
                    throw new \Exception("\$_SESSION['room_id'] not set. client_ip:{$_SERVER['REMOTE_ADDR']}");
                }
                $room_id = $_SESSION['room_id'];
                $client_name = $_SESSION['client_name'];

                // 私聊
                if ($message_data['to_client_id'] != 'all') {
                    $new_message = array(
                        'type' => 'say',
                        'from_client_id' => $client_id,
                        'from_client_name' => $client_name,
                        'to_client_id' => $message_data['to_client_id'],
                        'content' => "<b>对你说: </b>" . nl2br(htmlspecialchars($message_data['content'])),
                        'time' => date('Y-m-d H:i:s'),
                    );
                    Gateway::sendToClient($message_data['to_client_id'], json_encode($new_message));
                    $new_message['content'] = "<b>你对" . htmlspecialchars($message_data['to_client_name']) . "说: </b>" . nl2br(htmlspecialchars($message_data['content']));
                    return Gateway::sendToCurrentClient(json_encode($new_message));
                }

                $new_message = array(
                    'type' => 'say',
                    'from_client_id' => $client_id,
                    'from_client_name' => $client_name,
                    'to_client_id' => 'all',
                    'content' => nl2br(htmlspecialchars($message_data['content'])),
                    'time' => date('Y-m-d H:i:s'),
                );
                return Gateway::sendToGroup($room_id, json_encode($new_message));
        }




        // 向所有人发送 
        Gateway::sendToAll("$client_id said $message\r\n");
    }

    /**
     * 当用户断开连接时触发
     * @param int $client_id 连接id
     */
    public static function onClose($client_id) {
        // 向所有人发送 
        GateWay::sendToAll("$client_id logout\r\n");
    }

    /*
     * 向所有客户端或者client_id_array指定的客户端发送$send_data数据。如果指定的$client_id_array中的client_id不存在则自动丢弃
     * send_data    要发送的数据（字符串类型），此数据会被Gateway所使用协议的encode方法打包后发送给客户端
     * client_id_array 指定向哪些client_id发送，如果不传递该参数，则是向所有在线客户端发送 $send_data 数据
     */

    public function sendToAll($send_data = '', $client_id_array = null) {
        GateWay::sendToAll($send_data, $client_id_array);
    }

    /*
     * 向客户端client_id发送$send_data数据。如果client_id对应的客户端不存在或者不在线则自动丢弃发送数据
     * send_data    要发送的数据（字符串类型），此数据会被Gateway所使用协议的encode方法打包后发送给客户端
     * client_id  客户端连接的client_id
     */

    public function sendToClient($client_id = '', $send_data = '') {
        GateWay::sendToClient($client_id, $send_data);
    }

    /*
     * 断开与client_id对应的客户端的连接
     * client_id    全局唯一标识客户端连接的id
     */

    public function closeClient($client_id = '') {
        GateWay::sendToClient($client_id);
    }

    /*
     * 判断$client_id是否还在线
     * client_id    全局唯一标识客户端连接的id
     * 在线返回1，不在线返回0
     */

    public function isOnline($client_id = '') {
        return GateWay::isOnline($client_id);
    }

    /*
     * 将client_id与uid绑定，以便通过Gateway::sendToUid($uid)发送数据，通
     * client_id    客户端的client_id
     * uid  uid,可以是数字或者字符串。
     */

    public function bindUid($client_id = '', $uid = '') {
        GateWay::bindUid($client_id, $uid);
    }

    /*
     * 将client_id与uid解绑。
     * client_id    客户端的client_id
     * uid  uid,可以是数字或者字符串。
     */

    public function unbindUid($client_id = '', $uid = '') {
        GateWay::unbindUid($client_id, $uid);
    }

    /*
     * 判断$uid是否在线，此方法需要配合Gateway::bindUid($client_uid, $uid)使用。
     * uid  uid,可以是数字或者字符串。
     * uid在线返回1，不在线返回0
     */

    public function isUidOnline($uid = '') {
        return GateWay::isUidOnline($uid);
    }

    /*
     * 返回一个数组，数组元素为与uid绑定的所有在线的client_id。如果没有在线的client_id则返回一个空数组
     * 此方法可以判断一个uid是否在线。
     * uid  uid,可以是数字或者字符串。
     * 返回一个client_id的数组
     */

    public function getClientIdByUid($uid = '') {
        return GateWay::getClientIdByUid($uid);
    }

    /*
     * 返回client_id绑定的uid，如果client_id没有绑定uid，则返回null。
     * client_id  
     * 返回字符串或者数字，返回类型取决于之前执行bindUid绑定的uid的数据类型
     */

    public function getUidByClientId($client_id = '') {
        return GateWay::getUidByClientId($client_id);
    }

    /*
     * 向uid绑定的所有在线client_id发送数据。
     * uid
     * message  
     */

    public function sendToUid($uid = '', $message = '') {
        GateWay::sendToUid($uid, $message);
    }

    /*
     * 将client_id加入某个组，以便通过Gateway::sendToGroup发送数据。
     * client_id 客户端的client_id
     * group 只能是数字或者字符串。
     * 注意:group不能为空值。例如0,0.0,'0',"0",false,null是非法的group值。  
     */

    public function joinGroup($client_id = '', $group = '') {
        GateWay::joinGroup($client_id, $group);
    }

    /*
     * 将client_id从某个组中删除，不再接收该分组广播(Gateway::sendToGroup)发送的数据。
     * client_id 客户端的client_id
     * group 只能是数字或者字符串。
     * 注意:group不能为空值。例如0,0.0,'0',"0",false,null是非法的group值。  
     */

    public function leaveGroup($client_id = '', $group = '') {
        GateWay::leaveGroup($client_id, $group);
    }

    /*
     * 将client_id从某个组中删除，不再接收该分组广播(Gateway::sendToGroup)发送的数据。
     * group group可以是字符串、数字、或者数组。如果为数组，则是给数组内所有group发送数据
     * message 要发送的数据（字符串类型），此数据会被Gateway所使用协议的encode方法打包后再发送给客户端
     * exclude_client_id  client_id组成的数组。$exclude_client_id数组中指定的client_id将被排除在外，不会收到本次发的消息 
     */

    public function sendToGroup($group = '', $message = '') {
        GateWay::sendToGroup($group, $message);
    }

}
