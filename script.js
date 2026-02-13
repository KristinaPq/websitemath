// Анимация линий
const canvas = document.getElementById('canvas-lines');
const ctx = canvas.getContext('2d');
let particles = [];

window.onresize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
window.onresize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI*2);
        ctx.fillStyle = '#3498db'; ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 80; i++) particles.push(new Particle());
    loop();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update(); p.draw();
        particles.forEach(p2 => {
            let d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 120) {
                ctx.strokeStyle = `rgba(52, 152, 219, ${1 - d/120})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            }
        });
    });
    requestAnimationFrame(loop);
}
init();

// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav-links');
burger.onclick = () => nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
