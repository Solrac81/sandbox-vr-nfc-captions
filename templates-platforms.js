/* 小红书 (XHS) + Google review templates — merged into window.PLATFORM_TEMPLATES
 * XHS rules: no Netflix / IP titles (generic game description is injected for IP games),
 * no links / URLs / phone numbers / QR / 私信 / prices, no 极限词 (最 第一 必玩 顶级 唯一), no 赌.
 * CTA = comment / save / tag only. Location line is appended by app.js.
 * Google: short first-person review suggestion, no hashtags. Guests edit before posting.
 * {{game}} = game name, {{found}} = how-they-found-us phrase.
 */
(function () {
  "use strict";
  var P = {
    xhs: {
      en: {
        found: {
          walking: "Spotted it while strolling around The Londoner.",
          social: "Saved it from my feed ages ago and finally went.",
          friend: "Came on a friend's recommendation.",
        },
        immersion: [
          "{{found}} Played {{game}} at Sandbox VR and the story pulled me in right away ✨ Free-roam VR, you actually walk through the world.\n\nSave this for your Macau trip 📌",
          "{{found}} {{game}} at Sandbox VR felt like stepping inside a movie set. Headset off and my head was still in that world.\n\nTag the friend you'd bring 👇",
          "{{found}} Tried {{game}} at Sandbox VR — so immersive, the time flew by.\n\nTell me in the comments which game you'd pick 💬",
        ],
        friends: [
          "{{found}} Our crew played {{game}} at Sandbox VR — yelling, laughing, high-fives the whole way 😂 Such a good group activity.\n\nTag your squad 👇",
          "{{found}} {{game}} at Sandbox VR with friends = pure team chaos in a good way. We're already planning the rematch.\n\nSave this for your next trip with friends 📌",
          "{{found}} Booked {{game}} at Sandbox VR for the group and everyone loved the teamwork.\n\nWho would you team up with? Comment below 💬",
        ],
        thrills: [
          "{{found}} {{game}} at Sandbox VR had my heart racing the entire time 🔥 Hands still shaking after.\n\nThrill-seekers, save this 📌",
          "{{found}} Played {{game}} at Sandbox VR — so intense, lots of screaming (in a fun way).\n\nTag the friend who'd scream loudest 👇",
          "{{found}} {{game}} at Sandbox VR was a real adrenaline rush, full-body free-roam.\n\nWould you dare? Tell me in the comments 💬",
        ],
      },
      "zh-Hant": {
        found: {
          walking: "喺倫敦人行街偶遇。",
          social: "收藏咗好耐，終於去打卡。",
          friend: "朋友推介嚟試。",
        },
        immersion: [
          "{{found}}喺 Sandbox VR 玩咗{{game}}，一開場就被劇情拉入去 ✨ 自由行走 VR，真係行入故事入面。\n\n收藏起嚟，去澳門用得著 📌",
          "{{found}}{{game}}好似行入電影場景，除低頭盔仲未返到現實。\n\n標記你想一齊去嘅朋友 👇",
          "{{found}}試咗{{game}}，沉浸感好強，時間過得好快。\n\n留言話我知你想玩邊個遊戲 💬",
        ],
        friends: [
          "{{found}}成班朋友一齊玩{{game}}，邊玩邊叫邊擊掌 😂 好適合朋友聚會。\n\n標記你嘅隊友 👇",
          "{{found}}同朋友玩{{game}}，團隊默契即刻拉滿，已經約好下次再嚟。\n\n收藏起嚟，下次同朋友去 📌",
          "{{found}}約齊人玩{{game}}，大家都好鍾意一齊合作過關。\n\n你會同邊個組隊？留言講下 💬",
        ],
        thrills: [
          "{{found}}玩{{game}}成場心跳加速 🔥 玩完手仲喺度震。\n\n鍾意刺激嘅記得收藏 📌",
          "{{found}}{{game}}好緊張好刺激，全程尖叫（開心嗰種）。\n\n標記會叫得好大聲嗰個朋友 👇",
          "{{found}}{{game}}真係腎上腺素飆升，全身投入。\n\n你敢唔敢試？留言講下 💬",
        ],
      },
      "zh-Hans": {
        found: {
          walking: "在伦敦人闲逛时偶遇。",
          social: "收藏了很久，终于去打卡。",
          friend: "朋友推荐来试试。",
        },
        immersion: [
          "{{found}}在 Sandbox VR 玩了{{game}}，一开场就被剧情拉进去 ✨ 自由行走 VR，真的走进故事里。\n\n先收藏，去澳门用得上 📌",
          "{{found}}{{game}}像走进电影场景，摘下头盔还没回到现实。\n\n@ 你想一起去的朋友 👇",
          "{{found}}体验了{{game}}，沉浸感很强，时间过得飞快。\n\n评论区告诉我你想玩哪个 💬",
        ],
        friends: [
          "{{found}}和朋友一起玩{{game}}，边玩边叫边击掌 😂 很适合朋友聚会。\n\n@ 你的队友 👇",
          "{{found}}跟朋友玩{{game}}，团队默契直接拉满，已经约好下次再来。\n\n收藏起来，下次和朋友去 📌",
          "{{found}}约齐人玩{{game}}，大家都很喜欢一起配合过关。\n\n你会和谁组队？评论区聊聊 💬",
        ],
        thrills: [
          "{{found}}玩{{game}}全程心跳加速 🔥 玩完手还在抖。\n\n喜欢刺激的记得收藏 📌",
          "{{found}}{{game}}超紧张超刺激，全程尖叫（开心的那种）。\n\n@ 那个会叫得很大声的朋友 👇",
          "{{found}}{{game}}肾上腺素飙升，全身投入。\n\n你敢不敢试？评论区聊聊 💬",
        ],
      },
    },
    google: {
      en: {
        found: {
          walking: "We came across it while walking around The Londoner.",
          social: "I'd seen it on social media and finally gave it a try.",
          friend: "A friend recommended it to us.",
        },
        immersion: [
          "{{found}} We played {{game}} at Sandbox VR at The Londoner Macau and really enjoyed how immersive the story was. Free-roam VR made it feel like we were inside the game.",
          "Had a great time playing {{game}} at Sandbox VR at The Londoner Macau. {{found}} The story and world were really immersive.",
        ],
        friends: [
          "{{found}} We played {{game}} at Sandbox VR at The Londoner Macau as a group and had a lot of fun working together. A great activity to do with friends.",
          "Played {{game}} at Sandbox VR at The Londoner Macau with friends. {{found}} Lots of teamwork and laughs.",
        ],
        thrills: [
          "{{found}} We played {{game}} at Sandbox VR at The Londoner Macau — exciting and intense from start to finish. Good fun if you like thrills.",
          "{{game}} at Sandbox VR at The Londoner Macau got our hearts racing. {{found}} Really enjoyed the intensity.",
        ],
      },
      "zh-Hant": {
        found: {
          walking: "喺倫敦人行街時見到就入咗去。",
          social: "之前喺社交媒體見過，今次終於試咗。",
          friend: "朋友推介我哋嚟。",
        },
        immersion: [
          "{{found}}喺澳門倫敦人嘅 Sandbox VR 玩咗{{game}}，劇情好有沉浸感，自由行走好似真係喺遊戲入面。",
          "喺澳門倫敦人 Sandbox VR 玩{{game}}好開心。{{found}}故事同場景都好投入。",
        ],
        friends: [
          "{{found}}同朋友喺澳門倫敦人嘅 Sandbox VR 玩{{game}}，大家一齊合作好好玩，適合同朋友嚟。",
          "同朋友喺澳門倫敦人 Sandbox VR 玩咗{{game}}。{{found}}好多團隊合作同笑聲。",
        ],
        thrills: [
          "{{found}}喺澳門倫敦人嘅 Sandbox VR 玩{{game}}，由頭到尾都好刺激緊張，鍾意刺激嘅可以試吓。",
          "喺澳門倫敦人 Sandbox VR 玩{{game}}，心跳加速。{{found}}好享受嗰種緊張感。",
        ],
      },
      "zh-Hans": {
        found: {
          walking: "在伦敦人闲逛时看到就进去了。",
          social: "之前在社交媒体上看到过，这次终于体验了。",
          friend: "朋友推荐我们来的。",
        },
        immersion: [
          "{{found}}在澳门伦敦人的 Sandbox VR 玩了{{game}}，剧情很有沉浸感，自由行走就像真的在游戏里。",
          "在澳门伦敦人 Sandbox VR 玩{{game}}很开心。{{found}}故事和场景都很投入。",
        ],
        friends: [
          "{{found}}和朋友在澳门伦敦人的 Sandbox VR 玩{{game}}，大家一起配合很好玩，适合和朋友来。",
          "和朋友在澳门伦敦人 Sandbox VR 玩了{{game}}。{{found}}很多团队配合和笑声。",
        ],
        thrills: [
          "{{found}}在澳门伦敦人的 Sandbox VR 玩{{game}}，从头到尾都很刺激紧张，喜欢刺激的可以试试。",
          "在澳门伦敦人 Sandbox VR 玩{{game}}，心跳加速。{{found}}很享受那种紧张感。",
        ],
      },
    },
  };
  window.PLATFORM_TEMPLATES = P;
})();
