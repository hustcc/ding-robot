/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var DingRobot = require('./');

var robot = new DingRobot('cad1a0e0fa14cc69bca7e4ce84893f298cbf695af59a91b3cce408be9ed29567');

// text
robot.text('你好，hustcc！');

// md
robot.markdown('测试 markdown', '# ding-robot\n\n' +
  '> 钉钉机器人 API 接口 api nodejs sdk。\n\n' +
  '## 使用\n\n' +
  '> npm i -S ding-robot\n\n' +
  '```js\n' +
  'var DR = require(\'ding-robot\');\n' +
  'var robot = new DingRobot(token);\n\n' +
  'robot.text(\'你好，hustcc！\');' +
  '```'
);

// link
robot.link('支付宝首页', '不需要别人给予，你想要的触手可及！。', 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png', 'https://www.alipay.com/');

// @
robot.at('13276109876').text('你好，hustcc！');

// @ all
robot.atAll(true).text('大家好！我是 ding-robot！');
