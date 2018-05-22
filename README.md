# ding-robot

> 钉钉机器人 SDK for Node.js。[![Version](https://img.shields.io/npm/v/ding-robot.svg)](https://www.npmjs.com/package/ding-robot) 

首先需要准备一个钉钉机器人的 access_token，在钉钉 im 上 `创建自定义机器人` 即可得到。


## Usage

```go
var DingRobot = require('ding-robot');

// 创建 `自定义机器人` 即可获得
var robot = new DingRobot('your access token of dingding robot');

// text
// robot.text(msg);
robot.text('你好，hustcc！');

// md
// robot.markdown(title, md);
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
// robot.link(title, content, picUrl, url);
robot.link('支付宝首页', '不需要别人给予，你想要的触手可及！。', 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png', 'https://www.alipay.com/');

// @
// robot.at('13276109876');
// robot.at(['13276109876']);
robot.at('13276109876').text('你好，hustcc！');

// @ all
// robot.atAll(true)
// robot.atAll(false)
robot.atAll(true).text('大家好！我是 ding-robot！');

// ActionCard
robot.actionCard('title', `
# Test Action Card

- markdown list item

> comment
`, [
  { title: 'btn 1', actionURL: 'https://www.baidu.com'},
  { title: 'btn 2', actionURL: 'https://map.baidu.com'}
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
```


## TODO


## LICENSE

[MIT](LICENSE)
