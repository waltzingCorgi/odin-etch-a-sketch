// Declare and intialize variables
let sideLength;
let mode = "Black";
const button = document.querySelector("button");
const container = document.querySelector(".wrapper");
button.hidden = true;   // Using "r" to reset

// Create grid
createGrid(16);

// Event listeners
button.addEventListener("click", resetGrid);

window.addEventListener("keydown", (e) => {
    const key = e.key;
    
    switch (key) {
        case "b": 
            mode = "Black";
            break;
        case "g":
            mode = "Greyscale";
            break;
        case "c":
            mode = "Color";
            break;
        case "r":
            resetGrid();
            break;
        case "n":
            newGrid();
    }
})

// Grid functions
function newGrid() {
  destroyGrid(container);

  // Get and validate side length
  sideLength = prompt("Grid length: ", 16);
  sideLength = parseInt(sideLength);
  if (!isValidSideLength(sideLength)) return;
  
  createGrid(sideLength);
}

function resetGrid() {
    destroyGrid(container);
    createGrid(sideLength);
}

function createGrid(sideLength) {
    // Create grid columns and rows
    container.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${sideLength}, 1fr)`;

    // Add boxes
    for (let i = 0; i < Math.pow(sideLength, 2); i++) {
        const div = document.createElement("div");
        div.classList.add("box");
    
        div.addEventListener("mouseenter", () => {
            div.style.backgroundColor = getColor(div);
        });
    
        container.appendChild(div);
    }
}

function destroyGrid(parentElement) {
    while (parentElement.firstElementChild) {
        parentElement.removeChild(parentElement.firstElementChild);
    }
}

function isValidSideLength(sideLength) {
    if (isNaN(sideLength)) return 0;
    if (sideLength < 1) return 0;
    if (sideLength > 64) return 0;
    return 1;
}

// Color functions
function getColor(box) {
    if (mode === "Color") {
        box.classList.remove("grey");
        return getRandomColor();
    } 
    else if (mode === "Greyscale") return getGreyColor(box);
    else {
        box.classList.remove("grey");
        return black();
    }
}

function getRandomColor() {
    const red = getRandomColorValue();
    const green = getRandomColorValue();
    const blue = getRandomColorValue();
    const opacity = getRandomOpacity();
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function getRandomColorValue() {
    return Math.floor(Math.random() * 255);
}

function getRandomOpacity() {
    return Math.floor(Math.random() * 101) / 100;
}

function getGreyColor(box) {
    if (!box.style.backgroundColor) return initialGrey(box);      // No color
    const rgba = box.style.backgroundColor.match(/[\d\.]+/g);

    if (box.classList.contains("grey")) return getNextGrey(...rgba);
    else return initialGrey(box);
}

function initialGrey(box) {
    box.classList.add("grey");
    box.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
}

function getNextGrey(red, green, blue, alpha) {
    // Convert alpha into decimal
    if (alpha == null) alpha = 1;
    alpha = parseFloat(alpha);

    const nextAlpha = alpha - 0.1;
    alpha = (nextAlpha < 0) ? alpha : nextAlpha;

    return `rgba(${red}, ${green}, ${blue}, ${alpha}`;
}

function black() {
    return "rgba(0, 0, 0)";
}