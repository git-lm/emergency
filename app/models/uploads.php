<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of uploads
 *
 * @author Administrator
 */
class Uploads extends CI_Model {

    /**
     * 
     * @param type $imgs 文件数组数据
     * @param string $path 文件保存地址
     * @param type $type 文件类型  photo 表示图片  其他表示文件
     * @return boolean|string
     */
    public function savefile($imgs) {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        if (empty($imgs) || empty($imgs["type"]) || empty($imgs["name"])) {
            return false;
        } else {
            $path = "assets/"; //上传路径


            if (!file_exists($path)) {
                //检查是否有该文件夹，如果没有就创建，并给予最高权限
                mkdir("$path", 0700);
            }//END IF
            //允许上传的文件格式

            $tp = array("image/gif", "image/pjpeg", "image/jpeg", "image/png", "image/jpg,application/zip",
                "application/octet-stream", "application/x-zip-compressed", "text/plain",
                "application/msword", "application/vnd.ms-excel", "application/vnd.ms-powerpoint",
                "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation");



            //检查上传文件是否在允许上传的类型
            if (!in_array($imgs["type"], $tp)) {
                return false;
                exit;
            }//END IF
            $filetype = $imgs['type'];

            if ($filetype == 'image/jpeg') {
                $type = '.jpg';
            }
            if ($filetype == 'image/jpg') {
                $type = '.jpg';
            }
            if ($filetype == 'image/pjpeg') {
                $type = '.jpg';
            }
            if ($filetype == 'image/gif') {
                $type = '.gif';
            }
            if ($filetype == 'image/png') {
                $type = '.png';
            }
            if ($filetype == 'application/x-zip-compressed') {
                $type = '.zip';
            }
            if ($filetype == 'application/zip') {
                $type = '.zip';
            }
            if ($filetype == 'application/octet-stream') {
                $type = '.rar';
            }
            if ($filetype == 'text/plain') {
                $type = '.txt';
            }
            if ($filetype == 'application/msword') {
                $type = '.doc';
            }
            if ($filetype == 'application/vnd.ms-excel') {
                $type = '.xls';
            }
            if ($filetype == 'application/vnd.ms-powerpoint') {
                $type = '.ppt';
            }
            if ($filetype == 'application/pdf') {
                $type = '.pdf';
            }
            if ($filetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                $type = '.docx';
            }
            if ($filetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                $type = '.xlsx';
            }
            if ($filetype == 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                $type = '.pptx';
            }

            if ($imgs["name"]) {
                $rand = rand(100, 999);
                $today = date("YmdHis"); //获取时间并赋值给变量
                $file2 = $path . $today . $rand . $type; //图片的完整路径
                $flag = 1;
            }//END IF
            if ($flag)
            $result = move_uploaded_file($imgs["tmp_name"], $file2);
            //特别注意这里传递给move_uploaded_file的第一个参数为上传到服务器上的临时文件
            //   }//END IF
            //  redirect($_SERVER['HTTP_REFERER']);
                return $file2;
        }
    }

}

?>
