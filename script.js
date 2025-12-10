/* ===== Canvas particle system ===== */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const particles = [];
const COUNT = 160;

for (let i = 0; i < COUNT; i++) particles.push(makeParticle());

function makeParticle() {
  return {
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    size: Math.random() * 3 + 1,
    hue: Math.random() * 360
  };
}

const mouse = { x: innerWidth / 2, y: innerHeight / 2, down: false };

addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

addEventListener("mousedown", e => {
  mouse.down = true;
  burst(e.clientX, e.clientY, 100);
});

addEventListener("mouseup", () => (mouse.down = false));

function burst(x, y, count) {
  for (let i = 0; i < count; i++) {
    const p = makeParticle();
    p.x = x;
    p.y = y;
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * 6 + 2;
    p.vx = Math.cos(a) * s;
    p.vy = Math.sin(a) * s;
    particles.push(p);
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    // movement
    p.x += p.vx;
    p.y += p.vy;

    // edges
    if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

    // draw
    ctx.fillStyle = `hsla(${p.hue},80%,60%,0.7)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(loop);
}
loop();

/* ===== Buttons ===== */

document.getElementById("wowBtn").onclick = () => {
  burst(innerWidth / 2, innerHeight / 2, 200);
};

document.getElementById("boomBtn").onclick = () => {
  burst(Math.random() * innerWidth, Math.random() * innerHeight, 150);
};

/* ===== Card pop ===== */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const r = card.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 80);
  });
});
