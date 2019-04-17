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

function setupLayerToggle(supportsTouch: boolean) {

    let isShowingLayersControlPanel: boolean;
    let layersControlPanel = document.getElementById('layers-control-panel') as HTMLDivElement;
    let leafletDefaultLayersControl = document.getElementsByClassName('leaflet-control-layers-list')[0] as HTMLElement;
    let layersControlToggleButton: HTMLButtonElement = document.getElementById('layers-control-toggle') as HTMLButtonElement;
    layersControlToggleButton.onclick = () => { isShowingLayersControlPanel ? hideLayersControlPanel() : showLayersControlPanel(); }
    
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

    if (supportsTouch) {
        hideLayersControlPanel();
    } else {
        showLayersControlPanel();
    }
}

/// NAV CONTROL


function setupNavToggle(supportsTouch: boolean) {

    let isShowingNavControlPanel: boolean;
    let navControlPanel = document.getElementById('nav-control-panel') as HTMLDivElement;
    let navControlToggleButton: HTMLButtonElement = document.getElementById('nav-control-toggle') as HTMLButtonElement;
    navControlToggleButton.onclick = () => { isShowingNavControlPanel ? hideNavControlPanel() : showNavControlPanel();}
    
    function hideNavControlPanel() {
        hideHTMLElement(navControlPanel);
        isShowingNavControlPanel = false;
    }
    function showNavControlPanel() {
        showHTMLElement(navControlPanel);
        isShowingNavControlPanel = true;
    }

    if (supportsTouch) {
        hideNavControlPanel();
    } else {
        showNavControlPanel();
    }
}

export function makeResponsive() {

    console.log('in makeresponsive');
    let supportsTouch = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    
    setupLayerToggle(supportsTouch);
    setupNavToggle(supportsTouch);

    if (supportsTouch) {
        hideDesktopElements();
    } else {
        showDesktopElements();
    } 
}
 
