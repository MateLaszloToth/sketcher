'use strict';

const SKETCHER_WIDTH = 500;
let lastColorAngle = 0;
let isDrawing = false;

function updateColor(e) {
    e.stopPropagation();
    if (isDrawing)
        e.target.style.backgroundColor = getNewColor();
}

function getNewColor() {
    lastColorAngle += 5;
    return `hsl(${lastColorAngle}, 85%, 38%)`;
}

function loadSideBar() {
    const sideBar = document.querySelector('aside');
    sideBar.replaceChildren(createEraseButton(), createSlider());
}

function createEraseButton() {
    const eraseButton = document.createElement('button');
    eraseButton.textContent = 'Erase';
    eraseButton.classList.add('erase');
    eraseButton.addEventListener('click', renderPage);
    return eraseButton;
}

function createSlider() {
    let slider = document.querySelector('input');
    if (slider === null) {
        slider = document.createElement('input');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', '10');
        slider.setAttribute('max', '50');
        slider.setAttribute('value', '16');
        slider.classList.add('slider');
        slider.addEventListener('change', loadSketcherWindow);
    }
    return slider;
}

function loadSketcherWindow() {
    const mainDiv = document.querySelector('main');
    mainDiv.replaceChildren(getTitle(), getGridWindow());

    const body = document.querySelector('body');
    body.removeEventListener('mouseup', turnDrawingOff);
    body.addEventListener('mouseup', turnDrawingOff);
}

function getGridWindow() {
    const grid = document.createElement('div');
    grid.style.display = 'flex';
    appendColumns(grid);
    return grid;
}

function appendColumns(sketcher) {
    const gridColumnNumber = getGridDimension();
    const cellWidth = SKETCHER_WIDTH / gridColumnNumber;
    for (let i = 0; i < gridColumnNumber; i++) {
        const column = document.createElement('div');
        column.classList.add('column');
        appendCells(column, gridColumnNumber, cellWidth);
        sketcher.appendChild(column);
    }
}

function appendCells(column, gridRowNumber, cellWidth) {
    for (let j = 0; j < gridRowNumber; j++) {
        const cell = document.createElement('div');
        cell.style.width = `${cellWidth}px`;
        cell.style.height = `${cellWidth}px`;
        cell.style.border = '1px solid peachpuff';
        cell.addEventListener('mousedown', turnDrawingOn);
        cell.addEventListener('mousemove', updateColor);
        cell.addEventListener('mouseup', turnDrawingOff);
        column.appendChild(cell);
    }
}

function getTitle() {
    const title = document.createElement('h1');
    title.textContent = 'Sketcher';
    return title;
}

function turnDrawingOff() {
    isDrawing = false;
}

function turnDrawingOn() {
    isDrawing = true;
}


function getGridDimension() {
    return document.querySelector('.slider').value;
}

function renderPage() {
    loadSideBar();
    loadSketcherWindow();
}

renderPage();



