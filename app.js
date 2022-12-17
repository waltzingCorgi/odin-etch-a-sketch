// Declare and intialize variables
const button = document.querySelector("button");
const container = document.querySelector(".wrapper");
button.hidden = true;   // Using "r" to reset

// Create grid
createGrid(16);

// Event Listeners
button.addEventListener("click", resetGrid);

window.addEventListener("keydown", (e) => {
    if (e.key === "r") resetGrid();
    return;
})

// Functions
function resetGrid() {
  destroyGrid(container);

  // Get and validate side length
  let sideLength = prompt("Grid length: ", 16);
  sideLength = parseInt(sideLength);
  if (!isValidSideLength(sideLength)) return;
  
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
            div.classList.add("filled");
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

