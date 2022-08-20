const loaderContainer = document.createElement('div');
loaderContainer.classList = 'loader-container';

const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttributeNS(null, 'viewBox', '0 0 50 50');
svg.classList = 'loader';


const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.classList = 'path';
circle.setAttributeNS(null, 'cx', '25');
circle.setAttributeNS(null,  'cy', '25');
circle.setAttributeNS(null,  'r', '16');
circle.setAttributeNS(null,'stroke-width','3');
circle.setAttributeNS(null, 'fill', 'none');

svg.appendChild(circle)
loaderContainer.appendChild(svg)


export const loader = (flag, action, id) => {
    const onLoader = document.querySelector('.show-loader')
    if (flag) {
        onLoader.append(loaderContainer);
    } else {
        onLoader.removeChild(loaderContainer)
        onLoader.classList.remove('show-loader')
    }
}