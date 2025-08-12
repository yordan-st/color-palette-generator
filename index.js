const colorInpt = document.getElementById('colorEl');
const schemeInpt = document.getElementById('schemeEl');
const colorForm = document.getElementById('colorForm');

let currentPalette = []

// Function to fetch colors
function getColors() {
    const params = {
        color: colorInpt.value.substring(1),
        scheme: schemeInpt.value
    };
    console.log(params)
    return fetch(`https://www.thecolorapi.com/scheme?hex=${params.color}&mode=${params.scheme}&count=5`)
        .then(res => res.json())
        .then(data => data.colors);
}

// Function to fetch and render colors
function fetchAndRenderColors() {
    getColors().then(colors => {
        currentPalette = colors;
        console.log("Fetched Colors:", currentPalette);
        renderPalette(currentPalette);
    }).catch(error => console.error("Error fetching colors:", error));
}

// Call `fetchAndRenderColors()` on page load
window.addEventListener('load', fetchAndRenderColors);

// Handle form submission to fetch new colors
colorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    fetchAndRenderColors();
});

// Function to render colors
function renderPalette(palette) {
    let tilesHtml = '';
    for (let color of palette) {
        tilesHtml += `
        <li style="background-color: ${color.hex.value}">
            <button class="btn-copy" aria-label="Copy ${color.name.value} color" 
                style="background-color: #1F2937; width: 100%; border: none;">
                ${color.name.value}
            </button>
        </li>
        `;
    }
    console.log(tilesHtml);
    document.getElementById('color-palette').innerHTML = tilesHtml;
}