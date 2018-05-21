/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

import sender from 'dingtalk-robot';

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
  const shouldAt = data.msgtype === 'text' || data.msgtype === 'markdown';
  const at = shouldAt ? {
    at: {
      atMobiles: this.atUsers,
      isAtAll: this.isAtAll
    }
  } : {}
  const _data = {
    ...data, ...at
  }
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
DingRobot.prototype.actionCard = function (title, text, btn = [], options = {}) {
  const { btnOrientation = '0', hideAvatar = '0' } = options
  let actionCard = {
    title,
    text,
    btnOrientation: `${btnOrientation}`,
    hideAvatar: `${hideAvatar}`
  };
  const btns = Array.isArray(btn) ? btn : [btn];
  if (btns.length === 1) {
    actionCard = { ...actionCard, singleTitle: btn.title, singleURL: btn.actionURL };
  } else {
    actionCard = { ...actionCard, btns: btns };
  }
  this._send({ msgtype: 'actionCard', actionCard });
};

/**
 * @ 所有人
 * @param isAtAll
 */
DingRobot.prototype.atAll = function (isAtAll) {
  this.isAtAll = isAtAll;
  return this;
};

module.exports = DingRobot
