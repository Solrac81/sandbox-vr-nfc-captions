/**
 * Sandbox VR · The Londoner Macau — caption generator
 * Flow: language → game → liked → found → caption
 * Template matrix: 3 languages × 3 liked × 3 found-us = 27 captions
 * Chosen game name is injected via {{game}}; optional game hashtags appended.
 */
(function () {
  "use strict";

  // Londoner lineup. Canonical id is the exact English title.
  const GAMES = [
    { id: "Squid Game Virtuals", labels: { en: "Squid Game Virtuals", "zh-Hant": "Squid Game 虛擬體驗", "zh-Hans": "鱿鱼游戏 Virtuals" }, hashtags: ["#SquidGame"] },
    { id: "Age of Dinosaurs", labels: { en: "Age of Dinosaurs", "zh-Hant": "恐龍時代", "zh-Hans": "恐龙时代" }, hashtags: ["#AgeOfDinosaurs"] },
    { id: "Stranger Things: Catalyst", labels: { en: "Stranger Things: Catalyst", "zh-Hant": "怪奇物語：Catalyst", "zh-Hans": "怪奇物语：Catalyst" }, hashtags: ["#StrangerThings"] },
    { id: "Deadwood PHOBIA", labels: { en: "Deadwood PHOBIA", "zh-Hant": "死木 PHOBIA", "zh-Hans": "死木 PHOBIA" }, hashtags: ["#Deadwood", "#PHOBIA"] },
    { id: "Seekers of the Shard: Dragonfire", labels: { en: "Seekers of the Shard: Dragonfire", "zh-Hant": "Seekers of the Shard：Dragonfire", "zh-Hans": "Seekers of the Shard：Dragonfire" }, hashtags: ["#SeekersOfTheShard", "#Dragonfire"] },
    { id: "Deadwood Mansion", labels: { en: "Deadwood Mansion", "zh-Hant": "死木大宅", "zh-Hans": "死木大宅" }, hashtags: ["#Deadwood"] },
    { id: "Rebel Moon: The Descent", labels: { en: "Rebel Moon: The Descent", "zh-Hant": "Rebel Moon：The Descent", "zh-Hans": "Rebel Moon：The Descent" }, hashtags: ["#RebelMoon"] },
    { id: "Amber Sky 2088", labels: { en: "Amber Sky 2088", "zh-Hant": "Amber Sky 2088", "zh-Hans": "Amber Sky 2088" }, hashtags: ["#AmberSky2088"] },
    { id: "Deadwood Valley", labels: { en: "Deadwood Valley", "zh-Hant": "死木山谷", "zh-Hans": "死木山谷" }, hashtags: ["#Deadwood"] },
    { id: "Curse of Davy Jones", labels: { en: "Curse of Davy Jones", "zh-Hant": "戴維瓊斯的詛咒", "zh-Hans": "戴维琼斯的诅咒" }, hashtags: ["#CurseOfDavyJones", "#DavyJones"] }
  ];

  const UI = {
    en: {
      titleLang: "Choose your language", hintLang: "Pick one to continue",
      titleGame: "What did you play?", hintGame: "Tap your game",
      titleLiked: "What did you love most?", hintLiked: "Tap one",
      likedImmersion: "Immersion / story", likedFriends: "Friends / team", likedThrills: "Thrills / intensity",
      titleFound: "How did you find us?", hintFound: "Tap one",
      foundWalking: "Walking by at The Londoner", foundSocial: "Social media (IG / 小红书)", foundFriend: "Friend or hotel recommendation",
      titleResult: "Your caption", hintResult: "Copy and paste to IG or 小红书", copy: "Copy caption", again: "Generate again",
      copied: "Copied!", copyFailed: "Copy failed — select the text and copy manually", back: "← Back", restart: "Start over"
    },
    "zh-Hant": {
      titleLang: "選擇語言", hintLang: "點選繼續",
      titleGame: "你玩咗邊個遊戲？", hintGame: "點選你玩過嘅遊戲",
      titleLiked: "你最喜歡什麼？", hintLiked: "點選一項",
      likedImmersion: "沉浸感／劇情", likedFriends: "朋友／團隊", likedThrills: "刺激／緊張感",
      titleFound: "你是怎麼找到我們的？", hintFound: "點選一項",
      foundWalking: "在倫敦人散步經過", foundSocial: "社交媒體（IG／小紅書）", foundFriend: "朋友或酒店推薦",
      titleResult: "你的文案", hintResult: "複製後貼到 IG 或小紅書", copy: "複製文案", again: "再生成一次",
      copied: "已複製！", copyFailed: "複製失敗 — 請手動選取文字複製", back: "← 返回", restart: "重新開始"
    },
    "zh-Hans": {
      titleLang: "选择语言", hintLang: "点选继续",
      titleGame: "你玩了哪个游戏？", hintGame: "点选你玩过的游戏",
      titleLiked: "你最喜欢什么？", hintLiked: "点选一项",
      likedImmersion: "沉浸感／剧情", likedFriends: "朋友／团队", likedThrills: "刺激／紧张感",
      titleFound: "你是怎么找到我们的？", hintFound: "点选一项",
      foundWalking: "在伦敦人散步经过", foundSocial: "社交媒体（IG／小红书）", foundFriend: "朋友或酒店推荐",
      titleResult: "你的文案", hintResult: "复制后贴到 IG 或小红书", copy: "复制文案", again: "再生成一次",
      copied: "已复制！", copyFailed: "复制失败 — 请手动选取文字复制", back: "← 返回", restart: "重新开始"
    }
  };

  // Keep the polished 3 × 3 × 3 template matrix; {{game}} is localized at runtime.
  const TEMPLATES = {
    "en|immersion|walking": "Wandered through The Londoner Macau and somehow ended up in another world at Sandbox VR playing {{game}} ✨ The story grabbed us in seconds — free-roam VR where you actually live the mission, not watch it. Instant Macau highlight.\n\n#SandboxVR #TheLondonerMacau #LondonerMacau #Macau #Macao #FreeRoamVR #ImmersiveVR #MacauTravel #Cotai #VRExperience",
    "en|immersion|social": "Saved Sandbox VR from IG weeks ago — finally played {{game}} at The Londoner Macau and the immersion is unreal. You're inside the story, moving through the set, fully in it. Headset off, brain still in that world.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #ImmersiveVR #FreeRoamVR #MacauMustDo #VRExperience #InstagramFinds #LondonerMacau",
    "en|immersion|friend": "Friend said Sandbox VR at The Londoner was non-negotiable. They were right. {{game}} — story, world, moving through the mission as a team — peak immersion. Already arguing about which game we book next.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #FreeRoamVR #StoryDriven #MacauWithFriends #VRExperience #LondonerMacau #Immersive",
    "en|friends|walking": "Spotted Sandbox VR while roaming The Londoner and pulled the whole crew into {{game}} 😂 Best spontaneous call of the trip — yelling, laughing, high-fives mid-mission. This is how you do Macau with friends.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #SquadGoals #FreeRoamVR #FriendsTrip #GroupAdventure #Cotai #MacauFun",
    "en|friends|social": "Kept seeing Sandbox VR on social, finally booked the squad into {{game}} at The Londoner Macau. Surviving a free-roam mission together hits different — pure team chaos in the best way. 10/10 group activity.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #SquadGoals #FreeRoamVR #MacauFun #FriendsActivity #VRExperience #LondonerMacau",
    "en|friends|friend": "Hotel rec + friend hype → {{game}} at Sandbox VR · The Londoner. Our crew went from chill to legendary in one session. If you're in Macau with your people, this is the move.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #TeamAdventure #FreeRoamVR #MacauWithFriends #GroupFun #LondonerMacau #VR",
    "en|thrills|walking": "Walked past Sandbox VR at The Londoner thinking \"why not?\" — then spent the hour heart-racing through {{game}} 🔥 Intensity for real. Hands still buzzing. Macau thrills: unlocked.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #Adrenaline #FreeRoamVR #ThrillSeekers #MacauTravel #Cotai #VirtualReality",
    "en|thrills|social": "IG made Sandbox VR look intense. {{game}} at The Londoner Macau was louder, faster, better. Free-roam thrills, full-body commitment, zero chill. If you like entertainment with a pulse — go.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #AdrenalineRush #FreeRoamVR #MustTry #MacauFun #ImmersiveVR #LondonerMacau",
    "en|thrills|friend": "Friend swore Sandbox VR would wreck us (nicely). Correct. {{game}} at The Londoner Macau — pure intensity, every mission hits harder when you're actually in the room. Worth every scream.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #Thrills #FreeRoamVR #Adrenaline #LondonerMacau #VRExperience #VirtualReality",

    "zh-Hant|immersion|walking": "喺澳門倫敦人閒逛，一時興起走進 Sandbox VR 玩咗 {{game}}——戴上頭盔整個人就被劇情拉走 ✨ 自由行走 VR，沉浸感強到差啲忘記自己仲喺科泰。呢趟澳門最難忘嘅一段。\n\n#SandboxVR #澳門倫敦人 #TheLondonerMacau #澳門 #澳門好去處 #自由行走VR #沉浸式體驗 #VR體驗 #澳門旅遊 #科泰",
    "zh-Hant|immersion|social": "IG／小紅書種草好耐，終於喺澳門倫敦人親身試到 Sandbox VR，玩咗 {{game}}。唔係睇故事，係真係行入去、活喺入面。除低頭盔仲覺得自己留喺嗰個世界。\n\n#SandboxVR #澳門倫敦人 #澳門 #澳門必去 #自由行走VR #沉浸式 #VR體驗 #TheLondonerMacau #澳門好去處 #虛擬實境",
    "zh-Hant|immersion|friend": "朋友話嚟澳門一定要排 Sandbox VR（倫敦人），一試 {{game}} 就被劇情同場景收服。成班人喺空間入面走位過關，沉浸感真係好頂。下次已經約好再嚟！\n\n#SandboxVR #澳門倫敦人 #澳門 #朋友推薦 #自由行走VR #劇情向 #VR體驗 #澳門旅遊 #TheLondonerMacau #沉浸式體驗",
    "zh-Hant|friends|walking": "行過倫敦人見到 Sandbox VR，成隊人一時衝動衝咗入去玩 {{game}} 😂 邊玩邊叫邊擊掌，默契瞬間拉滿。同朋友嚟澳門，呢種體驗最啱味！\n\n#SandboxVR #澳門倫敦人 #澳門 #澳門好玩 #團隊活動 #自由行走VR #朋友出遊 #TheLondonerMacau #VR體驗 #科泰",
    "zh-Hant|friends|social": "網上刷到好多次，終於約齊朋友嚟澳門倫敦人玩 Sandbox VR 嘅 {{game}}。一齊通關又叫又笑又打氣——團體活動天花板，認真。\n\n#SandboxVR #澳門倫敦人 #澳門 #朋友聚會 #自由行走VR #澳門好玩 #VR體驗 #TheLondonerMacau #虛擬實境 #澳門打卡",
    "zh-Hant|friends|friend": "酒店＋朋友雙重安利，嚟試倫敦人嘅 Sandbox VR——成隊玩 {{game}} 玩到癲。一齊闖關、一齊喊、一齊笑，嚟澳門同好友必排！\n\n#SandboxVR #澳門倫敦人 #澳門 #酒店推薦 #團隊冒險 #自由行走VR #澳門好去處 #朋友出遊 #TheLondonerMacau #VR體驗",
    "zh-Hant|thrills|walking": "路過倫敦人 Sandbox VR 心想「試吓？」——結果玩 {{game}} 心跳狂飆成場 🔥 自由行走 VR 嘅刺激感完全唔同，手仲震緊。澳門刺激體驗直接＋1！\n\n#SandboxVR #澳門倫敦人 #澳門 #刺激體驗 #腎上腺素 #自由行走VR #澳門好玩 #TheLondonerMacau #VR體驗 #虛擬實境",
    "zh-Hant|thrills|social": "網上睇已經好燃，親身喺澳門倫敦人玩 Sandbox VR 嘅 {{game}} 更誇張。全身投入、零冷場，鍾意心跳加速嘅一定要嚟。\n\n#SandboxVR #澳門倫敦人 #澳門 #超刺激 #自由行走VR #必玩 #VR體驗 #TheLondonerMacau #澳門旅遊 #沉浸式",
    "zh-Hant|thrills|friend": "朋友話 Sandbox VR 會嚇到你（但好好玩）——屬實。喺倫敦人玩 {{game}}，每一場都拉滿緊張感，尖叫值滿分，值得再衝！\n\n#SandboxVR #澳門倫敦人 #澳門 #朋友推薦 #刺激感 #自由行走VR #腎上腺素 #TheLondonerMacau #VR體驗 #虛擬實境",

    "zh-Hans|immersion|walking": "在澳门伦敦人度假区闲逛，一脚迈进 Sandbox VR 玩了《{{game}}》——戴上设备整个人就被剧情带走了 ✨ 自由行走 VR，沉浸感强到差点忘了自己还在科泰。这趟澳门最值得的一段。\n\n#SandboxVR #澳门伦敦人 #澳门旅游 #澳门好去处 #自由行走VR #沉浸式体验 #VR体验 #TheLondonerMacau #科泰 #澳门打卡",
    "zh-Hans|immersion|social": "小红书种草很久，终于在澳门伦敦人亲测 Sandbox VR，玩了《{{game}}》！不是看故事，是真的走进去、活在里面。摘下头盔脑子还留在那个世界——沉浸感太绝了。\n\n#SandboxVR #澳门伦敦人 #小红书推荐 #澳门必去 #自由行走VR #沉浸式 #VR体验 #澳门旅游攻略 #TheLondonerMacau #虚拟现实",
    "zh-Hans|immersion|friend": "朋友安利：来澳门伦敦人一定要排 Sandbox VR。一试《{{game}}》就被剧情和场景拿下！在空间里自由走位过关，沉浸感真的顶。姐妹下次还约～\n\n#SandboxVR #澳门伦敦人 #澳门旅游 #朋友推荐 #自由行走VR #剧情向 #VR体验 #TheLondonerMacau #沉浸式体验 #澳门好去处",
    "zh-Hans|friends|walking": "路过伦敦人看见 Sandbox VR，一整个小队冲动冲进去玩了《{{game}}》 😂 边玩边叫边击掌，默契瞬间拉满。跟朋友来澳门，这种体验也太对味了吧！\n\n#SandboxVR #澳门伦敦人 #澳门好玩 #闺蜜出游 #团队活动 #自由行走VR #澳门旅游 #TheLondonerMacau #VR体验 #科泰打卡",
    "zh-Hans|friends|social": "刷到无数次，终于约齐朋友来澳门伦敦人打卡 Sandbox VR 的《{{game}}》。一起通关又叫又笑又打气——团体活动天花板有实锤了。\n\n#SandboxVR #澳门伦敦人 #小红书打卡 #朋友聚会 #自由行走VR #澳门好玩 #VR体验 #TheLondonerMacau #澳门旅游 #虚拟现实",
    "zh-Hans|friends|friend": "酒店＋朋友双重种草，冲了伦敦人的 Sandbox VR——整队玩《{{game}}》玩疯。一起闯关一起尖叫，来澳门跟好友真的必排这一项！\n\n#SandboxVR #澳门伦敦人 #酒店推荐 #团队冒险 #自由行走VR #澳门好去处 #朋友出游 #TheLondonerMacau #VR体验 #澳门旅游攻略",
    "zh-Hans|thrills|walking": "路过伦敦人 Sandbox VR 心想「试试？」——结果玩《{{game}}》心跳狂飙一整场 🔥 自由行走 VR 的刺激感完全不一样，手还在抖。澳门刺激体验直接＋1！\n\n#SandboxVR #澳门伦敦人 #刺激体验 #肾上腺素 #自由行走VR #澳门好玩 #VR体验 #TheLondonerMacau #虚拟现实 #澳门旅游",
    "zh-Hans|thrills|social": "小红书上看就很燃，亲身在澳门伦敦人玩 Sandbox VR 的《{{game}}》更夸张。全身投入、零冷场，喜欢心跳加速的一定要来打卡。\n\n#SandboxVR #澳门伦敦人 #小红书推荐 #超刺激 #自由行走VR #澳门必玩 #VR体验 #TheLondonerMacau #澳门旅游攻略 #沉浸式",
    "zh-Hans|thrills|friend": "朋友说 Sandbox VR 会吓到你（但很好玩）——属实。在伦敦人玩《{{game}}》，每一场都拉满紧张感，尖叫值满分，值得再冲一局！\n\n#SandboxVR #澳门伦敦人 #朋友推荐 #刺激感 #自由行走VR #肾上腺素 #VR体验 #TheLondonerMacau #虚拟现实 #澳门好玩"
  };

  const AGAIN_SUFFIX = {
    en: ["\n\nAlready plotting the rematch.", "\n\nMacau highlight — no contest.", "\n\nFree-roam hits different at The Londoner."],
    "zh-Hant": ["\n\n已經喺度計劃下一場。", "\n\n呢趟澳門亮點，非它莫屬。", "\n\n倫敦人自由行走 VR，真係唔同檔次。"],
    "zh-Hans": ["\n\n已经在盘算下一场了。", "\n\n这趟澳门亮点，非它莫属。", "\n\n伦敦人自由行走 VR，档次真不一样。"]
  };

  const state = { lang: "en", game: null, liked: null, found: null, againIndex: 0 };
  const steps = {
    lang: document.getElementById("step-lang"), game: document.getElementById("step-game"),
    liked: document.getElementById("step-liked"), found: document.getElementById("step-found"), result: document.getElementById("step-result")
  };
  const gameChoices = document.getElementById("game-choices");
  const captionCard = document.getElementById("caption-card");
  const btnCopy = document.getElementById("btn-copy");
  const btnAgain = document.getElementById("btn-again");
  const btnRestart = document.getElementById("btn-restart");
  const copyFeedback = document.getElementById("copy-feedback");

  function findGame(id) { return GAMES.find(function (game) { return game.id === id; }); }
  function gameName(game, lang) { return game ? (game.labels[lang] || game.labels.en || game.id) : ""; }
  function showStep(name) {
    Object.keys(steps).forEach(function (key) {
      steps[key].hidden = key !== name;
      steps[key].classList.toggle("active", key === name);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function renderGames(lang) {
    gameChoices.innerHTML = "";
    GAMES.forEach(function (game) {
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "choice-btn game-btn"; btn.dataset.game = game.id;
      btn.textContent = gameName(game, lang);
      btn.addEventListener("click", function () {
        state.game = game.id; state.liked = null; state.found = null; state.againIndex = 0; showStep("liked");
      });
      gameChoices.appendChild(btn);
    });
  }
  function applyUI(lang) {
    const strings = UI[lang] || UI.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.dataset.i18n; if (strings[key] != null) el.textContent = strings[key];
    });
    renderGames(lang);
  }
  function buildCaption() {
    const game = findGame(state.game);
    let text = TEMPLATES[state.lang + "|" + state.liked + "|" + state.found] || TEMPLATES["en|immersion|walking"];
    text = text.split("{{game}}").join(gameName(game, state.lang));
    if (game && game.hashtags.length) text = text.replace("#SandboxVR", "#SandboxVR " + game.hashtags.join(" "));
    if (state.againIndex > 0) {
      const suffixes = AGAIN_SUFFIX[state.lang] || AGAIN_SUFFIX.en;
      text += suffixes[(state.againIndex - 1) % suffixes.length];
    }
    return text;
  }
  function renderCaption() {
    captionCard.textContent = buildCaption(); copyFeedback.hidden = true; btnCopy.classList.remove("copied"); btnCopy.textContent = UI[state.lang].copy;
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      const ta = document.createElement("textarea"); ta.value = text; ta.readOnly = true;
      ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? resolve() : reject(new Error("copy failed")); } catch (err) { reject(err); }
      document.body.removeChild(ta);
    });
  }

  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.lang = btn.dataset.lang; state.game = null; state.liked = null; state.found = null; state.againIndex = 0;
      applyUI(state.lang); showStep("game");
    });
  });
  document.querySelectorAll("[data-liked]").forEach(function (btn) {
    btn.addEventListener("click", function () { state.liked = btn.dataset.liked; state.found = null; state.againIndex = 0; showStep("found"); });
  });
  document.querySelectorAll("[data-found]").forEach(function (btn) {
    btn.addEventListener("click", function () { state.found = btn.dataset.found; state.againIndex = 0; renderCaption(); showStep("result"); });
  });
  document.querySelectorAll("[data-back]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.closest(".step").id;
      if (id === "step-game") showStep("lang");
      else if (id === "step-liked") showStep("game");
      else if (id === "step-found") showStep("liked");
      else if (id === "step-result") showStep("found");
    });
  });
  btnCopy.addEventListener("click", function () {
    const strings = UI[state.lang];
    copyText(captionCard.textContent).then(function () {
      copyFeedback.hidden = false; copyFeedback.textContent = strings.copied; btnCopy.classList.add("copied"); btnCopy.textContent = strings.copied;
      setTimeout(function () { btnCopy.classList.remove("copied"); btnCopy.textContent = strings.copy; }, 2000);
    }).catch(function () { copyFeedback.hidden = false; copyFeedback.textContent = strings.copyFailed; });
  });
  btnAgain.addEventListener("click", function () { state.againIndex += 1; renderCaption(); });
  btnRestart.addEventListener("click", function () {
    state.lang = "en"; state.game = null; state.liked = null; state.found = null; state.againIndex = 0; applyUI("en"); showStep("lang");
  });

  applyUI("en");
  showStep("lang");
})();
