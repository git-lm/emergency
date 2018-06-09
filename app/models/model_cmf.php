<?php

/**
 * @filename model_common.php 
 * @encoding UTF-8 
 * @author 邱伟平 
 * @copyright 连云港龙泽商务有限公司 
 * @datetime 2013-6-9  10:00:06
 * @version 1.0
 * @Description
 */
class Model_cmf extends CI_Model {
    /*
     * 分页
     */

    public function pages($from_where, $config = array()) {

        $this->load->library('pagination');
        $sql = "select count(*) as total " . $from_where;
        $config['total_rows'] = $this->db->query($sql)->row()->total;
        $config['page_query_string'] = TRUE;
        $config['query_string_segment'] = 'start';
        if (!isset($config['per_page'])) {
            $config['per_page'] = 20;
        }

        if (!isset($config['uri_segment'])) {
            $config['uri_segment'] = 4;
        }
        if (!isset($config['base_url'])) {
            $this->load->helper('url');
            $config['base_url'] = base_url();

            for ($i = 1; $i < $this->uri->total_segments(); $i++) {
                $config['base_url'].= "/" . $this->uri->segment($i);
            }
        }
//        lz_log($config['base_url']);
        $config['first_link'] = '<<';
        $config['last_link'] = '>>';
        $config['next_link'] = '下一页';
        $config['prev_link'] = '上一页';
        $config['cur_tag_open'] = '<b>';
        $config['cur_tag_close'] = '</b>';

//        $config['anchor_class'] = "class = 'pages'";


        $this->pagination->initialize($config);

        return $this->pagination->create_links();
    }

    //字符串截取
    function cut_str($data, $length) {
        $returnstr = '';
        $i = 0;
        $n = 0;
        $str_length = strlen($data); //字符串的字节数 
        while (($n < $length) and ( $i <= $str_length)) {
            $temp_str = substr($data, $i, 1);
            $ascnum = Ord($temp_str); //得到字符串中第$i位字符的ascii码 
            if ($ascnum >= 224) {    //如果ASCII位高与224，
                $returnstr = $returnstr . substr($data, $i, 3); //根据UTF-8编码规范，将3个连续的字符计为单个字符         
                $i = $i + 3;            //实际Byte计为3
                $n++;            //字串长度计1
            } elseif ($ascnum >= 192) { //如果ASCII位高与192，
                $returnstr = $returnstr . substr($data, $i, 2); //根据UTF-8编码规范，将2个连续的字符计为单个字符 
                $i = $i + 2;            //实际Byte计为2
                $n++;            //字串长度计1
            } elseif ($ascnum >= 65 && $ascnum <= 90) { //如果是大写字母，
                $returnstr = $returnstr . substr($data, $i, 1);
                $i = $i + 1;            //实际的Byte数仍计1个
                $n++;            //但考虑整体美观，大写字母计成一个高位字符
            } else {                //其他情况下，包括小写字母和半角标点符号，
                $returnstr = $returnstr . substr($data, $i, 1);
                $i = $i + 1;            //实际的Byte数计1个
                $n = $n + 0.5;        //小写字母和半角标点等与半个高位字符宽...
            }
        }
        if ($str_length > $length) {
            $returnstr = $returnstr; //超过长度时在尾处加上省略号
        }
        return $returnstr;
    }
    
    

}

/* End of file : model_common.php */
