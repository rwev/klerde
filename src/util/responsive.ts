function hideElementById(id: string) {
    hideHTMLElement(document.getElementById(id))
}

export function makeResponsive() {

    let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    if (supportsTouch) {
        ['zoom-control', 'weather-animation-time-slider']
        .forEach((id: string) => hideElementById(id))
    } 
}
 
export function hideHTMLElement(el: HTMLElement) {
    el.style.display = 'none';
}
export function showHTMLElement(el: HTMLElement) {
    el.style.display = 'block';
}