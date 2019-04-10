/// RESPONSIVE

function hideElementById(id: string) {
    document.getElementById(id).hidden = true;
}

export function makeResponsive() {

    let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    if (supportsTouch) {
        ['zoom-control', 'nexrad-animation-time-slider']
        .forEach((id: string) => hideElementById(id))
    } 
}
 