const canvas = document.getElementById("canvas1");

// Returns a canvas 2d drawing API object
const ctx = canvas.getContext("2d");
const particles = [];
let hue = 0;

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
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (event) {
  const { x, y } = event;
  mouse.x = x;
  mouse.y = y;

  for (let i = 0; i < 3; i++) {
    particles.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (event) {
  const { x, y } = event;
  mouse.x = x;
  mouse.y = y;
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle());
  }
});

canvas.addEventListener("mouseleave", function (event) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mouse.x = undefined;
  mouse.y = undefined;
});

class Particle {
  constructor() {
    (this.x = mouse.x),
      (this.y = mouse.y),
      // (this.x = Math.random() * canvas.width),
      //   (this.y = Math.random() * canvas.height),
      (this.size = Math.random() * 10 + 1),
      (this.moveX = Math.random() * 3 - 1.5);
    this.moveY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.moveX;
    this.y += this.moveY;
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particles[i].color;
        ctx.lineWidth = 0.2
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
    if (particles[i].size <= 0.3) {
      particles.splice(i, 1); // remove the particle if size is less than 0.3
      i--; // shrink the size of array i.e loop
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.fillStyle = 'rgba(0,0,0,0.05)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue++;
  requestAnimationFrame(animate);
}

animate();
