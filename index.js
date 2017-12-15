/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var https = require('https');

function DingRobot (accessToken, cb) {
  this.accessToken = accessToken;
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

  var self = this;

  var postData = JSON.stringify(data);
  var options = {
    hostname: 'oapi.dingtalk.com',
    port: 443,
    path: '/robot/send?access_token=' + this.accessToken,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  var request = https.request(options, function(response) {
    var data = [];
    var count = 0;
    response.setEncoding('utf8');

    response.on('data', function(chunk) {
      data.push(chunk);
      count += chunk.length;
    });

    response.on('end', function() {
      var buffer;
      var length = data.length;

      if (length === 0) {
        buffer = new Buffer(0);
      } else if (length === 1) {
        buffer = data[0];
      } else {
        buffer = new Buffer(count);
        for (var index = 0, position = 0; index < length; index++) {
          var chunk = data[index];
          chunk.copy(buffer, position);
          position += chunk.length;
        }
      }

      var datastring = buffer.toString();
      var result = JSON.parse(datastring);
      if (result.errcode) {
        return self.cb(new Error(result.errmsg));
      }

      return self.cb(null, result);
    });
  });
  request.on('error', self.cb);

  request.write(postData);
  request.end();
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
