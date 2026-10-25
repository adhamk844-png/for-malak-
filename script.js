
"use strict";

// ========================================
// FOR MALAK ❤️
// Romantic heart animation and music
// ========================================

const openButton = document.getElementById("open-surprise");
const surprise = document.getElementById("surprise");
const heart = document.getElementById("heart");
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const musicStatus = document.getElementById("music-status");
const particles = document.getElementById("particles");

// 75 expressions of love in different languages
const lovePhrases = [
  ["English", "I love you"],
  ["Arabic", "أحبك"],
  ["French", "Je t’aime"],
  ["Spanish", "Te amo"],
  ["Italian", "Ti amo"],
  ["German", "Ich liebe dich"],
  ["Portuguese", "Eu te amo"],
  ["Dutch", "Ik hou van jou"],
  ["Swedish", "Jag älskar dig"],
  ["Norwegian", "Jeg elsker deg"],
  ["Danish", "Jeg elsker dig"],
  ["Finnish", "Rakastan sinua"],
  ["Icelandic", "Ég elska þig"],
  ["Greek", "Σ’ αγαπώ"],
  ["Turkish", "Seni seviyorum"],
  ["Persian", "دوستت دارم"],
  ["Urdu", "میں تم سے محبت کرتا ہوں"],
  ["Hindi", "मैं तुमसे प्यार करता हूँ"],
  ["Bengali", "আমি তোমাকে ভালোবাসি"],
  ["Chinese", "我爱你"],
  ["Japanese", "愛してる"],
  ["Korean", "사랑해"],
  ["Thai", "ฉันรักคุณ"],
  ["Vietnamese", "Anh yêu em"],
  ["Indonesian", "Aku cinta kamu"],
  ["Malay", "Saya cinta padamu"],
  ["Filipino", "Mahal kita"],
  ["Swahili", "Nakupenda"],
  ["Zulu", "Ngiyakuthanda"],
  ["Afrikaans", "Ek is lief vir jou"],
  ["Russian", "Я тебя люблю"],
  ["Ukrainian", "Я тебе кохаю"],
  ["Polish", "Kocham cię"],
  ["Czech", "Miluji tě"],
  ["Slovak", "Ľúbim ťa"],
  ["Hungarian", "Szeretlek"],
  ["Romanian", "Te iubesc"],
  ["Bulgarian", "Обичам те"],
  ["Serbian", "Волим те"],
  ["Croatian", "Volim te"],
  ["Slovenian", "Ljubim te"],
  ["Albanian", "Të dua"],
  ["Armenian", "Ես քեզ սիրում եմ"],
  ["Georgian", "მიყვარხარ"],
  ["Hebrew", "אני אוהב אותך"],
  ["Kurdish", "Ez ji te hez dikim"],
  ["Pashto", "زه تا سره مینه لرم"],
  ["Nepali", "म तिमीलाई माया गर्छु"],
  ["Tamil", "நான் உன்னை காதலிக்கிறேன்"],
  ["Telugu", "నేను నిన్ను ప్రేమిస్తున్నాను"],
  ["Marathi", "माझं तुझ्यावर प्रेम आहे"],
  ["Gujarati", "હું તને પ્રેમ કરું છું"],
  ["Punjabi", "ਮੈਂ ਤੈਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ"],
  ["Kannada", "ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ"],
  ["Malayalam", "ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു"],
  ["Burmese", "မင်းကိုချစ်တယ်"],
  ["Khmer", "ខ្ញុំស្រឡាញ់អ្នក"],
  ["Lao", "ຂ້ອຍຮັກເຈົ້າ"],
  ["Mongolian", "Би чамд хайртай"],
  ["Kazakh", "Мен сені сүйемін"],
  ["Uzbek", "Men seni sevaman"],
  ["Azerbaijani", "Mən səni sevirəm"],
  ["Irish", "Tá grá agam duit"],
  ["Welsh", "Rwy'n dy garu di"],
  ["Scottish Gaelic", "Tha gaol agam ort"],
  ["Basque", "Maite zaitut"],
  ["Catalan", "T'estimo"],
  ["Galician", "Quérote"],
  ["Latin", "Te amo"],
  ["Esperanto", "Mi amas vin"],
  ["Hawaiian", "Aloha au iā ʻoe"],
  ["Maori", "Aroha ahau ki a koe"],
  ["Samoan", "Ou te alofa ia te oe"],
  ["Yoruba", "Mo nifẹ rẹ"],
  ["Igbo", "A hụrụ m gị n'anya"],
  ["Amharic", "እወድሃለሁ"],
  ["Somali", "Waan ku jeclahay"],
  ["Malagasy", "Tiako ianao"]
];

let surpriseOpened = false;

// ========================================
// HEART SHAPE
// Generate a heart-shaped grid with
// enough unique positions for 75 phrases.
// ========================================

function createHeartPositions() {
  const positions = [];
  const columns = 25;
  const rows = 21;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = (col - 12) / 11;
      const y = (10 - row) / 9;

      const shape =
        Math.pow(x * x + y * y - 1, 3) -
        x * x * Math.pow(y, 3);

      if (shape <= 0) {
        positions.push({
          x: (col + 0.5) / columns * 100,
          y: (row + 0.5) / rows * 100,
          row,
          col
        });
      }
    }
  }

  // Spread the phrases across the entire heart.
  const selected = [];

  for (let i = 0; i < lovePhrases.length; i++) {
    const index = Math.round(
      i * (positions.length - 1) /
      (lovePhrases.length - 1)
    );

    selected.push(positions[index]);
  }

  return selected;
}

// ========================================
// BUILD THE HEART ANIMATION
// ========================================

function buildHeart() {
  heart.replaceChildren();

  const positions = createHeartPositions();
  const fragment = document.createDocumentFragment();

  lovePhrases.forEach(([language, phrase], index) => {
    const position = positions[index];
    const word = document.createElement("span");

    word.className = "love-word";
    word.textContent = phrase;
    word.title = `${language}: ${phrase}`;
    word.setAttribute(
      "aria-label",
      `${language}: ${phrase}`
    );

    word.style.left = `${position.x}%`;
    word.style.top = `${position.y}%`;

    // Each phrase flies into position in sequence.
    word.style.animationDelay = `${index * 0.09}s`;

    fragment.appendChild(word);
  });

  heart.appendChild(fragment);
}

// ========================================
// FLOATING BACKGROUND PARTICLES
// ========================================

function createParticles() {
  if (!particles || particles.children.length > 0) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 32; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration =
      `${8 + Math.random() * 12}s`;
    particle.style.animationDelay =
      `${Math.random() * 12}s`;

    const size = 2 + Math.random() * 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    fragment.appendChild(particle);
  }

  particles.appendChild(fragment);
}

// ========================================
// MUSIC CONTROLS
// ========================================

function updateMusicButton(isPlaying) {
  if (!musicToggle || !musicStatus) return;

  musicToggle.classList.toggle("playing", isPlaying);
  musicStatus.textContent = isPlaying
    ? "Music on"
    : "Music off";
}

async function playMusic() {
  if (!music) return false;

  try {
    await music.play();
    updateMusicButton(true);
    return true;
  } catch (error) {
    updateMusicButton(false);

    if (musicStatus) {
      musicStatus.textContent = "Music unavailable";
    }

    console.warn(
      "Music could not play. Check that music.mp3 exists.",
      error
    );

    return false;
  }
}

if (musicToggle && music) {
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      await playMusic();
    } else {
      music.pause();
      updateMusicButton(false);
    }
  });

  music.addEventListener("play", () => {
    updateMusicButton(true);
  });

  music.addEventListener("pause", () => {
    updateMusicButton(false);
  });

  music.addEventListener("error", () => {
    updateMusicButton(false);

    if (musicStatus) {
      musicStatus.textContent = "Add music.mp3";
    }
  });
}

// ========================================
// OPEN THE SURPRISE
// ========================================

if (openButton && surprise && heart) {
  openButton.addEventListener("click", async () => {
    if (surpriseOpened) return;

    surpriseOpened = true;
    openButton.disabled = true;
    openButton.textContent = "Your surprise is opening ♥";

    // Reveal the experience.
    surprise.classList.remove("hidden");

    // Build the heart from scratch.
    buildHeart();

    // Smoothly move the visitor to the heart.
    window.setTimeout(() => {
      surprise.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);

    // Start music after this user interaction.
    await playMusic();

    openButton.textContent = "Made for Malak ♥";
  });
}

// ========================================
// INITIALIZE
// ========================================

createParticles();
