let font;
const vehicles = []
let oldText = ""
let points = [];

function getTime() {
    const h = hour() < 10 ? `0${hour()}` : hour();
    const m = minute() < 10 ? `0${minute()}` : minute();
    const s = second() < 10 ? `0${second()}` : second();
    return `${h} : ${m} : ${s}`
}

function preload() {
    font = loadFont('Roboto-Medium.ttf');
    oldText = getTime()
}

function updatePoint() {
    textSize(128)
    points = font.textToPoints(oldText, (windowWidth / 2) - textWidth(oldText) / 2, windowHeight / 2)
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);

    updatePoint()

    for(let pt of points) {
        const vehicle = new Vehicle()
        vehicles.push(vehicle);
    }
    
}

function draw() {
    background(51);

    const text = getTime()

    if(text !== oldText) {
        oldText = text
        updatePoint()
    }    
    
    vehicles.forEach((v, i) => {
        let index = floor(map(i, 0, vehicles.length, 0, points.length));
        let textPoint = points[index % points.length];

        v.target = createVector(textPoint.x, textPoint.y);
        v.behaviours();
        v.update();
        v.show()
    })
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}