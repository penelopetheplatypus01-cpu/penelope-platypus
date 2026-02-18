/* ===============================
   SECRET VAULT (EASTER EGG)
================================ */
function unlockVault() {
  const vault = document.getElementById("secret");
  if (!vault) return;

  vault.style.display = "block";
  vault.scrollIntoView({ behavior: "smooth" });
}

/* ===============================
   BACKGROUND MUSIC TOGGLE
================================ */
(() => {
  const music = document.getElementById("bg-music");
  const toggle = document.querySelector(".music-toggle");

  if (!music || !toggle) return;

  music.volume = 0.35;

  toggle.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {});
      toggle.classList.add("playing");
    } else {
      music.pause();
      toggle.classList.remove("playing");
    }
  });
})();

/* ===============================
   COPY CONTRACT ADDRESS
================================ */
(() => {
  const pnlope = document.getElementById("copy-pnlope");
  if (!pnlope) return;

  const copied = document.createElement("span");
  copied.textContent = " Copied!";
  copied.style.cssText = `
    font-size: 0.85rem;
    font-weight: bold;
    color: #22c55e;
    margin-left: 6px;
    display: none;
  `;
  pnlope.after(copied);

  pnlope.addEventListener("click", () => {
    navigator.clipboard.writeText("Sol11111111111").then(() => {
      copied.style.display = "inline";
      setTimeout(() => {
        copied.style.display = "none";
      }, 1200);
    }).catch(() => {});
  });
})();

/* ===============================
   FLOATING BUY BUTTON (DRAGGABLE)
================================ */
(() => {
  const btn = document.querySelector(".floating-buy");
  if (!btn) return;

  let dragging = false;
  let moved = false;
  let startX = 0, startY = 0;
  let offsetX = 0, offsetY = 0;

  // Initialize position
  const rect = btn.getBoundingClientRect();
  btn.style.left = rect.left + "px";
  btn.style.top = rect.top + "px";
  btn.style.right = "auto";
  btn.style.bottom = "auto";
  btn.style.position = "fixed";

  const start = (x, y) => {
    dragging = true;
    moved = false;
    startX = x;
    startY = y;

    const r = btn.getBoundingClientRect();
    offsetX = x - r.left;
    offsetY = y - r.top;

    btn.style.transition = "none";
    btn.style.transform = "scale(1.08)";
    btn.classList.add("dragging");
  };

  const move = (x, y) => {
    if (!dragging) return;

    if (Math.abs(x - startX) > 5 || Math.abs(y - startY) > 5) {
      moved = true;
    }

    if (!moved) return;

    btn.style.left = `${x - offsetX}px`;
    btn.style.top = `${y - offsetY}px`;
  };

  const end = () => {
    dragging = false;
    btn.style.transition = "transform 0.15s ease";
    btn.style.transform = "scale(1)";
    btn.classList.remove("dragging");
  };

  /* Desktop */
  btn.addEventListener("mousedown", e => {
    e.preventDefault();
    start(e.clientX, e.clientY);

    const mouseMove = e => move(e.clientX, e.clientY);
    const mouseUp = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      end();
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  });

  /* Mobile */
  btn.addEventListener("touchstart", e => {
    const t = e.touches[0];
    start(t.clientX, t.clientY);
  }, { passive: true });

  btn.addEventListener("touchmove", e => {
    const t = e.touches[0];
    move(t.clientX, t.clientY);
  }, { passive: true });

  btn.addEventListener("touchend", end);

  /* Prevent click if dragged */
  btn.addEventListener("click", e => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
})();
