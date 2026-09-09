/**
 * Sandbox VR · The Londoner Macau — caption generator
 * Template matrix: 3 languages × 3 liked × 3 found-us = 27 captions
 * Optional future hook: ?ai=1 (skipped — templates only)
 */

(function () {
  "use strict";

  // --- i18n UI strings ---
  const UI = {
    en: {
      titleLang: "Choose your language",
      hintLang: "Pick one to continue",
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

  // --- Caption template matrix ---
  // Key: lang | liked | found
  // liked: immersion | friends | thrills
  // found: walking | social | friend
  const TEMPLATES = {
    // ========== ENGLISH ==========
    "en|immersion|walking":
      "Just walked into The Londoner and stepped into another world at Sandbox VR ✨ The story pulled us in from the first second — you forget you're in Macau and just live the mission. Free roam VR hits different when the narrative is this good.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VR #FreeRoamVR #Immersive #VirtualReality #MacauTravel #LondonerMacau",

    "en|immersion|social":
      "Saw Sandbox VR all over IG and finally tried it at The Londoner Macau — the immersion is unreal. You're not watching a story, you're inside it. Headset off and I still felt like I was in that world.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VRExperience #FreeRoamVR #InstagramFinds #VirtualReality #MacauMustDo #ImmersiveVR",

    "en|immersion|friend":
      "A friend said we had to try Sandbox VR at The Londoner — and they were so right. The story, the world-building, the way you move through the mission… peak immersion. Already planning our next game.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VR #FreeRoamVR #StoryDriven #VirtualReality #MacauWithFriends #LondonerMacau",

    "en|friends|walking":
      "Spotted Sandbox VR while wandering The Londoner and dragged the whole crew in 😂 Best spontaneous team decision of the trip. Laughing, yelling, high-fiving mid-mission — this is how you do Macau with friends.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VR #TeamFun #FreeRoamVR #FriendsTrip #MacauTravel #GroupAdventure",

    "en|friends|social":
      "Kept seeing Sandbox VR on social and finally booked it for the squad at The Londoner Macau. Nothing bonds a group like surviving a VR mission together. 10/10 team activity — do it with people you love (and can scream with).\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VRExperience #SquadGoals #FreeRoamVR #MacauFun #FriendsActivity #VirtualReality",

    "en|friends|friend":
      "Hotel tipped us off, a friend hyped it up — Sandbox VR at The Londoner did not disappoint. Our team chemistry went from zero to legendary in one session. If you're in Macau with your people, this is the move.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VR #TeamAdventure #FreeRoamVR #MacauWithFriends #LondonerMacau #GroupFun",

    "en|thrills|walking":
      "Walked past Sandbox VR at The Londoner and said \"why not?\" — then spent the next hour heart-racing through free-roam VR 🔥 Intensity on another level. Hands still buzzing. Macau thrills, unlocked.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VR #Adrenaline #FreeRoamVR #ThrillSeekers #MacauTravel #VirtualReality",

    "en|thrills|social":
      "IG made it look intense. Real life at Sandbox VR · The Londoner Macau? Even better. Free-roam thrills, full-body commitment, zero chill. If you like your entertainment with a pulse, run don't walk.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VRExperience #AdrenalineRush #FreeRoamVR #MustTry #MacauFun #ImmersiveVR",

    "en|thrills|friend":
      "Friend swore Sandbox VR would wreck us (in the best way). They weren't lying. Pure intensity at The Londoner Macau — every mission hits harder when you're actually in the room. Worth every scream.\n\n#SandboxVR #TheLondonerMacau #Macau #Macao #VR #Thrills #FreeRoamVR #Adrenaline #LondonerMacau #VirtualReality",

    // ========== TRADITIONAL CHINESE ==========
    "zh-Hant|immersion|walking":
      "在倫敦人閒逛時走進 Sandbox VR，一戴上設備整個人就被劇情帶走 ✨ 沉浸感強到忘記自己還在澳門——自由行走 VR，故事感真的滿分。\n\n#SandboxVR #澳門倫敦人 #澳門 #澳門好去處 #VR體驗 #自由行走VR #沉浸式體驗 #虛擬實境 #Macau #TheLondonerMacau",

    "zh-Hant|immersion|social":
      "在 IG／小紅書刷到 Sandbox VR 很久，終於在澳門倫敦人親身體驗——沉浸感超乎想像。不是「看」故事，是「活」在故事裡。摘下頭盔還覺得自己在那個世界。\n\n#SandboxVR #澳門倫敦人 #澳門 #小紅書推薦 #VR體驗 #自由行走VR #沉浸式 #虛擬實境 #澳門必去 #TheLondonerMacau",

    "zh-Hant|immersion|friend":
      "朋友強烈安利倫敦人的 Sandbox VR，一試就被劇情和世界觀收服。在空間裡自由移動、完成任務，沉浸感真的很頂。下次還要再來一場！\n\n#SandboxVR #澳門倫敦人 #澳門 #朋友推薦 #VR體驗 #自由行走VR #劇情向 #虛擬實境 #澳門旅遊 #TheLondonerMacau",

    "zh-Hant|friends|walking":
      "在倫敦人散步經過 Sandbox VR，整隊人一時興起衝進去 😂 邊玩邊叫邊擊掌，團隊默契瞬間拉滿。跟朋友來澳門，這種體驗最對味！\n\n#SandboxVR #澳門倫敦人 #澳門 #澳門好玩 #VR體驗 #團隊活動 #自由行走VR #朋友出遊 #澳門旅遊 #TheLondonerMacau",

    "zh-Hant|friends|social":
      "社交媒體刷到超多次，終於約齊朋友來澳門倫敦人玩 Sandbox VR。一起通關的感覺太爽——尖叫、大笑、互相打氣，團體活動天花板。\n\n#SandboxVR #澳門倫敦人 #澳門 #小紅書打卡 #VR體驗 #朋友聚會 #自由行走VR #澳門好玩 #虛擬實境 #TheLondonerMacau",

    "zh-Hant|friends|friend":
      "酒店／朋友推薦來試 Sandbox VR，整隊玩得超開心。在倫敦人一起闖關，默契與笑聲齊飛。來澳門跟好友必排這項！\n\n#SandboxVR #澳門倫敦人 #澳門 #酒店推薦 #VR體驗 #團隊冒險 #自由行走VR #澳門好去處 #朋友出遊 #TheLondonerMacau",

    "zh-Hant|thrills|walking":
      "路過倫敦人的 Sandbox VR 心想「試試看？」——結果心跳狂飆一整場 🔥 自由行走 VR 的刺激感完全不同，手都還在抖。澳門刺激體驗＋1！\n\n#SandboxVR #澳門倫敦人 #澳門 #刺激體驗 #VR體驗 #腎上腺素 #自由行走VR #澳門好玩 #虛擬實境 #TheLondonerMacau",

    "zh-Hant|thrills|social":
      "IG／小紅書看起來就很燃，親身在澳門倫敦人玩 Sandbox VR 更誇張。全身投入、零冷場，喜歡心跳加速的人一定要來。\n\n#SandboxVR #澳門倫敦人 #澳門 #小紅書推薦 #VR體驗 #超刺激 #自由行走VR #必玩 #澳門旅遊 #TheLondonerMacau",

    "zh-Hant|thrills|friend":
      "朋友說 Sandbox VR 會把人嚇到（但很好玩）——屬實。在倫敦人每一場任務都拉滿緊張感，尖叫值滿分，值得再來！\n\n#SandboxVR #澳門倫敦人 #澳門 #朋友推薦 #VR體驗 #刺激感 #自由行走VR #腎上腺素 #虛擬實境 #TheLondonerMacau",

    // ========== SIMPLIFIED CHINESE ==========
    "zh-Hans|immersion|walking":
      "在伦敦人闲逛时走进 Sandbox VR，一戴上设备整个人就被剧情带走 ✨ 沉浸感强到忘记自己还在澳门——自由行走 VR，故事感真的满分。\n\n#SandboxVR #澳门伦敦人 #澳门 #澳门好去处 #VR体验 #自由行走VR #沉浸式体验 #虚拟现实 #Macau #TheLondonerMacau",

    "zh-Hans|immersion|social":
      "在 IG／小红书刷到 Sandbox VR 很久，终于在澳门伦敦人亲身体验——沉浸感超乎想象。不是「看」故事，是「活」在故事里。摘下头盔还觉得自己在那个世界。\n\n#SandboxVR #澳门伦敦人 #澳门 #小红书推荐 #VR体验 #自由行走VR #沉浸式 #虚拟现实 #澳门必去 #TheLondonerMacau",

    "zh-Hans|immersion|friend":
      "朋友强烈安利伦敦人的 Sandbox VR，一试就被剧情和世界观收服。在空间里自由移动、完成任务，沉浸感真的很顶。下次还要再来一场！\n\n#SandboxVR #澳门伦敦人 #澳门 #朋友推荐 #VR体验 #自由行走VR #剧情向 #虚拟现实 #澳门旅游 #TheLondonerMacau",

    "zh-Hans|friends|walking":
      "在伦敦人散步经过 Sandbox VR，整队人一时兴起冲进去 😂 边玩边叫边击掌，团队默契瞬间拉满。跟朋友来澳门，这种体验最对味！\n\n#SandboxVR #澳门伦敦人 #澳门 #澳门好玩 #VR体验 #团队活动 #自由行走VR #朋友出游 #澳门旅游 #TheLondonerMacau",

    "zh-Hans|friends|social":
      "社交媒体刷到超多次，终于约齐朋友来澳门伦敦人玩 Sandbox VR。一起通关的感觉太爽——尖叫、大笑、互相打气，团体活动天花板。\n\n#SandboxVR #澳门伦敦人 #澳门 #小红书打卡 #VR体验 #朋友聚会 #自由行走VR #澳门好玩 #虚拟现实 #TheLondonerMacau",

    "zh-Hans|friends|friend":
      "酒店／朋友推荐来试 Sandbox VR，整队玩得超开心。在伦敦人一起闯关，默契与笑声齐飞。来澳门跟好友必排这项！\n\n#SandboxVR #澳门伦敦人 #澳门 #酒店推荐 #VR体验 #团队冒险 #自由行走VR #澳门好去处 #朋友出游 #TheLondonerMacau",

    "zh-Hans|thrills|walking":
      "路过伦敦人的 Sandbox VR 心想「试试看？」——结果心跳狂飙一整场 🔥 自由行走 VR 的刺激感完全不同，手都还在抖。澳门刺激体验＋1！\n\n#SandboxVR #澳门伦敦人 #澳门 #刺激体验 #VR体验 #肾上腺素 #自由行走VR #澳门好玩 #虚拟现实 #TheLondonerMacau",

    "zh-Hans|thrills|social":
      "IG／小红书看起来就很燃，亲身在澳门伦敦人玩 Sandbox VR 更夸张。全身投入、零冷场，喜欢心跳加速的人一定要来。\n\n#SandboxVR #澳门伦敦人 #澳门 #小红书推荐 #VR体验 #超刺激 #自由行走VR #必玩 #澳门旅游 #TheLondonerMacau",

    "zh-Hans|thrills|friend":
      "朋友说 Sandbox VR 会把人吓到（但很好玩）——属实。在伦敦人每一场任务都拉满紧张感，尖叫值满分，值得再来！\n\n#SandboxVR #澳门伦敦人 #澳门 #朋友推荐 #VR体验 #刺激感 #自由行走VR #肾上腺素 #虚拟现实 #TheLondonerMacau",
  };

  // Variant endings for "Generate again" (same combo, slight freshness)
  const AGAIN_SUFFIX = {
    en: [
      "\n\nWould go again in a heartbeat.",
      "\n\nThat was wild — highly recommend.",
      "\n\nMacau highlight of the trip, no contest.",
    ],
    "zh-Hant": [
      "\n\n下次還會再衝一場。",
      "\n\n太好玩了，強烈推薦！",
      "\n\n這趟澳門的亮點非它莫屬。",
    ],
    "zh-Hans": [
      "\n\n下次还会再冲一场。",
      "\n\n太好玩了，强烈推荐！",
      "\n\n这趟澳门的亮点非它莫属。",
    ],
  };

  // --- State ---
  const state = {
    lang: "en",
    liked: null,
    found: null,
    againIndex: 0,
  };

  // --- DOM ---
  const steps = {
    lang: document.getElementById("step-lang"),
    liked: document.getElementById("step-liked"),
    found: document.getElementById("step-found"),
    result: document.getElementById("step-result"),
  };
  const captionCard = document.getElementById("caption-card");
  const btnCopy = document.getElementById("btn-copy");
  const btnAgain = document.getElementById("btn-again");
  const btnRestart = document.getElementById("btn-restart");
  const copyFeedback = document.getElementById("copy-feedback");

  // --- Helpers ---
  function showStep(name) {
    Object.keys(steps).forEach(function (key) {
      const el = steps[key];
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
  }

  function buildCaption() {
    const key = state.lang + "|" + state.liked + "|" + state.found;
    let text = TEMPLATES[key];
    if (!text) {
      text = TEMPLATES["en|immersion|walking"];
    }
    if (state.againIndex > 0) {
      const suffixes = AGAIN_SUFFIX[state.lang] || AGAIN_SUFFIX.en;
      const suffix = suffixes[(state.againIndex - 1) % suffixes.length];
      text = text + suffix;
    }
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
      state.liked = null;
      state.found = null;
      state.againIndex = 0;
      applyUI(state.lang);
      showStep("liked");
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
      if (id === "step-liked") {
        showStep("lang");
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
