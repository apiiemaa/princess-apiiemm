/* ==========================================================
   Pink Princess | script.js (Vanilla JS, tanpa library)
   ========================================================== */

// ---- PENGATURAN: ubah bagian ini ----
const CONFIG = {
  email: "emailkamu@example.com", // tujuan pesan dari formulir kontak
  namaKamu: "apiiem",
  ulangTahun: { bulan: 1, tanggal: 31 }, // hanya bulan dan tanggal, tanpa tahun
};
// -------------------------------------

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SPARKLE_COLORS = ["#E85D9F", "#F58FBD", "#D9A441", "#B982E0", "#FFB3D1"];
const SPARKLE_SHAPES = ["✦", "✧", "♥", "✦"];

/* ---------- Tahun di footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");

function setMenu(open) {
  menu.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

/* ---------- Mode malam / terang ---------- */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("span[aria-hidden]");
const themeLabel = themeToggle.querySelector(".theme-label");

function applyTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeIcon.textContent = dark ? "☀️" : "🌙";
  themeLabel.textContent = dark ? "Mode terang" : "Mode malam";
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("theme") || "light";
} catch (e) {
  /* localStorage bisa diblokir; abaikan saja */
}
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    /* abaikan */
  }
});

/* ---------- Kilau ---------- */
function spawnSparkle(x, y, { size = 18, distance = 70, duration = 900 } = {}) {
  if (prefersReducedMotion) return;
  const el = document.createElement("span");
  el.className = "sparkle";
  el.textContent = SPARKLE_SHAPES[Math.floor(Math.random() * SPARKLE_SHAPES.length)];
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.fontSize = size * (0.7 + Math.random() * 0.8) + "px";
  el.style.color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
  document.body.appendChild(el);

  const angle = Math.random() * Math.PI * 2;
  const dist = distance * (0.5 + Math.random() * 0.7);
  const dx = Math.cos(angle) * dist;
  const dy = Math.sin(angle) * dist;

  const anim = el.animate(
    [
      { transform: "translate(-50%, -50%) scale(0.3) rotate(0deg)", opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(180deg)`, opacity: 0 },
    ],
    { duration, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
  );
  anim.onfinish = () => el.remove();
}

function burst(x, y, count = 16) {
  for (let i = 0; i < count; i++) {
    spawnSparkle(x, y, { size: 24, distance: 130, duration: 1000 });
  }
}

/* Jejak kilau mengikuti kursor (hanya untuk mouse) */
if (!prefersReducedMotion) {
  let lastTrail = 0;
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const now = performance.now();
    if (now - lastTrail < 70) return;
    lastTrail = now;
    spawnSparkle(e.clientX, e.clientY, { size: 12, distance: 28, duration: 700 });
  });
}

/* ---------- Mahkota ---------- */
const crownBtn = document.getElementById("crownBtn");
const crownHint = document.getElementById("crownHint");
const titah = [
  "Titah kerajaan: tidur siang itu wajib ♥",
  "Hari ini kamu berhak bangga pada dirimu sendiri.",
  "Ratu juga butuh istirahat. Rebahan sebentar yuk.",
  "Pink dan cream, kombinasi paling kerajaan.",
  `Yang Mulia ${CONFIG.namaKamu} menyambutmu dengan hangat.`,
  "Terima kasih sudah mampir ke istanaku ✦",
];
let titahIndex = 0;

crownBtn.addEventListener("click", (e) => {
  const rect = crownBtn.getBoundingClientRect();
  // Klik lewat keyboard punya koordinat 0, jadi pakai titik tengah mahkota
  const x = e.clientX || rect.left + rect.width / 2;
  const y = e.clientY || rect.top + rect.height / 2;
  burst(x, y);
  crownHint.textContent = titah[titahIndex];
  titahIndex = (titahIndex + 1) % titah.length;
});

/* ---------- Hitung mundur ulang tahun ---------- */
(function birthdayCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;
  const { bulan, tanggal } = CONFIG.ulangTahun;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(now.getFullYear(), bulan - 1, tanggal);
  if (next < today) next = new Date(now.getFullYear() + 1, bulan - 1, tanggal);
  const days = Math.round((next - today) / 86400000);
  el.textContent =
    days === 0 ? "🎂 Hari ini ulang tahunku!" : `🎂 ${days} hari lagi menuju ulang tahunku`;
})();

/* ---------- Bar favorit muncul saat terlihat ---------- */
const meters = document.querySelectorAll(".meters li");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  meters.forEach((m) => observer.observe(m));
} else {
  meters.forEach((m) => m.classList.add("in-view"));
}

/* ---------- Formulir kontak (membuka aplikasi email) ---------- */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  statusEl.className = "form-status";

  const fields = [form.nama, form.email, form.pesan];
  let firstInvalid = null;
  fields.forEach((field) => {
    const bad = !field.value.trim() || !field.checkValidity();
    field.classList.toggle("invalid", bad);
    if (bad && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    statusEl.textContent = "Lengkapi semua kolom dengan benar dulu ya.";
    statusEl.classList.add("error");
    firstInvalid.focus();
    return;
  }

  const subject = `Pesan dari ${form.nama.value.trim()}`;
  const body = `${form.pesan.value.trim()}\n\nSalam,\n${form.nama.value.trim()}\n${form.email.value.trim()}`;
  window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  statusEl.textContent = "Aplikasi emailmu akan terbuka. Tekan kirim di sana untuk mengirim pesan.";
  statusEl.classList.add("ok");
  form.reset();
});

form.addEventListener("input", (e) => e.target.classList.remove("invalid"));
