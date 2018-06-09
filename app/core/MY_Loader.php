<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MY_Loader
 *
 * @author Administrator
 */
class MY_Loader extends CI_Loader {

    public function add_package_path($path, $view_cascade = TRUE) {
        $path = rtrim($path, '/') . '/';

        array_unshift($this->_ci_library_paths, $path);
        array_unshift($this->_ci_model_paths, $path);
        array_unshift($this->_ci_helper_paths, $path);

        $this->_ci_view_paths = array($path => $view_cascade) + $this->_ci_view_paths;

        // Add config file path
        $config = & $this->_ci_get_component('config');
        array_unshift($config->_config_paths, $path);
    }

}

?>
