<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of model_gateway
 *
 * @author Administrator
 */
include dirname(__FILE__) . '/../controllers/vendor/autoload.php';

use GatewayWorker\Lib\Gateway;

class model_gateway {

    function __construct() {
        Gateway::$registerAddress = '127.0.0.1:1238';
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

    /*
     * 获取某个分组所有在线client_id列表。
     * group 
     */

    public function getClientIdListByGroup($group = 0) {
        return GateWay::getClientIdListByGroup($group);
    }

}

?>
