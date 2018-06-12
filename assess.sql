/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50137
Source Host           : localhost:3306
Source Database       : emergency

Target Server Type    : MYSQL
Target Server Version : 50137
File Encoding         : 65001

Date: 2018-06-12 22:10:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for assess
-- ----------------------------
DROP TABLE IF EXISTS `assess`;
CREATE TABLE `assess` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID',
  `p_id` int(11) DEFAULT NULL COMMENT '流程ID',
  `content` text COMMENT '评估内容',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='教学评估';

-- ----------------------------
-- Records of assess
-- ----------------------------
INSERT INTO `assess` VALUES ('1', '1', '3', '啥打算\'啊实打实的', '2018-06-12 00:41:44');

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `logo` varchar(255) DEFAULT NULL COMMENT 'LOGO 地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统设置';

-- ----------------------------
-- Records of config
-- ----------------------------

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) DEFAULT NULL COMMENT '教师ID',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `begin_time` datetime DEFAULT NULL COMMENT '上课时间',
  `class_long` varchar(255) DEFAULT NULL COMMENT '时长',
  `state` int(11) DEFAULT '1' COMMENT '状态   1未上课   2正在上课 3已结束  4删除 ',
  `iselite` int(11) DEFAULT '0' COMMENT '是否精华 0 不是   1 是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='课程';

-- ----------------------------
-- Records of courses
-- ----------------------------
INSERT INTO `courses` VALUES ('1', '2', '\'天\"津爆炸案', '2018-04-06 20:05:10', '2018-06-07 23:58:59', null, '2', '0');

-- ----------------------------
-- Table structure for events
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID',
  `title` varchar(255) DEFAULT NULL COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='事件叠加表';

-- ----------------------------
-- Records of events
-- ----------------------------
INSERT INTO `events` VALUES ('2', '1', '群体突发事件');
INSERT INTO `events` VALUES ('3', '1', '医疗故障事件');

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '小组名称',
  `username` varchar(255) DEFAULT NULL COMMENT '小组账号',
  `password` varchar(255) DEFAULT NULL,
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID course',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='小组';

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO `groups` VALUES ('2', '阿萨德群二', '123', '123', '1');
INSERT INTO `groups` VALUES ('3', '医疗你分队', '321', '321', '1');

-- ----------------------------
-- Table structure for materials
-- ----------------------------
DROP TABLE IF EXISTS `materials`;
CREATE TABLE `materials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '素材名称',
  `url` varchar(255) DEFAULT NULL COMMENT '素材地址',
  `type` int(255) DEFAULT NULL COMMENT '素材类型  对用param表',
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID course  ',
  `title` varchar(255) DEFAULT NULL COMMENT '资源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='素材表';

-- ----------------------------
-- Records of materials
-- ----------------------------
INSERT INTO `materials` VALUES ('1', '1', 'assets/20180408213325127.png', '5', '1', '333.png');

-- ----------------------------
-- Table structure for param
-- ----------------------------
DROP TABLE IF EXISTS `param`;
CREATE TABLE `param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL COMMENT '类型   1素材',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='参数表';

-- ----------------------------
-- Records of param
-- ----------------------------
INSERT INTO `param` VALUES ('1', '1', '视频');
INSERT INTO `param` VALUES ('2', '1', '图片');
INSERT INTO `param` VALUES ('3', '1', 'PPT');
INSERT INTO `param` VALUES ('4', '1', '文档');
INSERT INTO `param` VALUES ('5', '1', '其他');

-- ----------------------------
-- Table structure for problems
-- ----------------------------
DROP TABLE IF EXISTS `problems`;
CREATE TABLE `problems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '名称',
  `e_id` int(11) DEFAULT NULL COMMENT '事件ID events ID',
  `relevant_title` varchar(255) DEFAULT NULL COMMENT '问题相关事件名称',
  `relevant_url` varchar(255) DEFAULT NULL COMMENT '问题相关事件文件地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='事件叠加 问题';

-- ----------------------------
-- Records of problems
-- ----------------------------
INSERT INTO `problems` VALUES ('4', '这是第一个问题1', '2', '5.png', 'assets/20180527105932875.png');

-- ----------------------------
-- Table structure for procedures
-- ----------------------------
DROP TABLE IF EXISTS `procedures`;
CREATE TABLE `procedures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID course',
  `title` varchar(255) DEFAULT NULL COMMENT '流程名称',
  `state` int(255) DEFAULT '0' COMMENT '状态  0正常 1 删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='课程  流程表';

-- ----------------------------
-- Records of procedures
-- ----------------------------
INSERT INTO `procedures` VALUES ('1', '1', '事件接报', '0');
INSERT INTO `procedures` VALUES ('2', '1', '先期处理', '0');

-- ----------------------------
-- Table structure for process
-- ----------------------------
DROP TABLE IF EXISTS `process`;
CREATE TABLE `process` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `p_id` int(11) DEFAULT NULL COMMENT '流程表  procedure',
  `indexes` varchar(255) DEFAULT NULL COMMENT '教学索引',
  `injection` varchar(255) DEFAULT NULL COMMENT '事件注入',
  `material` varchar(255) DEFAULT NULL COMMENT '素材地址',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `material_name` varchar(255) DEFAULT NULL COMMENT '素材名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='流程 事件表';

-- ----------------------------
-- Records of process
-- ----------------------------
INSERT INTO `process` VALUES ('4', '1', 'PPT1', 'PPT事件', 'assets/20180408202413625.png', '2018-04-08 20:24:13', null, 'QQ图片20180130205713.png');
INSERT INTO `process` VALUES ('5', '1', 'PPT', 'PPT事件', 'assets/20180408194051969.pdf', '2018-04-08 19:40:51', null, 'linux从入门到精通.pdf');
INSERT INTO `process` VALUES ('6', '1', 'PPT1', 'PPT事件1', 'assets/20180408194142876.jpg', '2018-04-08 19:41:42', null, 'QQ图片20180130205708.jpg');
INSERT INTO `process` VALUES ('7', '1', '阿萨德', '阿萨德2313123', 'assets/20180408194201121.png', '2018-04-08 19:42:01', null, '1KD~JQHD`6NIN~(94CAQ5Y1.png');

-- ----------------------------
-- Table structure for record_events
-- ----------------------------
DROP TABLE IF EXISTS `record_events`;
CREATE TABLE `record_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID course',
  `prd_id` int(11) DEFAULT NULL COMMENT '流程ID',
  `e_id` int(11) DEFAULT NULL COMMENT '事件叠加表events  id',
  `g_id` int(11) DEFAULT NULL COMMENT '小组ID group',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COMMENT='学生事件叠加记录表';

-- ----------------------------
-- Records of record_events
-- ----------------------------
INSERT INTO `record_events` VALUES ('42', '1', '1', '2', '2', '2018-06-12 01:00:10');
INSERT INTO `record_events` VALUES ('43', '1', '1', '2', '3', '2018-06-12 01:00:10');
INSERT INTO `record_events` VALUES ('44', '1', '1', '3', '2', '2018-06-12 01:00:10');
INSERT INTO `record_events` VALUES ('45', '1', '1', '3', '3', '2018-06-12 01:00:10');
INSERT INTO `record_events` VALUES ('46', '1', '2', '2', '2', '2018-06-12 01:16:32');
INSERT INTO `record_events` VALUES ('47', '1', '2', '2', '3', '2018-06-12 01:16:32');
INSERT INTO `record_events` VALUES ('48', '1', '2', '3', '2', '2018-06-12 01:16:32');
INSERT INTO `record_events` VALUES ('49', '1', '2', '3', '3', '2018-06-12 01:16:32');

-- ----------------------------
-- Table structure for record_materials
-- ----------------------------
DROP TABLE IF EXISTS `record_materials`;
CREATE TABLE `record_materials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID course',
  `prd_id` int(11) DEFAULT NULL COMMENT '流程ID',
  `g_id` int(11) DEFAULT NULL COMMENT '小组ID',
  `m_id` int(11) DEFAULT NULL COMMENT '素材ID materials',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='小组素材记录表';

-- ----------------------------
-- Records of record_materials
-- ----------------------------
INSERT INTO `record_materials` VALUES ('4', '1', '1', '3', '1', '2018-06-12 01:00:37');
INSERT INTO `record_materials` VALUES ('5', '1', '2', '2', '1', '2018-06-12 01:19:25');
INSERT INTO `record_materials` VALUES ('3', '1', '1', '2', '1', '2018-06-12 01:00:26');
INSERT INTO `record_materials` VALUES ('6', '1', '2', '3', '1', '2018-06-12 01:19:29');

-- ----------------------------
-- Table structure for record_problems
-- ----------------------------
DROP TABLE IF EXISTS `record_problems`;
CREATE TABLE `record_problems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '小组ID group',
  `prd_id` int(11) DEFAULT NULL COMMENT '流程ID',
  `g_id` int(11) DEFAULT NULL COMMENT '小组group ID',
  `pb_id` int(11) DEFAULT NULL COMMENT '问题表problems ID',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='小组事件叠加问题 记录表';

-- ----------------------------
-- Records of record_problems
-- ----------------------------
INSERT INTO `record_problems` VALUES ('13', '1', '1', '2', '2', '2018-06-12 01:09:02');
INSERT INTO `record_problems` VALUES ('14', '1', '1', '2', '3', '2018-06-12 01:09:02');
INSERT INTO `record_problems` VALUES ('17', '1', '2', '3', '2', '2018-06-12 01:19:19');
INSERT INTO `record_problems` VALUES ('18', '1', '2', '3', '3', '2018-06-12 01:19:19');
INSERT INTO `record_problems` VALUES ('15', '1', '1', '3', '2', '2018-06-12 01:09:10');
INSERT INTO `record_problems` VALUES ('16', '1', '1', '3', '3', '2018-06-12 01:09:10');

-- ----------------------------
-- Table structure for record_procedures
-- ----------------------------
DROP TABLE IF EXISTS `record_procedures`;
CREATE TABLE `record_procedures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID ',
  `prd_id` int(11) DEFAULT NULL COMMENT '流程ID',
  `begin_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='教师   流程记录';

-- ----------------------------
-- Records of record_procedures
-- ----------------------------
INSERT INTO `record_procedures` VALUES ('3', '1', '1', '2018-06-08 21:48:41', '2018-06-12 01:11:55');
INSERT INTO `record_procedures` VALUES ('4', '1', '2', '2018-06-12 01:11:55', null);

-- ----------------------------
-- Table structure for record_process
-- ----------------------------
DROP TABLE IF EXISTS `record_process`;
CREATE TABLE `record_process` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID courses',
  `pc_id` int(11) DEFAULT NULL COMMENT '流程事件 process ID',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT=' 流程 事件表 记录表';

-- ----------------------------
-- Records of record_process
-- ----------------------------
INSERT INTO `record_process` VALUES ('7', '1', '5', '2018-06-10 19:15:04');

-- ----------------------------
-- Table structure for record_relevants
-- ----------------------------
DROP TABLE IF EXISTS `record_relevants`;
CREATE TABLE `record_relevants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) DEFAULT NULL COMMENT '课程courses ID',
  `prd_id` int(11) DEFAULT NULL COMMENT '流程ID',
  `g_id` int(11) DEFAULT NULL COMMENT '小组ID',
  `r_id` int(11) DEFAULT NULL COMMENT 'relevants 相关案例表',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='小组 课程 相关案例 记录表';

-- ----------------------------
-- Records of record_relevants
-- ----------------------------

-- ----------------------------
-- Table structure for relevants
-- ----------------------------
DROP TABLE IF EXISTS `relevants`;
CREATE TABLE `relevants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '案例名称',
  `summary` text COMMENT '概述',
  `event_name` varchar(255) DEFAULT NULL COMMENT '事件名称',
  `event_url` varchar(255) DEFAULT NULL COMMENT '事件地址',
  `c_id` int(11) DEFAULT NULL COMMENT '课程ID COURSE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='课程 相关案例';

-- ----------------------------
-- Records of relevants
-- ----------------------------
INSERT INTO `relevants` VALUES ('1', '案例相关1', '案例相关案例相关案例相关案例相关案例相关案例相关案例相关案例相关', 'f.png', 'assets/20180527144327639.png', '1');

-- ----------------------------
-- Table structure for sysconfig
-- ----------------------------
DROP TABLE IF EXISTS `sysconfig`;
CREATE TABLE `sysconfig` (
  `logourl` varchar(255) DEFAULT NULL COMMENT 'LOGO 地址'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sysconfig
-- ----------------------------
INSERT INTO `sysconfig` VALUES ('assets/20180527161521589.png');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL COMMENT '账号',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `type` int(255) DEFAULT '2' COMMENT '类型 1管理员 2教师 3领导',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `photo` varchar(255) DEFAULT NULL COMMENT '头像',
  `state` int(11) DEFAULT '0' COMMENT '状态  0正常 1删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='教师  管理员 领导  ';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1', null, '管理员', 'assets/20180527175157230.png', '0');
INSERT INTO `users` VALUES ('2', 'jiaoshi', 'e10adc3949ba59abbe56e057f20f883e', '2', null, '这是教师账号1', 'assets/20180527175157230.png', '0');
