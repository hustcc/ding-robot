/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var DingRobot = require('./');

const robot = new DingRobot('5201ea837c39307372b15de3e17bd9abb211edb34e3ad8e0e5d5aacbc3ee94a9');

// text
robot.text('你好，hustcc！');

// md
robot.markdown('测试 markdown', '# ding-robot\n\n' +
  '> 钉钉机器人 API 接口 api nodejs sdk。\n\n' +
  '## 使用\n\n' +
  '> npm i -S ding-robot\n\n' +
  '```js\n' +
  'var DingRobot = require(\'ding-robot\');\n' +
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

// single button ActionCard

// robot.actionCard('title', `
// # Test Action Card
//
// - markdown list item
//
// > comment
//
// [link](http://baidu.com)
// `, { title: 'single title', actionURL: 'https://www.baidu.com'})
robot.actionCard('title', `
# Test Action Card

- markdown list item

> comment
`, [
  { title: 'btn 1', actionURL: 'https://www.alipay.com/'},
  { title: 'btn 2', actionURL: 'https://www.alipay.com/'}
], { btnOrientation: 0, hideAvatar: 1 });


// FeedCard
robot.feedCard({
  title: 'FeedCard',
  messageURL: 'https://www.alipay.com/',
  picURL: 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png'
})

robot.feedCard([{
  title: 'FeedCard 1',
  messageURL: 'https://www.alipay.com/',
  picURL: 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png'
}, {
  title: 'FeedCard 2',
  messageURL: 'https://www.alipay.com/',
  picURL: 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png'
}, {
  title: 'FeedCard 2',
  messageURL: 'https://www.alipay.com/',
  picURL: 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png'
}])
