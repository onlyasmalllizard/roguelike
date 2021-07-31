const map = document.querySelector('#map');
const grid = [];
const gridWidth = 12;
const gridHeight = 10;

// Add arrays to function as rows in the game grid
for (let i = 0; i < gridWidth; i++) {
    grid.push([]);
}

// Set up terrain data
const walkableTerrains = [
    {name: 'grass', isWalkable: true, src: './assets/images/grass.png', alt: ''},
    {name: 'path', isWalkable: true, src: './assets/images/path-dark.png', alt: ''},
    {name: 'sand', isWalkable: true, src: './assets/images/sand.png', alt: ''}
]

const unwalkableTerrains = [
    {name: 'wall', isWalkable: false, src: './assets/images/wall.png', alt: ''},
    {name: 'water', isWalkable: false, src: './assets/images/water.png', alt: ''}
]

// Combine terrain data into themed groups, resulting in game areas that look coherent
function setTerrainGroups() {
    let terrainGroupStorage = [];
    walkableTerrains.forEach(walkableTerrain => {
        let group = [];
        group.push(walkableTerrain);
        unwalkableTerrains.forEach(unwalkableTerrain => {
            group.push(unwalkableTerrain);
        })
        terrainGroupStorage.push(group);
    })
    return terrainGroupStorage;
}
const terrainGroups = setTerrainGroups();


function createTerrainImage(imageData) {
    let image = document.createElement('img');
    image.src = imageData.src;
    image.alt = imageData.alt;
    image.classList.add('tile-img');

    return image;
}

function createTile() {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    return tile;
}

function generateRandomElement(listLength) {
    return Math.floor(Math.random() * listLength);
}

function prepareTerrain(terrainCategory) {
    let tile = createTile();
    let tileTerrain = terrainType[generateRandomElement(terrainCategory.length)];
    let image = createTerrainImage(tileTerrain);

    tile.appendChild(image);
    return { html: tile, terrainInfo: tileTerrain };
}

// Set the type of terrain for the current map and generate tiles
const terrainType = terrainGroups[generateRandomElement(terrainGroups.length)]
grid.forEach(row => {
    for (let i = 0; i < gridHeight; i++) {
        let tile = prepareTerrain(terrainType);
        map.appendChild(tile.html);
        row.push(tile.terrainInfo);
    }
})