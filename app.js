/**
 * Sandbox VR · The Londoner Macau — caption generator
 * Flow: language → game → liked → found → caption
 * Template matrix: 3 languages × 3 liked × 3 found × 3 variants = 81 captions
 * Chosen game name is injected via {{game}}; optional game hashtags appended.
 * Optional future hook: ?ai=1 (skipped — templates only)
 */

(function () {
  "use strict";

  // --- Londoner lineup (edit this list to add/remove games) ---
  // id = stable English slug (logic). labels = UI display per language.
  const GAMES = [
    {
      id: "deadwood-phobia",
      labels: {
        en: "Deadwood PHOBIA",
        "zh-Hant": "屍森恐懼",
        "zh-Hans": "尸森恐惧",
      },
      hashtags: ["#Deadwood", "#PHOBIA"],
    },
    {
      id: "squid-game-virtuals",
      labels: {
        en: "Squid Game Virtuals",
        "zh-Hant": "魷魚遊戲：虛擬對決",
        "zh-Hans": "鱿鱼游戏：虚拟对决",
      },
      hashtags: ["#SquidGame"],
    },
    {
      id: "stranger-things-catalyst",
      labels: {
        en: "Stranger Things: Catalyst",
        "zh-Hant": "Stranger Things: Catalyst",
        "zh-Hans": "Stranger Things: Catalyst",
      },
      hashtags: ["#StrangerThings"],
    },
    {
      id: "age-of-dinosaurs",
      labels: {
        en: "Age of Dinosaurs",
        "zh-Hant": "恐龍紀元",
        "zh-Hans": "恐龙纪元",
      },
      hashtags: ["#AgeOfDinosaurs"],
    },
    {
      id: "rebel-moon-the-descent",
      labels: {
        en: "Rebel Moon: The Descent",
        "zh-Hant": "Rebel Moon: The Descent",
        "zh-Hans": "Rebel Moon: The Descent",
      },
      hashtags: ["#RebelMoon"],
    },
    {
      id: "deadwood-valley",
      labels: {
        en: "Deadwood Valley",
        "zh-Hant": "屍森血谷",
        "zh-Hans": "尸森血谷",
      },
      hashtags: ["#Deadwood"],
    },
    {
      id: "seekers-dragonfire",
      labels: {
        en: "Seekers of the Shard: Dragonfire",
        "zh-Hant": "魔石戰記：龍之焰",
        "zh-Hans": "魔石战记：龙之焰",
      },
      hashtags: ["#SeekersOfTheShard", "#Dragonfire"],
    },
    {
      id: "amber-sky-2088",
      labels: {
        en: "Amber Sky 2088",
        "zh-Hant": "鋼鐵星空 2088",
        "zh-Hans": "钢铁星空 2088",
      },
      hashtags: ["#AmberSky2088"],
    },
    {
      id: "deadwood-mansion",
      labels: {
        en: "Deadwood Mansion",
        "zh-Hant": "屍森大宅",
        "zh-Hans": "尸森大宅",
      },
      hashtags: ["#Deadwood"],
    },
    {
      id: "curse-of-davy-jones",
      labels: {
        en: "Curse of Davy Jones",
        "zh-Hant": "海魔的詛咒",
        "zh-Hans": "海魔的诅咒",
      },
      hashtags: ["#CurseOfDavyJones", "#DavyJones"],
    },
    {
      id: "ufl-unbound",
      labels: {
        en: "UFL: Unbound Fighting League",
        "zh-Hant": "決戰聯盟：解放",
        "zh-Hans": "决战联盟：解放",
      },
      hashtags: ["#UFL", "#UnboundFightingLeague"],
    },
  ];

  // --- i18n UI strings ---
  const UI = {
    en: {
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
      hintResult: "Copy and paste to IG or 小红书",
      copy: "Copy caption",
      again: "Generate again",
      copied: "Copied!",
      copyFailed: "Copy failed — select the text and copy manually",
      back: "← Back",
      restart: "Start over",
    },
    "zh-Hant": {
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
      hintResult: "複製後貼到 IG 或小紅書",
      copy: "複製文案",
      again: "再生成一次",
      copied: "已複製！",
      copyFailed: "複製失敗 — 請手動選取文字複製",
      back: "← 返回",
      restart: "重新開始",
    },
    "zh-Hans": {
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
      hintResult: "复制后贴到 IG 或小红书",
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


  // Fallback line if a template somehow lacks {{game}}
  const GAME_FALLBACK = {
    en: "We played {{game}} at Sandbox VR · The Londoner Macau.",
    "zh-Hant": "我哋喺 Sandbox VR · 澳門倫敦人玩咗 {{game}}。",
    "zh-Hans": "我们在 Sandbox VR · 澳门伦敦人玩了《{{game}}》。",
  };

  // --- State ---
  const state = {
    lang: "en",
    game: null,
    liked: null,
    found: null,
    againIndex: 0,
  };

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

  function injectGameHashtags(text, game) {
    if (!game || !game.hashtags || !game.hashtags.length) return text;
    var extras = [];
    for (var i = 0; i < game.hashtags.length; i++) {
      var tag = game.hashtags[i];
      if (text.indexOf(tag) === -1) extras.push(tag);
    }
    if (!extras.length) return text;
    var extraStr = extras.join(" ");
    if (text.indexOf("#SandboxVR") !== -1) {
      return text.replace("#SandboxVR", "#SandboxVR " + extraStr);
    }
    return text + "\n\n" + extraStr;
  }

  function buildCaption() {
    const key = state.lang + "|" + state.liked + "|" + state.found;
    let variants = TEMPLATES[key];
    if (!variants || !variants.length) {
      variants = TEMPLATES["en|immersion|walking"];
    }
    const textTpl = variants[state.againIndex % variants.length];

    const game = findGame(state.game);
    const name = gameDisplayName(game, state.lang) || state.game || "";

    let text = textTpl;
    if (text.indexOf("{{game}}") !== -1) {
      text = text.split("{{game}}").join(name);
    } else if (name) {
      const fallbackTpl = GAME_FALLBACK[state.lang] || GAME_FALLBACK.en;
      const line = fallbackTpl.split("{{game}}").join(name);
      const hashIdx = text.search(/\n\n#/);
      if (hashIdx !== -1) {
        text = text.slice(0, hashIdx) + "\n\n" + line + text.slice(hashIdx);
      } else {
        text = text + "\n\n" + line;
      }
    }

    text = injectGameHashtags(text, game);
    return text;
  }

  function renderCaption() {
    captionCard.textContent = buildCaption();
    copyFeedback.hidden = true;
    btnCopy.classList.remove("copied");
    const strings = UI[state.lang] || UI.en;
    btnCopy.textContent = strings.copy;
  }

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
