class Particle {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.vel = { x: 0, y: 0 };
        this.acc = { x: 0, y: 0 };
        this.target = { x: 0, y: 0 };

        this.closeEnoughTarget = 100;
        this.maxSpeed = 4.0;
        this.maxForce = 0.1;
        this.particleSize = 4;
        this.isKilled = false;

        this.startColor = { r: 74, g: 222, b: 128 }; // Start Green #4ADE80
        this.targetColor = { r: 134, g: 239, b: 172 }; // End Green #86EFAC
        this.colorWeight = 0;
        this.colorBlendRate = 0.05;
    }

    move() {
        let proximityMult = 1;
        const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2));

        if (distance < this.closeEnoughTarget) {
            proximityMult = distance / this.closeEnoughTarget;
        }

        const towardsTarget = {
            x: this.target.x - this.pos.x,
            y: this.target.y - this.pos.y,
        };

        const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y);
        if (magnitude > 0) {
            towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult;
            towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult;
        }

        const steer = {
            x: towardsTarget.x - this.vel.x,
            y: towardsTarget.y - this.vel.y,
        };

        const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
        if (steerMagnitude > 0) {
            steer.x = (steer.x / steerMagnitude) * this.maxForce;
            steer.y = (steer.y / steerMagnitude) * this.maxForce;
        }

        this.acc.x += steer.x;
        this.acc.y += steer.y;

        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.acc.x = 0;
        this.acc.y = 0;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(74, 222, 128, 0.8)`; // Main DIYA Green
        ctx.fillRect(this.pos.x, this.pos.y, this.particleSize, this.particleSize);
    }
}

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let wordIndex = 0;
const words = ["SIMBLI's", "DIYA"];
const pixelSteps = 5; // Density

function init() {
    canvas.width = window.innerWidth;
    canvas.height = 400; // Fixed height for hero text area
    nextWord(words[0]);
    animate();

    // Switch to DIYA after 3 seconds
    setTimeout(() => {
        wordIndex = 1;
        nextWord(words[1]);
    }, 3000);
}

function nextWord(word) {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const offCtx = offscreenCanvas.getContext("2d");

    // Adjusted font size to fit longer word "SIMBLI's"
    offCtx.font = "800 10rem 'Inter', sans-serif";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillStyle = "white";
    offCtx.fillText(word, canvas.width / 2, canvas.height / 2);

    const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let particleIndex = 0;

    // Create particles from text pixels
    for (let i = 0; i < pixels.length; i += 4 * pixelSteps) {
        // Skip some pixels for performance and grid effect
        if ((i / 4) % pixelSteps !== 0) continue;

        if (pixels[i + 3] > 128) { // If pixel is visible
            const x = (i / 4) % canvas.width;
            const y = Math.floor((i / 4) / canvas.width);

            if (particleIndex < particles.length) {
                particles[particleIndex].target = { x, y };
            } else {
                const p = new Particle();
                p.pos = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
                p.target = { x, y };
                particles.push(p);
            }
            particleIndex++;
        }
    }

    // Kill extra particles
    particles.splice(particleIndex);
}

function animate() {
    // Clear with transparency for trails
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.move();
        p.draw(ctx);
    });

    requestAnimationFrame(animate);
}

// Resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    nextWord(words[wordIndex]);
});

init();
