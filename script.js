/* ==========================
   THE LAVENDER JOURNAL
   Premium Portfolio Script
========================== */

/* Typing Effect */

const typingElement = document.getElementById("typing");

const typingText =
"Software Engineering Learner • Building meaningful things one step at a time.";

let typingIndex = 0;

function typeWriter() {

  if (!typingElement) return;

  if (typingIndex < typingText.length) {

    typingElement.textContent += typingText.charAt(typingIndex);

    typingIndex++;

    setTimeout(typeWriter, 45);

  }

}

window.addEventListener("load", typeWriter);

/* Scroll Reveal */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

    }

  });

}, {
  threshold: 0.15
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

/* Active Navigation */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;

    if (window.pageYOffset >= sectionTop) {

      current = section.getAttribute("id");

    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {

      link.classList.add("active");

    }

  });

});

/* Back To Top */

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";
backToTop.id = "backToTop";

document.body.appendChild(backToTop);

Object.assign(backToTop.style, {
  position: "fixed",
  bottom: "25px",
  right: "25px",
  width: "50px",
  height: "50px",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "20px",
  display: "none",
  zIndex: "999",
  background: "#C97B63",
  color: "#fff",
  boxShadow: "0 10px 20px rgba(0,0,0,.15)"
});

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    backToTop.style.display = "block";

  } else {

    backToTop.style.display = "none";

  }

});

backToTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

/* Dark Mode */

const darkToggle = document.createElement("button");

darkToggle.innerHTML = "🌙";
darkToggle.id = "darkToggle";

document.body.appendChild(darkToggle);

Object.assign(darkToggle.style, {
  position: "fixed",
  bottom: "90px",
  right: "25px",
  width: "50px",
  height: "50px",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "18px",
  zIndex: "999",
  background: "#DCCAF4",
  boxShadow: "0 10px 20px rgba(0,0,0,.15)"
});

if (localStorage.getItem("theme") === "dark") {

  document.body.classList.add("dark");
  darkToggle.innerHTML = "☀️";

}

darkToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  const isDark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "theme",
    isDark ? "dark" : "light"
  );

  darkToggle.innerHTML =
    isDark ? "☀️" : "🌙";

});

/* Floating Flowers */

const flowers = ["🌸", "🌼", "✿", "🌷"];

function createFlower() {

  const flower = document.createElement("div");

  flower.textContent =
    flowers[Math.floor(Math.random() * flowers.length)];

  flower.style.position = "fixed";
  flower.style.left = Math.random() * 100 + "vw";
  flower.style.top = "-50px";
  flower.style.fontSize =
    (16 + Math.random() * 20) + "px";

  flower.style.pointerEvents = "none";
  flower.style.opacity = ".55";
  flower.style.zIndex = "1";

  document.body.appendChild(flower);

  const duration =
    10000 + Math.random() * 10000;

  flower.animate([
    {
      transform:
      "translateY(-50px) rotate(0deg)"
    },
    {
      transform:
      "translateY(110vh) rotate(360deg)"
    }
  ], {
    duration,
    iterations: 1
  });

  setTimeout(() => {
    flower.remove();
  }, duration);

}

setInterval(createFlower, 2500);

/* Mouse Glow */

const glow = document.createElement("div");

document.body.appendChild(glow);

Object.assign(glow.style, {
  position: "fixed",
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  pointerEvents: "none",
  background:
    "radial-gradient(circle, rgba(220,202,244,.35), transparent 70%)",
  transform: "translate(-50%,-50%)",
  zIndex: "0"
});

document.addEventListener("mousemove", (e) => {

  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";

});

/* Project Card Tilt */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY =
      (x / rect.width - 0.5) * 10;

    const rotateX =
      (0.5 - y / rect.height) * 10;

    card.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";

  });

});

/* Footer Year */

const footer = document.querySelector("footer");

if (footer) {

  footer.innerHTML =
    `Made with 🤍 by Ira • ${new Date().getFullYear()}`;

}

/* ==========================
   BACKGROUND MUSIC
========================== */

const music = document.getElementById("bgMusic");
const volumeControl = document.getElementById("volumeControl");
const volumeSlider = document.getElementById("volumeSlider");

if (music && volumeSlider) {

  let targetVolume = 0.5;

  music.volume = 0;

  volumeSlider.value = targetVolume;

  volumeSlider.addEventListener("input", () => {

    targetVolume = parseFloat(volumeSlider.value);

    music.volume = targetVolume;

  });

  function fadeInMusic() {

    music.volume = 0;

    music.play();

    let volume = 0;

    const fade = setInterval(() => {

      if (volume < targetVolume) {

        volume += targetVolume / 30;

        music.volume = Math.min(volume, targetVolume);

      } else {

        clearInterval(fade);

      }

    }, 100);

  }

  function fadeOutMusic() {

    let volume = music.volume;

    const fade = setInterval(() => {

      if (volume > 0.01) {

        volume -= targetVolume / 30;

        music.volume = Math.max(volume, 0);

      } else {

        clearInterval(fade);

        music.pause();

      }

    }, 100);

  }

  document.addEventListener("click", () => {

    if (music.paused) {

      fadeInMusic();

      volumeControl.classList.add("show");

      setTimeout(() => {

        volumeControl.classList.remove("show");

      }, 7000);

    }

  }, { once: true });

  document.addEventListener("keydown", (e) => {

    if (e.key.toLowerCase() === "m") {

      if (!music.paused) {

        fadeOutMusic();

      }

    }

  });

}
