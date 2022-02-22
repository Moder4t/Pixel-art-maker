/* Variables */
const grid = document.getElementById("grid")
const gridSizeInput = document.getElementById("gridSizeInput")
const colorInput = document.getElementById("colorInput")
const colorInputDisplay = document.getElementById("colorInputDisplay")
const sizeDisplay = document.getElementById("sizeDisplay")
const erase = document.getElementById("erase")
let colorArray = [];


grid.addEventListener("mouseover", function(e) {
    detCouleur(e);
})
grid.addEventListener("touchstart", function(e) {
    detCouleur(e);
})
gridSizeInput.addEventListener('input', function(e) {
    creationGrid(e.target.value);
})

/* creation de la grid */
/* reference: https://stackoverflow.com/questions/63102609/fit-a-grid-into-a-div-whatever-the-number-of-rows-and-columns */
function creationGrid(size) {
    sizeDisplay.innerText = size + ' X ' + size;
    grid.innerHTML = '';
    grid.style.setProperty('--grid-rows', size);
    grid.style.setProperty('--grid-cols', size);
    for (col = 0; col < (size * size); col++) {
        let cell = document.createElement('div');
        grid.appendChild(cell).className = 'gridSquare';
    };
}


/* Creation de la couleur de font */
/* reference: https://css-tricks.com/snippets/javascript/random-hex-color/ */
function detCouleur(e) {
    let bgColor = null;
    if (colorArray.length === 0) {
        bgColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    } else {
        bgColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    e.target.style.backgroundColor = bgColor;

    /* methode #2 a completer */
    /*e.target.style.backgroundColor(colorArray.length === 0 ? 
        '#'+Math.floor(Math.random() * 16777215).toString(16) :
        colorArray[Math.floor(Math.random() * colorArray.length)]);*/

}

/* color input*/
/* reference: https://stackoverflow.com/questions/19639506/continuous-color-transition/19657772 */
colorInput.addEventListener('change', function(e) {
    colorArray.push(e.target.value);
    colorArray.length > 0 ?
        erase.style.visibility = "visible" :
        erase.style.visibility = "hidden"

    colorInputDisplay.innerHTML = '';
    for (let couleur = 0; couleur < colorArray.length; couleur++) {
        const color = document.createElement("div")
        color.style.backgroundColor = colorArray[couleur]
        color.style.height = "32px"
        color.style.width = "32px"
        colorInputDisplay.appendChild(color);
    }
})

/* event handler effacer */
/* reference: https://www.w3schools.com/jsref/prop_style_visibility.asp */
erase.addEventListener('click', function(e) {
    colorArray = [];
    colorInputDisplay.innerHTML = '';
    erase.style.visibility = "hidden";
})

creationGrid(16);