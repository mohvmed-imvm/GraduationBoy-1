
"use strict";

const $ = (selector) => document.querySelector(selector);

const intro = $("#intro");
const countdownNumber = $("#countdownNumber");
const startBtn = $("#startBtn");
const mainContent = $("#mainContent");

const progressFill = $("#progressFill");
const progressNumber = $("#progressNumber");
const progressTrack = $("#progressTrack");
const progressStatus = $("#progressStatus");
const completeMissionBtn = $("#completeMissionBtn");
const missionNote = $(".mission-note");

const giftButton = $("#giftButton");
const finalMessage = $("#finalMessage");
const particleLayer = $("#particleLayer");
const stars = $("#stars");

const demoBtn = $("#demoBtn");
const demoModal = $("#demoModal");
const closeDemoModal = $("#closeDemoModal");

const settingsBtn = $("#settingsBtn");
const settingsModal = $("#settingsModal");
const closeSettingsModal = $("#closeSettingsModal");
const languageBtn = $("#languageBtn");
const settingsLanguageBtn = $("#settingsLanguageBtn");
const themeBtn = $("#themeBtn");

const graduationMusic = $("#graduationMusic");
const musicControl = $("#musicControl");
const musicToggle = $("#musicToggle");

let currentLanguage = "en";
let missionStarted = false;
let missionCompleted = false;
let giftOpened = false;
let countdownTimer = null;
let progressTimer = null;
let previousFocus = null;

const translations = {
  en: {
    demoBadge: "DEMO TEMPLATE · CUSTOMIZABLE",
    introKicker: "A NEW CHAPTER BEGINS",
    introSmall: "PREPARE FOR THE FINAL MOMENT",
    introTitle: "YOUR JOURNEY. YOUR LEGACY.",
    introDescription: "Every challenge led you here.",
    startMission: "BEGIN YOUR FINAL MISSION",
    introHint: "A MOMENT MADE JUST FOR YOU",
    heroEyebrow: "THE FINAL MISSION",
    heroOverline: "THIS IS YOUR MOMENT",
    heroTitleOne: "MISSION",
    heroTitleTwo: "ACCOMPLISHED",
    heroDescription: "You dreamed it. You worked for it. Now it's yours.",
    heroMeta: "ONE JOURNEY. A THOUSAND MEMORIES.",
    visualLabel: "LEVEL COMPLETED",
    missionKicker: "OPERATION: GRADUATION",
    missionTitle: "Look how far you've come.",
    progressLabel: "MISSION PROGRESS",
    progressInitial: "Awaiting final confirmation...",
    progressRunning: "Mission in progress...",
    progressComplete: "MISSION COMPLETED — 100%",
    progressStart: "THE DREAM",
    progressCenter: "THE HARD WORK",
    progressEnd: "THE ACHIEVEMENT",
    completeMission: "COMPLETE THE MISSION",
    missionNote: "One last step before your big reveal.",
    missionDoneNote: "You did it. Every step brought you here.",
    journeyKicker: "YOUR STORY SO FAR",
    journeyTitle: "Every step mattered.",
    cardOneTitle: "The Dream",
    cardOneText: "It started with a goal only you could see.",
    cardTwoTitle: "The Grind",
    cardTwoText: "The late nights, the doubts, the comeback.",
    cardThreeTitle: "The Victory",
    cardThreeText: "You kept going. Now look at you.",
    memoriesKicker: "THE MOMENTS THAT MADE YOU",
    memoriesTitle: "Memories worth keeping.",
    memoryOne: "The day it all became real.",
    memoryTwo: "The people who made it better.",
    memoryThree: "A memory for the next chapter.",
    photoHint: "Demo photos — replace them with your own memories.",
    revealEyebrow: "THE FINAL REWARD",
    revealTitle: "Ready for your next chapter?",
    revealDescription: "Your biggest achievement isn't just what you finished. It's who you became along the way.",
    giftButtonLabel: "UNLOCK YOUR MESSAGE",
    giftOpening: "YOUR MESSAGE IS UNLOCKING...",
    giftOpened: "MESSAGE UNLOCKED",
    giftHint: "Tap the gift to reveal your surprise.",
    finalKicker: "MISSION ACCOMPLISHED",
    finalTitle: "You made it.",
    finalText: "This is more than a graduation. It's proof that you can keep going, even when the road gets hard. Be proud of every step, celebrate this moment, and never stop believing in what comes next. The world is waiting for you.",
    finalSignature: "Your next chapter starts now.",
    footerLine: "Made for a moment that deserves to be remembered.",
    footerLink: "Discover 4U Celebrations ↗",
    modalKicker: "A LITTLE NOTE",
    modalTitle: "This is a demo template",
    modalText: "Everything you see here is customizable. Names, photos, messages, colors, music, and details can be personalized for your celebration.",
    modalOrder: "EXPLORE 4U CELEBRATIONS ↗",
    modalFootnote: "Your story. Your style. Your moment.",
    settingsKicker: "YOUR EXPERIENCE",
    settingsTitle: "Settings",
    languageSetting: "Language",
    themeSetting: "Appearance",
    themeDark: "Dark mode",
    themeLight: "Light mode",
    musicLabel: "MUSIC",
    musicOn: "Music on",
    musicOff: "Music off"
  },

  ar: {
    demoBadge: "نموذج تجريبي · قابل للتعديل",
    introKicker: "فصل جديد بيبدأ",
    introSmall: "استعد للحظة الأخيرة",
    introTitle: "رحلتك .. وإنجازك",
    introDescription: "كل تحدي عديت بيه وصّلك للحظة دي",
    startMission: "ابدأ مهمتك الأخيرة",
    introHint: "لحظة معمولة مخصوص ليك",
    heroEyebrow: "المهمة الأخيرة",
    heroOverline: "دي لحظتك",
    heroTitleOne: "المهمة",
    heroTitleTwo: "اكتملت",
    heroDescription: "حلمت بيها، وتعبت عشانها، والنهارده بقت حقيقة.",
    heroMeta: "رحلة واحدة .. وألف ذكرى",
    visualLabel: "المستوى اكتمل",
    missionKicker: "العملية: التخرج",
    missionTitle: "بص إنت وصلت لفين.",
    progressLabel: "تقدم المهمة",
    progressInitial: "في انتظار التأكيد الأخير...",
    progressRunning: "المهمة شغالة...",
    progressComplete: "المهمة اكتملت — ١٠٠٪",
    progressStart: "الحلم",
    progressCenter: "التعب والمجهود",
    progressEnd: "الإنجاز",
    completeMission: "كمّل المهمة",
    missionNote: "خطوة أخيرة قبل المفاجأة.",
    missionDoneNote: "عملتها يا بطل .. كل خطوة وصلتك لهنا.",
    journeyKicker: "حكايتك لحد دلوقتي",
    journeyTitle: "كل خطوة كان ليها معنى.",
    cardOneTitle: "الحلم",
    cardOneText: "بدأت بهدف كان جواك وإنت الوحيد اللي شايفه.",
    cardTwoTitle: "المجهود",
    cardTwoText: "سهر وتعب وشكوك .. ورجوع أقوى من الأول.",
    cardThreeTitle: "الانتصار",
    cardThreeText: "موقفتش .. وبص لنفسك دلوقتي.",
    memoriesKicker: "لحظات صنعت منك الشخص ده",
    memoriesTitle: "ذكريات تستاهل تفضل.",
    memoryOne: "اليوم اللي الحلم فيه بقى حقيقة.",
    memoryTwo: "الناس اللي خلت الرحلة أحلى.",
    memoryThree: "ذكرى للفصل الجديد.",
    photoHint: "صور تجريبية — تقدر تستبدلها بصورك وذكرياتك.",
    revealEyebrow: "المكافأة الأخيرة",
    revealTitle: "جاهز للفصل الجديد؟",
    revealDescription: "أكبر إنجاز مش بس اللي خلصته .. لكن الشخص اللي بقيته في الطريق.",
    giftButtonLabel: "افتح رسالتك",
    giftOpening: "رسالتك بتتفتح...",
    giftOpened: "الرسالة اتفتحت",
    giftHint: "اضغط على الهدية عشان تكتشف المفاجأة.",
    finalKicker: "المهمة اكتملت",
    finalTitle: "وصلت يا بطل.",
    finalText: "النهارده مش مجرد تخرج، دي علامة إنك تقدر تكمل حتى لما الطريق يصعب. افتخر بكل خطوة، وعيش فرحة اللحظة دي، ومتبطلش تؤمن باللي جاي. لسه قدامك حكايات كتير تستاهل تتحكي، والعالم مستني يشوف هتعمل إيه.",
    finalSignature: "فصلك الجديد بيبدأ من هنا.",
    footerLine: "لحظة تستاهل تفضل في الذاكرة.",
    footerLink: "اكتشف 4U Celebrations ↗",
    modalKicker: "معلومة صغيرة",
    modalTitle: "ده نموذج تجريبي",
    modalText: "كل حاجة شايفها هنا قابلة للتغيير. الاسم والصور والرسائل والألوان والموسيقى والتفاصيل ممكن تتخصص حسب المناسبة وطلبك.",
    modalOrder: "اكتشف 4U Celebrations ↗",
    modalFootnote: "حكايتك .. ذوقك .. لحظتك",
    settingsKicker: "تجربتك الخاصة",
    settingsTitle: "الإعدادات",
    languageSetting: "اللغة",
    themeSetting: "المظهر",
    themeDark: "الوضع الداكن",
    themeLight: "الوضع الفاتح",
    musicLabel: "الموسيقى",
    musicOn: "الموسيقى شغالة",
    musicOff: "الموسيقى متوقفة"
  }
};

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

/* Language: shares 4U's existing localStorage key */
function readSavedLanguage() {
  try {
    const saved = localStorage.getItem("4u-language");
    return saved === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem("4u-language", language);
  } catch (error) {
    console.warn("Could not save language preference:", error);
  }
}

function applyLanguage(language, save = true) {
  currentLanguage = language === "ar" ? "ar" : "en";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });

  languageBtn.textContent = currentLanguage === "en" ? "العربية" : "English";
  settingsLanguageBtn.textContent = languageBtn.textContent;

  document.title = currentLanguage === "ar"
    ? "المهمة اكتملت | 4U Celebrations"
    : "Mission Accomplished | 4U Celebrations";

  document.querySelector('meta[name="description"]').content =
    currentLanguage === "ar"
      ? "مفاجأة تخرج سينمائية من 4U Celebrations."
      : "A cinematic graduation surprise made with 4U Celebrations.";

  if (save) saveLanguage(currentLanguage);
}

function toggleLanguage() {
  applyLanguage(currentLanguage === "en" ? "ar" : "en");
}

languageBtn.addEventListener("click", toggleLanguage);
settingsLanguageBtn.addEventListener("click", toggleLanguage);

/* Stars */
function createStars() {
  if (!stars || stars.childElementCount) return;

  const count = window.innerWidth < 600 ? 32 : 60;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.opacity = `${0.2 + Math.random() * 0.5}`;
    stars.appendChild(star);
  }
}

/* Intro */
function runCountdown() {
  if (!countdownNumber) return;

  let count = 3;
  countdownNumber.textContent = count;

  countdownTimer = window.setInterval(() => {
    count--;

    if (count > 0) {
      countdownNumber.textContent = count;
      countdownNumber.classList.remove("pulse");
      void countdownNumber.offsetWidth;
      countdownNumber.classList.add("pulse");
    } else {
      window.clearInterval(countdownTimer);
      countdownNumber.textContent = "GO";
      countdownNumber.classList.add("pulse");
    }
  }, 1100);
}

function beginExperience() {
  if (missionStarted) return;

  missionStarted = true;
  window.clearInterval(countdownTimer);

  intro.classList.add("intro-exit");

  window.setTimeout(() => {
    intro.hidden = true;
    mainContent.hidden = false;

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 450);
}

startBtn.addEventListener("click", beginExperience);

/* Mission progress */
function completeMission() {
  if (!missionStarted || missionCompleted) return;

  missionCompleted = true;
  completeMissionBtn.disabled = true;
  completeMissionBtn.querySelector("[data-i18n]").textContent =
    currentLanguage === "ar" ? "المهمة شغالة..." : "MISSION IN PROGRESS";

  progressStatus.textContent = t("progressRunning");

  const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 100
    : 2600;

  const startTime = performance.now();

  function updateProgress(now) {
    const elapsed = now - startTime;
    const ratio = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);
    const percentage = Math.round(eased * 100);

    progressFill.style.width = `${percentage}%`;
    progressNumber.textContent = `${percentage}%`;
    progressTrack.setAttribute("aria-valuenow", String(percentage));

    if (ratio < 1) {
      progressTimer = window.requestAnimationFrame(updateProgress);
      return;
    }

    progressStatus.textContent = t("progressComplete");
    missionNote.textContent = t("missionDoneNote");
    completeMissionBtn.querySelector("[data-i18n]").textContent =
      currentLanguage === "ar" ? "المهمة اكتملت ✓" : "MISSION COMPLETE ✓";

    completeMissionBtn.classList.add("mission-finished");
    launchConfetti(65);

    document.querySelector("#revealSection").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  progressTimer = window.requestAnimationFrame(updateProgress);
}

completeMissionBtn.addEventListener("click", completeMission);

/* Gift opening */
function openGift() {
  if (!missionCompleted || giftOpened) return;

  giftOpened = true;
  giftButton.classList.add("opening");
  giftButton.setAttribute("aria-expanded", "true");
  giftButton.disabled = true;

  giftButton.querySelector(".gift-button-label").textContent = t("giftOpening");

  window.setTimeout(() => {
    giftButton.hidden = true;
    $(".gift-hint").hidden = true;
    finalMessage.hidden = false;
    giftButton.querySelector(".gift-button-label").textContent = t("giftOpened");

    launchConfetti(100);

    finalMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 950);
}

giftButton.addEventListener("click", openGift);

/* Confetti */
function launchConfetti(amount = 60) {
  if (!particleLayer) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < amount; i++) {
    const particle = document.createElement("span");
    particle.className = "celebration-particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 1.6}s`;
    particle.style.animationDuration = `${3.5 + Math.random() * 2.5}s`;
    particle.style.setProperty("--drift", `${Math.round(Math.random() * 150 - 75)}px`);
    fragment.appendChild(particle);
  }

  particleLayer.appendChild(fragment);

  window.setTimeout(() => {
    particleLayer.replaceChildren();
  }, 8500);
}

/* Modal helpers */
function openModal(modal) {
  if (!modal) return;

  previousFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}

function closeModal(modal) {
  if (!modal) return;

  modal.hidden = true;

  if (demoModal.hidden && settingsModal.hidden) {
    document.body.classList.remove("modal-open");
  }

  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

demoBtn.addEventListener("click", () => openModal(demoModal));
closeDemoModal.addEventListener("click", () => closeModal(demoModal));

settingsBtn.addEventListener("click", () => openModal(settingsModal));
closeSettingsModal.addEventListener("click", () => closeModal(settingsModal));

[demoModal, settingsModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!demoModal.hidden) closeModal(demoModal);
    if (!settingsModal.hidden) closeModal(settingsModal);
  }
});

/* Theme */
function applyTheme(light) {
  document.body.classList.toggle("light-mode", light);
  themeBtn.textContent = light ? t("themeDark") : t("themeLight");

  try {
    localStorage.setItem("4u-theme", light ? "light" : "dark");
  } catch (error) {
    console.warn("Could not save theme preference:", error);
  }
}

themeBtn.addEventListener("click", () => {
  applyTheme(!document.body.classList.contains("light-mode"));
});

try {
  applyTheme(localStorage.getItem("4u-theme") === "light");
} catch {
  applyTheme(false);
}

/* Music */
async function tryPlayMusic() {
  if (!graduationMusic) return false;

  graduationMusic.volume = 0.65;

  try {
    await graduationMusic.play();
    musicControl.hidden = false;
    musicControl.classList.add("playing");
    musicToggle.setAttribute("aria-label", "Pause music");
    return true;
  } catch (error) {
    console.warn("Music could not start:", error);
    musicControl.hidden = false;
    musicControl.classList.remove("playing");
    return false;
  }
}

musicToggle.addEventListener("click", async () => {
  if (graduationMusic.paused) {
    const started = await tryPlayMusic();

    if (!started) {
      musicToggle.title = currentLanguage === "ar"
        ? "تأكد من رفع ملف graduation.mp3"
        : "Check that graduation.mp3 is uploaded";
    }
  } else {
    graduationMusic.pause();
    musicControl.classList.remove("playing");
  }
});

/*
  Music starts only after a user action.
  This avoids autoplay restrictions in mobile browsers.
*/
startBtn.addEventListener("click", () => {
  tryPlayMusic();
}, { once: true });

graduationMusic.addEventListener("error", () => {
  console.warn("Could not load graduation.mp3. Check the filename and upload.");
});

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

/* Initialize */
createStars();
applyLanguage(readSavedLanguage(), false);
runCountdown();
