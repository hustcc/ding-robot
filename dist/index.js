'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by hustcc.
                                                                                                                                                                                                                                                                   * Contract: i@hust.cc
                                                                                                                                                                                                                                                                   */

var _dingtalkRobot = require('dingtalk-robot');

var _dingtalkRobot2 = _interopRequireDefault(_dingtalkRobot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DingRobot(accessToken, cb) {
  this.robot = (0, _dingtalkRobot2.default)(accessToken);
  this.cb = cb || function () {};

  this.atUsers = [];
  this.isAtAll = false;
}

/**
 * 重置
 */
DingRobot.prototype.reset = function () {
  this.atUsers = [];
  this.isAtAll = false;
  return this;
};

DingRobot.prototype._send = function (data) {
  // reset
  var shouldAt = data.msgtype === 'text' || data.msgtype === 'markdown';
  var at = shouldAt ? {
    at: {
      atMobiles: this.atUsers,
      isAtAll: this.isAtAll
    }
  } : {};
  var _data = _extends({}, data, at);
  this.robot.send(_data, this.cb); // send by http
  this.reset();
  return this;
};

/**
 * 发送文本
 * @param msg
 */
DingRobot.prototype.text = function (msg) {
  return this._send({
    msgtype: 'text',
    text: {
      content: msg
    }
  });
};

/**
 * 发送 markdown 文本
 * @param title
 * @param md
 * @returns {*}
 */
DingRobot.prototype.markdown = function (title, md) {
  return this._send({
    msgtype: 'markdown',
    markdown: {
      title: title,
      text: md
    }
  });
};

/**
 * 发送链接
 * @param title
 * @param text
 * @param picUrl
 * @param msgUrl
 * @returns {*|string|{title, text, picUrl, messageUrl}}
 */
DingRobot.prototype.link = function (title, text, picUrl, msgUrl) {
  return this._send({
    msgtype: 'link',
    link: {
      title: title,
      text: text,
      picUrl: picUrl,
      messageUrl: msgUrl
    }
  });
};

/**
 * @ 每一个人
 * @param userIds
 */
DingRobot.prototype.at = function (userIds) {
  this.atUsers = Array.isArray(userIds) ? userIds : [userIds];
  return this;
};

/**
 * 发送 ActionCard 消息
 * @param title 首屏会话透出的展示内容
 * @param text  markdown格式的消息
 * @param btn   按钮(组): { title: string, actionURL: string } 或 Array<{title: string, actionURL: string }>
 * @param options 消息样式 { btnOrientation: '0' || '1' 0-按钮竖直排列，1-按钮横向排列,  hideAvatar: '0' || '1' 0-正常发消息者头像,1-隐藏发消息者头像 }
 */
DingRobot.prototype.actionCard = function (title, text) {
  var btn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$btnOrientati = options.btnOrientation,
      btnOrientation = _options$btnOrientati === undefined ? '0' : _options$btnOrientati,
      _options$hideAvatar = options.hideAvatar,
      hideAvatar = _options$hideAvatar === undefined ? '0' : _options$hideAvatar;

  var actionCard = {
    title: title,
    text: text,
    btnOrientation: '' + btnOrientation,
    hideAvatar: '' + hideAvatar
  };
  var btns = Array.isArray(btn) ? btn : [btn];
  if (btns.length === 1) {
    actionCard = _extends({}, actionCard, { singleTitle: btn.title, singleURL: btn.actionURL });
  } else {
    actionCard = _extends({}, actionCard, { btns: btns });
  }
  this._send({ msgtype: 'actionCard', actionCard: actionCard });
};

/**
 *
 * @param links  Array<{ title: string,        单条信息文本
 *                       messageURL: string,   点击单条信息到跳转链接
 *                       picURL: string        单条信息后面图片的URL
 *                     }>
 */
DingRobot.prototype.feedCard = function () {
  var links = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _links = Array.isArray(links) ? links : [links];
  this._send({
    msgtype: 'feedCard',
    feedCard: {
      links: _links
    }
  });
};

/**
 * @ 所有人
 * @param isAtAll
 */
DingRobot.prototype.atAll = function (isAtAll) {
  this.isAtAll = isAtAll;
  return this;
};

module.exports = DingRobot;
//# sourceMappingURL=index.js.map