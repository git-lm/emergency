<?php

/**
 * @filename lz.php 
 * @encoding UTF-8 
 * @author 邱伟平 
 * @copyright 连云港龙泽商务有限公司 
 * @datetime 2013-2-21  16:49:14
 * @version 1.0
 * @Description
 */

/**
 * 日志
 *
 *
 * @access	public
 * @param	string
 * @return	bool	TRUE if the current version is $version or higher
 */
/*
 * 调试信息的输出
 * 文件放在logs目录下，每天一个
 */

function lz_log($message) {
//        报错的文件和行号
    $trace = debug_backtrace();
    $filepath = $trace[0]['file'];
    $line = $trace[0]['line'];

    log_message("debug", $filepath . "[" . $line . "]\t\r" . print_r($message, TRUE));
    return;
}

/**
 * 基本标签
 * @return array
 */
function lz_tag() {

    $data['base'] = base_url();
    $data['site'] = site_url() . "/";
    return $data;
}

/* End of file : lz.php */
