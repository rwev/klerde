function hideElementById(id: string) {
    hideHTMLElement(document.getElementById(id))
}
function showElementById(id: string) {
    showHTMLElement(document.getElementById(id))
}

export function hideHTMLElement(el: HTMLElement) {
    el.style.display = 'none';
}
export function showHTMLElement(el: HTMLElement) {
    el.style.display = 'block';
}

function hideDesktopElements() {
    hideElementById('zoom-control');
}
function showDesktopElements() {
    showElementById('zoom-control');
}

/// LAYER CONTROL

let isShowingLayersControlPanel: boolean;
let layersControlPanel: HTMLDivElement;
let leafletDefaultLayersControl: HTMLElement;

function hideLayersControlPanel() {
    hideHTMLElement(layersControlPanel);
    hideHTMLElement(leafletDefaultLayersControl);
    isShowingLayersControlPanel = false;
}
function showLayersControlPanel() {
    showHTMLElement(layersControlPanel);
    showHTMLElement(leafletDefaultLayersControl);
    isShowingLayersControlPanel = true;
}

function setupLayerToggle(supportsTouch: boolean) {

    isShowingLayersControlPanel = false;
    layersControlPanel = document.getElementById('layers-control-panel') as HTMLDivElement;
    leafletDefaultLayersControl = document.getElementsByClassName('leaflet-control-layers-list')[0] as HTMLElement;
    
    let layersControlToggleButton: HTMLButtonElement = document.getElementById('layers-control-toggle') as HTMLButtonElement;
    layersControlToggleButton.onclick = () => {
        if (isShowingLayersControlPanel) {
            hideLayersControlPanel();
        } else {
            if (supportsTouch) {
                hideNavControlPanel();
            }
            showLayersControlPanel();
        }
    }

}

/// NAV CONTROL

let isShowingNavControlPanel: boolean;
let navControlPanel: HTMLDivElement;
    
function hideNavControlPanel() {
    hideHTMLElement(navControlPanel);
    isShowingNavControlPanel = false;
}
function showNavControlPanel() {
    showHTMLElement(navControlPanel);
    isShowingNavControlPanel = true;
}

function setupNavToggle(supportsTouch: boolean) {

    isShowingNavControlPanel = false;
    navControlPanel = document.getElementById('nav-control-panel') as HTMLDivElement;
    
    let navControlToggleButton: HTMLButtonElement = document.getElementById('nav-control-toggle') as HTMLButtonElement;
    navControlToggleButton.onclick = () => {
        if (isShowingNavControlPanel) {
            hideNavControlPanel();
        } else {
            if (supportsTouch) {
                hideLayersControlPanel();
            }
            showNavControlPanel();
        }
    }
}

export function makeResponsive() {

    console.log('in makeresponsive');
    let supportsTouch = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    
    setupLayerToggle(supportsTouch);
    setupNavToggle(supportsTouch);

    if (supportsTouch) {
        hideDesktopElements();
        hideLayersControlPanel();
        hideNavControlPanel();
    } else {
        showDesktopElements();
        showLayersControlPanel();
        showNavControlPanel();
    } 
}
 
