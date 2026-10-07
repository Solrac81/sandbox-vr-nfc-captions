/**
 * Sandbox VR · The Londoner Macau — caption generator
 * Flow: language → game → liked → found → caption
 * Template matrix: 3 languages × 3 liked × 3 found × 3 variants = 81 captions
 * Platforms: Instagram (templates-*.js), 小红书 + Google review (templates-platforms.js).
 * Every IG / 小红书 caption gets exactly 5 hashtags in the chosen language.
 * Optional future hook: ?ai=1 (skipped — templates only)
 */

(function () {
  "use strict";

  // --- Londoner lineup (edit this list to add/remove games) ---
  // id = stable English slug (logic). labels = UI display per language.
  // tags = one game hashtag per language (IG). xhs = 小红书-safe overrides for IP games:
  // generic description + generic hashtag (小红书 captions never name Netflix / IP titles).
  const GAMES = [
    {
      id: "deadwood-origins",
      isNew: true,
      labels: { en: "Deadwood Origins", "zh-Hant": "屍森：起源", "zh-Hans": "尸森：起源" },
      tags: { en: "#DeadwoodOrigins", "zh-Hant": "#屍森起源", "zh-Hans": "#尸森起源" },
    },
    {
      id: "deadwood-phobia",
      labels: { en: "Deadwood PHOBIA", "zh-Hant": "屍森恐懼", "zh-Hans": "尸森恐惧" },
      tags: { en: "#DeadwoodPhobia", "zh-Hant": "#屍森恐懼", "zh-Hans": "#尸森恐惧" },
    },
    {
      id: "squid-game-virtuals",
      ip: true,
      labels: { en: "Squid Game Virtuals", "zh-Hant": "魷魚遊戲：虛擬對決", "zh-Hans": "鱿鱼游戏：虚拟对决" },
      tags: { en: "#SquidGame", "zh-Hant": "#魷魚遊戲", "zh-Hans": "#鱿鱼游戏" },
      xhs: {
        labels: { en: "a survival-challenge VR game", "zh-Hant": "生存挑戰主題VR", "zh-Hans": "生存挑战主题VR" },
        tags: { en: "#SurvivalChallenge", "zh-Hant": "#生存挑戰", "zh-Hans": "#生存挑战" },
      },
    },
    {
      id: "stranger-things-catalyst",
      ip: true,
      labels: { en: "Stranger Things: Catalyst", "zh-Hant": "Stranger Things: Catalyst", "zh-Hans": "Stranger Things: Catalyst" },
      tags: { en: "#StrangerThings", "zh-Hant": "#怪奇物語", "zh-Hans": "#怪奇物语" },
      xhs: {
        labels: { en: "a sci-fi adventure VR game", "zh-Hant": "科幻冒險主題VR", "zh-Hans": "科幻冒险主题VR" },
        tags: { en: "#SciFiAdventure", "zh-Hant": "#科幻冒險", "zh-Hans": "#科幻冒险" },
      },
    },
    {
      id: "age-of-dinosaurs",
      labels: { en: "Age of Dinosaurs", "zh-Hant": "恐龍紀元", "zh-Hans": "恐龙纪元" },
      tags: { en: "#AgeOfDinosaurs", "zh-Hant": "#恐龍紀元", "zh-Hans": "#恐龙纪元" },
    },
    {
      id: "rebel-moon-the-descent",
      ip: true,
      labels: { en: "Rebel Moon: The Descent", "zh-Hant": "Rebel Moon: The Descent", "zh-Hans": "Rebel Moon: The Descent" },
      tags: { en: "#RebelMoon", "zh-Hant": "#月球叛軍", "zh-Hans": "#月球叛军" },
      xhs: {
        labels: { en: "a space adventure VR game", "zh-Hant": "太空冒險主題VR", "zh-Hans": "太空冒险主题VR" },
        tags: { en: "#SpaceAdventure", "zh-Hant": "#太空冒險", "zh-Hans": "#太空冒险" },
      },
    },
    {
      id: "deadwood-valley",
      labels: { en: "Deadwood Valley", "zh-Hant": "屍森血谷", "zh-Hans": "尸森血谷" },
      tags: { en: "#DeadwoodValley", "zh-Hant": "#屍森血谷", "zh-Hans": "#尸森血谷" },
    },
    {
      id: "seekers-dragonfire",
      labels: { en: "Seekers of the Shard: Dragonfire", "zh-Hant": "魔石戰記：龍之焰", "zh-Hans": "魔石战记：龙之焰" },
      tags: { en: "#SeekersOfTheShard", "zh-Hant": "#魔石戰記", "zh-Hans": "#魔石战记" },
    },
    {
      id: "amber-sky-2088",
      labels: { en: "Amber Sky 2088", "zh-Hant": "鋼鐵星空 2088", "zh-Hans": "钢铁星空 2088" },
      tags: { en: "#AmberSky2088", "zh-Hant": "#鋼鐵星空2088", "zh-Hans": "#钢铁星空2088" },
    },
    {
      id: "deadwood-mansion",
      labels: { en: "Deadwood Mansion", "zh-Hant": "屍森大宅", "zh-Hans": "尸森大宅" },
      tags: { en: "#DeadwoodMansion", "zh-Hant": "#屍森大宅", "zh-Hans": "#尸森大宅" },
    },
    {
      id: "curse-of-davy-jones",
      labels: { en: "Curse of Davy Jones", "zh-Hant": "海魔的詛咒", "zh-Hans": "海魔的诅咒" },
      tags: { en: "#CurseOfDavyJones", "zh-Hant": "#海魔的詛咒", "zh-Hans": "#海魔的诅咒" },
    },
    {
      id: "ufl-unbound",
      labels: { en: "UFL: Unbound Fighting League", "zh-Hant": "決戰聯盟：解放", "zh-Hans": "决战联盟：解放" },
      tags: { en: "#UFL", "zh-Hant": "#決戰聯盟", "zh-Hans": "#决战联盟" },
    },
  ];

  // --- Google review link ---
  // TODO: replace with https://search.google.com/local/writereview?placeid=PLACE_ID
  //       once the Google Place ID for Sandbox VR at The Londoner Macau is confirmed.
  const GOOGLE_REVIEW_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Sandbox VR Macau The Londoner");

  // --- Hashtags: exactly 5 per IG / 小红书 caption, all in the guest's language ---
  const HASHTAGS = {
    core: {
      en: ["#SandboxVR", "#TheLondonerMacau", "#MacauTravel", "#VRGaming", "#MacauThingsToDo"],
      "zh-Hant": ["#澳門倫敦人", "#澳門旅遊", "#澳門好去處", "#虛擬實境", "#澳門打卡"],
      "zh-Hans": ["#澳门伦敦人", "#澳门旅游", "#澳门好去处", "#虚拟现实", "#澳门打卡"],
    },
    liked: {
      en: { immersion: "#ImmersiveExperience", friends: "#FriendsTrip", thrills: "#AdrenalineRush" },
      "zh-Hant": { immersion: "#沉浸式體驗", friends: "#朋友聚會", thrills: "#刺激體驗" },
      "zh-Hans": { immersion: "#沉浸式体验", friends: "#朋友聚会", thrills: "#刺激体验" },
    },
  };
  const HASHTAG_COUNT = 5;

  const XHS_LOCATION = {
    en: "📍 The Londoner Macau, Level 2",
    "zh-Hant": "📍澳門倫敦人2樓",
    "zh-Hans": "📍澳门伦敦人2楼",
  };

  const PLATFORMS = ["ig", "xhs", "google"];

  // --- i18n UI strings ---
  const UI = {
    en: {
      platformIg: "Instagram",
      platformXhs: "小红书",
      platformGoogle: "Google review",
      openGoogle: "Open Google review page",
      newBadge: "NEW",
      titleLang: "Choose your language",
      hintLang: "Pick one to continue",
      titleGame: "What did you play?",
      hintGame: "Tap your game",
      titleLiked: "What did you love most?",
      hintLiked: "Tap one",
      likedImmersion: "Immersion / story",
      likedFriends: "Friends / team",
      likedThrills: "Thrills / intensity",
      titleFound: "How did you find us?",
      hintFound: "Tap one",
      foundWalking: "Walking by at The Londoner",
      foundSocial: "Social media (IG / 小红书)",
      foundFriend: "Friend or hotel recommendation",
      titleResult: "Your caption",
      hintResult: "Pick a platform, edit if you like, then copy & post",
      copy: "Copy caption",
      again: "Generate again",
      copied: "Copied!",
      copyFailed: "Copy failed — select the text and copy manually",
      back: "← Back",
      restart: "Start over",
    },
    "zh-Hant": {
      platformIg: "Instagram",
      platformXhs: "小紅書",
      platformGoogle: "Google 評論",
      openGoogle: "打開 Google 評論頁",
      newBadge: "新",
      titleLang: "選擇語言",
      hintLang: "點選繼續",
      titleGame: "你玩咗邊個遊戲？",
      hintGame: "點選你玩過嘅遊戲",
      titleLiked: "你最喜歡什麼？",
      hintLiked: "點選一項",
      likedImmersion: "沉浸感／劇情",
      likedFriends: "朋友／團隊",
      likedThrills: "刺激／緊張感",
      titleFound: "你是怎麼找到我們的？",
      hintFound: "點選一項",
      foundWalking: "在倫敦人散步經過",
      foundSocial: "社交媒體（IG／小紅書）",
      foundFriend: "朋友或酒店推薦",
      titleResult: "你的文案",
      hintResult: "揀平台，可自行修改，再複製發佈",
      copy: "複製文案",
      again: "再生成一次",
      copied: "已複製！",
      copyFailed: "複製失敗 — 請手動選取文字複製",
      back: "← 返回",
      restart: "重新開始",
    },
    "zh-Hans": {
      platformIg: "Instagram",
      platformXhs: "小红书",
      platformGoogle: "Google 评论",
      openGoogle: "打开 Google 评论页",
      newBadge: "新",
      titleLang: "选择语言",
      hintLang: "点选继续",
      titleGame: "你玩了哪个游戏？",
      hintGame: "点选你玩过的游戏",
      titleLiked: "你最喜欢什么？",
      hintLiked: "点选一项",
      likedImmersion: "沉浸感／剧情",
      likedFriends: "朋友／团队",
      likedThrills: "刺激／紧张感",
      titleFound: "你是怎么找到我们的？",
      hintFound: "点选一项",
      foundWalking: "在伦敦人散步经过",
      foundSocial: "社交媒体（IG／小红书）",
      foundFriend: "朋友或酒店推荐",
      titleResult: "你的文案",
      hintResult: "选平台，可自行修改，再复制发布",
      copy: "复制文案",
      again: "再生成一次",
      copied: "已复制！",
      copyFailed: "复制失败 — 请手动选取文字复制",
      back: "← 返回",
      restart: "重新开始",
    },
  };

  // --- Caption template matrix (loaded from templates-*.js before this file) ---
  // Key: lang | liked | found → array of 3 full captions; Generate again cycles whole caption
  const TEMPLATES = window.TEMPLATES || {};
  const PLATFORM_TEMPLATES = window.PLATFORM_TEMPLATES || {};


  // Fallback line if a template somehow lacks {{game}}
  const GAME_FALLBACK = {
    en: "We played {{game}} at Sandbox VR · The Londoner Macau.",
    "zh-Hant": "我哋喺 Sandbox VR · 澳門倫敦人玩咗 {{game}}。",
    "zh-Hans": "我们在 Sandbox VR · 澳门伦敦人玩了《{{game}}》。",
  };

  // --- State ---
  const state = {
    lang: "en",
    platform: "ig",
    game: null,
    liked: null,
    found: null,
    againIndex: 0,
  };

  // --- Helpers ---
  function findGame(id) {
    for (var i = 0; i < GAMES.length; i++) {
      if (GAMES[i].id === id) return GAMES[i];
    }
    return null;
  }

  function gameDisplayName(game, lang) {
    if (!game) return "";
    return (game.labels && game.labels[lang]) || game.labels.en || game.id;
  }

  function showStep(name) {
    Object.keys(steps).forEach(function (key) {
      const el = steps[key];
      if (!el) return;
      if (key === name) {
        el.hidden = false;
        el.classList.add("active");
      } else {
        el.hidden = true;
        el.classList.remove("active");
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyUI(lang) {
    const strings = UI[lang] || UI.en;
    document.documentElement.lang =
      lang === "zh-Hant" ? "zh-Hant" : lang === "zh-Hans" ? "zh-Hans" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (strings[key] != null) {
        el.textContent = strings[key];
      }
    });

    renderGameChoices(lang);
  }

  function renderGameChoices(lang) {
    if (!gameChoices) return;
    gameChoices.innerHTML = "";
    GAMES.forEach(function (game) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn game-btn";
      btn.setAttribute("data-game", game.id);
      btn.textContent = gameDisplayName(game, lang);
      if (game.isNew) {
        const badge = document.createElement("span");
        badge.className = "new-badge";
        badge.textContent = (UI[lang] || UI.en).newBadge;
        btn.appendChild(document.createTextNode(" "));
        btn.appendChild(badge);
      }
      btn.addEventListener("click", function () {
        state.game = game.id;
        state.liked = null;
        state.found = null;
        state.againIndex = 0;
        showStep("liked");
      });
      gameChoices.appendChild(btn);
    });
  }

  function stripHashtags(text) {
    var idx = text.search(/\n\n#/);
    return (idx === -1 ? text : text.slice(0, idx)).trim();
  }

  function buildHashtags(lang, platform, game, liked) {
    var core = HASHTAGS.core[lang] || HASHTAGS.core.en;
    var gameTag = null;
    if (game) {
      var src = platform === "xhs" && game.xhs ? game.xhs.tags : game.tags;
      gameTag = src && src[lang];
    }
    var likedTag = (HASHTAGS.liked[lang] || {})[liked];
    var wanted = [core[0], core[1], gameTag, likedTag, core[2], core[3], core[4]];
    var used = {};
    var out = [];
    wanted.forEach(function (t) {
      if (!t || out.length >= HASHTAG_COUNT) return;
      var k = t.toLowerCase();
      if (used[k]) return;
      used[k] = true;
      out.push(t);
    });
    return out;
  }

  function quoteName(name, lang, generic) {
    if (generic || !name) return name;
    if (lang === "zh-Hans") return "《" + name + "》";
    if (lang === "zh-Hant") return "「" + name + "」";
    return name;
  }

  /** Pure generator: no DOM. platform = ig | xhs | google */
  function generate(opts) {
    var lang = opts.lang || "en";
    var platform = opts.platform || "ig";
    var liked = opts.liked || "immersion";
    var found = opts.found || "walking";
    var idx = opts.variant || 0;
    var game = findGame(opts.game);

    if (platform === "ig") {
      var variants = TEMPLATES[lang + "|" + liked + "|" + found] || TEMPLATES["en|immersion|walking"];
      var tpl = stripHashtags(variants[idx % variants.length]);
      var name = gameDisplayName(game, lang) || opts.game || "";
      var text = tpl;
      if (text.indexOf("{{game}}") !== -1) {
        text = text.split("{{game}}").join(name);
      } else if (name) {
        text += "\n\n" + (GAME_FALLBACK[lang] || GAME_FALLBACK.en).split("{{game}}").join(name);
      }
      return text + "\n\n" + buildHashtags(lang, "ig", game, liked).join(" ");
    }

    var set = (PLATFORM_TEMPLATES[platform] || {})[lang] || PLATFORM_TEMPLATES[platform].en;
    var list = set[liked] || set.immersion;
    var t = list[idx % list.length];
    var generic = platform === "xhs" && game && game.xhs;
    var gname = generic ? game.xhs.labels[lang] : gameDisplayName(game, lang);
    gname = quoteName(gname, lang, generic);
    var out = t.split("{{found}}").join(set.found[found] || "").split("{{game}}").join(gname);
    out = out.replace(/^ +/, "").replace(/  +/g, " ");
    if (platform === "google") return out;
    return out + "\n" + XHS_LOCATION[lang] + "\n\n" + buildHashtags(lang, "xhs", game, liked).join(" ");
  }

  function buildCaption() {
    return generate({
      lang: state.lang,
      platform: state.platform,
      game: state.game,
      liked: state.liked,
      found: state.found,
      variant: state.againIndex,
    });
  }

  // Expose pure logic for headless tests (node) and debugging
  window.CaptionGen = {
    GAMES: GAMES,
    PLATFORMS: PLATFORMS,
    GOOGLE_REVIEW_URL: GOOGLE_REVIEW_URL,
    generate: generate,
    buildHashtags: buildHashtags,
  };
  if (typeof document === "undefined" || !document.getElementById("step-lang")) return;

  // --- DOM ---
  const steps = {
    lang: document.getElementById("step-lang"),
    game: document.getElementById("step-game"),
    liked: document.getElementById("step-liked"),
    found: document.getElementById("step-found"),
    result: document.getElementById("step-result"),
  };
  const gameChoices = document.getElementById("game-choices");
  const captionCard = document.getElementById("caption-card");
  const btnCopy = document.getElementById("btn-copy");
  const btnAgain = document.getElementById("btn-again");
  const btnRestart = document.getElementById("btn-restart");
  const copyFeedback = document.getElementById("copy-feedback");
  const btnGoogle = document.getElementById("btn-google");
  const platformTabs = document.querySelectorAll("[data-platform]");

  function renderCaption() {
    captionCard.textContent = buildCaption();
    copyFeedback.hidden = true;
    btnCopy.classList.remove("copied");
    const strings = UI[state.lang] || UI.en;
    btnCopy.textContent = strings.copy;
    platformTabs.forEach(function (tab) {
      const on = tab.getAttribute("data-platform") === state.platform;
      tab.classList.toggle("active", on);
      tab.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (btnGoogle) {
      btnGoogle.hidden = state.platform !== "google";
      btnGoogle.href = GOOGLE_REVIEW_URL;
    }
  }

  platformTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      state.platform = tab.getAttribute("data-platform");
      state.againIndex = 0;
      renderCaption();
    });
  });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for file:// or older browsers
    return new Promise(function (resolve, reject) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      try {
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) resolve();
        else reject(new Error("execCommand failed"));
      } catch (err) {
        document.body.removeChild(ta);
        reject(err);
      }
    });
  }

  // --- Events ---
  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.lang = btn.getAttribute("data-lang");
      state.game = null;
      state.liked = null;
      state.found = null;
      state.againIndex = 0;
      applyUI(state.lang);
      showStep("game");
    });
  });

  document.querySelectorAll("[data-liked]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.liked = btn.getAttribute("data-liked");
      state.found = null;
      state.againIndex = 0;
      showStep("found");
    });
  });

  document.querySelectorAll("[data-found]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.found = btn.getAttribute("data-found");
      state.againIndex = 0;
      renderCaption();
      showStep("result");
    });
  });

  document.querySelectorAll("[data-back]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const step = btn.closest(".step");
      if (!step) return;
      const id = step.id;
      if (id === "step-game") {
        showStep("lang");
      } else if (id === "step-liked") {
        showStep("game");
      } else if (id === "step-found") {
        showStep("liked");
      } else if (id === "step-result") {
        showStep("found");
      }
    });
  });

  btnCopy.addEventListener("click", function () {
    const text = captionCard.textContent;
    const strings = UI[state.lang] || UI.en;
    copyText(text)
      .then(function () {
        copyFeedback.hidden = false;
        copyFeedback.textContent = strings.copied;
        btnCopy.classList.add("copied");
        btnCopy.textContent = strings.copied;
        setTimeout(function () {
          btnCopy.classList.remove("copied");
          btnCopy.textContent = strings.copy;
        }, 2000);
      })
      .catch(function () {
        copyFeedback.hidden = false;
        copyFeedback.textContent = strings.copyFailed;
      });
  });

  btnAgain.addEventListener("click", function () {
    state.againIndex += 1;
    renderCaption();
  });

  btnRestart.addEventListener("click", function () {
    state.lang = "en";
    state.game = null;
    state.liked = null;
    state.found = null;
    state.againIndex = 0;
    applyUI("en");
    showStep("lang");
  });

  // Optional future hook (no-op for now)
  // if (new URLSearchParams(location.search).get("ai") === "1") { ... }

  // Init
  applyUI("en");
  showStep("lang");
})();
