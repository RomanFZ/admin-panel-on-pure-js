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
    const onLoader = document.querySelector('.on-loader')
    if (flag) {
        onLoader.append(loaderContainer);
    } else {
        onLoader.removeChild(loaderContainer)
        onLoader.classList.remove('on-loader')
    }


    // const line = document.querySelectorAll('.table-line');
    //
    // console.log(flag)
    // const tableContent = document.querySelector('.table-content');
    // const btnAddClient = document.querySelector('.button-add-client');
    // if (flag) {
    //     if (action === 'getClients') {
    //         console.log(loaderContainer)
    //         tableContent.appendChild(loaderContainer);
    //         svg.classList.add('big-loader')
    //         btnAddClient.style = 'display: none';
    //     }
    //     if (action === 'updateButton') {
    //         const correctId = id.substr(7, 6);
    //         line.forEach(item => {
    //         if (item.childNodes[0].innerText === correctId) {
    //             const tableLine = item.childNodes[5];
    //             const editContainer =  tableLine.childNodes[0];
    //             const editButtons = editContainer.childNodes[0];
    //             const editIcon = editButtons.childNodes[0];
    //             editIcon.style = 'display: none';
    //             editButtons.style = 'flex-direction: row-reverse'
    //             svg.classList.add('mini-loader')
    //             // editContainer.replaceChild(loaderContainer, editIcon)
    //             editButtons.append(loaderContainer);
    //         }
    //         })
    //     }
    //     if (action === 'saveNewClient') {
    //         const buttonSave = document.querySelector('.button-save-client')
    //         buttonSave.appendChild(loaderContainer)
    //     }
    //
    // } else {
    //     const loaderContainer = document.querySelector('.loader-container');
    //     const parentLoader = loaderContainer.parentNode;
    //     parentLoader.removeChild(loaderContainer);
    //     if (action === 'getClients') {
    //         svg.classList.remove('big-loader')
    //         btnAddClient.style = 'display: block';
    //     }
    //     if (action === 'updateButton') {
    //         const editImages = document.querySelectorAll('.edit-button-image');
    //         svg.classList.remove('mini-loader')
    //         editImages.forEach(item => {
    //             const editButtonContainer = item.parentNode;
    //             editButtonContainer.style = 'flex-direction: row';
    //                 console.log(item)
    //             item.style = 'display: inline-block';
    //         })
    //         // editContainer.replaceChild(loaderContainer, editIcon)
    //     }
    //     if (action === 'saveNewClient') {
    //         const buttonSave = document.querySelector('.add-client-form-modal')
    //         buttonSave.removeChild(loaderContainer)
    //     }
    // }
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