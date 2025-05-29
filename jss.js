// Typewriter Effect
const text = "Hi, Omar here..";
const element = document.getElementById("typewriter");
const cursor = element.querySelector(".cursor");
let i = 0;
let typingSpeed = 150;

function typeWriter() {
  if (i < text.length) {
    cursor.insertAdjacentText("beforebegin", text.charAt(i));
    i++;
    setTimeout(typeWriter, typingSpeed);
    
    if (text.charAt(i-1) === ",") {
      setTimeout(typeWriter, typingSpeed * 3);
    }
  }
}

// Tree Animation (p5.js)
let angle = 20;

function setup() {
  let canvas = createCanvas(300, 200);
  canvas.parent("tree-container");
}

function draw() {
  clear();
  background(0, 0, 0, 0);
  stroke("#20c997");

  angle = 20 + 10 * sin(frameCount * 0.01);

  translate(width / 2, height);
  branch(50);
}

function branch(len) {
  strokeWeight(map(len, 10, 50, 1, 3));
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 5) {
    push();
    rotate(radians(angle));
    branch(len * 0.7);
    pop();

    push();
    rotate(radians(-angle));
    branch(len * 0.7);
    pop();
  }
}

function windowResized() {
  resizeCanvas(300, 200);
}

// Wind Effect
let windParticles = [];
const windCanvas = function(p) {
  p.setup = function() {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("wind-container");
    for (let i = 0; i < 50; i++) {
      windParticles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(1, 3),
        speed: p.random(0.5, 2),
        opacity: p.random(50, 150)
      });
    }
  };

  p.draw = function() {
    p.clear();
    p.noStroke();
    
    let windStrength = p.sin(p.frameCount * 0.01) * 0.5;
    
    for (let i = 0; i < windParticles.length; i++) {
      let particle = windParticles[i];
      
      particle.x += particle.speed + windStrength;
      particle.y += p.sin(p.frameCount * 0.05 + i) * 0.3;
      
      if (particle.x > p.width + 10) {
        particle.x = -10;
        particle.y = p.random(p.height);
      }
      if (particle.y > p.height) {
        particle.y = 0;
      }
      
      p.fill(255, 255, 255, particle.opacity);
      p.ellipse(particle.x, particle.y, particle.size);
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

// Initialize everything when window loads
window.onload = function() {
  // Start typewriter effect
  setTimeout(typeWriter, 500);
  
  // Initialize wind effect
  new p5(windCanvas);
  
  // Initialize current year in footer
  document.querySelector('.footer-title small script').innerHTML = `document.write(new Date().getFullYear())`;
};
