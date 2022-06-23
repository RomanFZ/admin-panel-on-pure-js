const loaderContainer = document.createElement('div');
loaderContainer.classList = 'loader-container';

const svg = document.createElement('svg');
svg.setAttributeNS(null, 'viewBox', '0 0 50 50');
svg.classList = 'loader';


const circle = document.createElementNS(null, 'circle');
circle.classList = 'path';
circle.setAttributeNS(null, 'cx', '25');
circle.setAttributeNS(null,  'cy', '25');
circle.setAttributeNS(null,  'r', '20');
circle.setAttributeNS(null,'stroke-width',' 5');
circle.setAttributeNS(null, 'fill', 'none');

svg.appendChild(circle)
loaderContainer.appendChild(svg)





export const loader = (flag) => {
    console.log(flag)
    const tableContent = document.querySelector('.table-content');
    const btnAddClient = document.querySelector('.button-add-client');
    if (flag) {
        console.log(loaderContainer)
        tableContent.appendChild(loaderContainer);
        btnAddClient.style = 'display: none';
    } else {
        // const loaderContainer = document.querySelector('.loader-container');
        tableContent.removeChild(loaderContainer)
        btnAddClient.style = 'display: block';
    }
}


// export const miniLoader = (flag, id) => {
//     const loader = document.createElement('div');
//     loader.classList = 'mini-loader';
//     const correctId = id.substr(7, 6);
//     const line = document.querySelectorAll('.table-line');
//     if (flag) {
//         line.forEach(item => {
//             if (item.childNodes[0].innerText === correctId) {
//                 const tableLine = item.childNodes[5];
//                 const editContainer =  tableLine.childNodes[0];
//                 const editIcon = editContainer.childNodes[0]
//                 editIcon.classList.remove('edit-button-image')
//                 editIcon.classList.add('mini-loader')
//             }
//         })
//     } else {
//         line.forEach(item => {
//             if (item.childNodes[0].innerText === correctId) {
//                 const tableLine = item.childNodes[5];
//                 const editContainer =  tableLine.childNodes[0];
//                 const editIcon = editContainer.childNodes[0];
//                 editIcon.classList.add('edit-button-image')
//                 editIcon.classList.remove('mini-loader')
//             }
//         })
//     }
// }