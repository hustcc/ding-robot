/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var sender = require('dingtalk-robot');

function DingRobot (accessToken, cb) {
  this.robot = sender(accessToken);
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
  this.reset();

  this.robot.send(data, this.cb); // send by http

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
    },
    at: {
      atMobiles: this.atUsers,
      isAtAll: this.isAtAll
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
    },
    at: {
      atMobiles: this.atUsers,
      isAtAll: this.isAtAll
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
 * @ 所有人
 * @param isAtAll
 */
DingRobot.prototype.atAll = function (isAtAll) {
  this.isAtAll = isAtAll;
  return this;
};

module.exports = DingRobot;
