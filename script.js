const canvas = document.getElementById("canvas1");

// Returns a canvas 2d drawing API object
const ctx = canvas.getContext("2d");
const particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function drawCircle(x, y, radius = 10) {
  if (!x) {
    x = mouse.x;
  }
  if (!y) {
    y = mouse.y;
  }
  ctx.fillStyle = "Blue";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

const mouse = {
  x: undefined,
  y: undefined,
};

// canvas.addEventListener("click", function (event) {
//   const { x, y } = event;
//   mouse.x = x;
//   mouse.y = y;
// });

canvas.addEventListener("mousemove", function (event) {
  const { x, y } = event;
  mouse.x = x;
  mouse.y = y;
});

canvas.addEventListener("mouseleave", function (event) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mouse.x = undefined;
  mouse.y = undefined;
});

class Particle {
  constructor() {
    (this.x = Math.random() * canvas.width),
      (this.y = Math.random() * canvas.height),
      (this.size = Math.random() * 5 + 2),
      (this.moveX = Math.random() * 3 - 1.5);
    this.moveY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x = this.x + this.moveX;
    this.y = this.y + this.moveY;
  }

  draw() {
    ctx.fillStyle = "Blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

init() 

function handleParticles() {
  for (let i = 0; i < 100; i++) {
    particles[i].update();
    particles[i].draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   drawCircle();
  handleParticles();
  requestAnimationFrame(animate);
}

animate();
