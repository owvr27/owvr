let angle = 20;

function setup() {
    let canvas = createCanvas(300, 200);
    canvas.parent("tree-container");
}

function draw() {
    clear();
    background(0, 0, 0, 0);
    stroke("#20c997");

    // Slower sway animation
    angle = 20 + 10 * sin(frameCount * 0.01); // Lower value for a slower effect

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
