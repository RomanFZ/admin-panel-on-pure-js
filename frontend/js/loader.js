export const loader = (flag) => {
    console.log(flag)
    const tableContent = document.querySelector('.table-content');
    const btnAddClient = document.querySelector('.button-add-client');
    const loader = document.createElement('div');
    loader.classList = 'loader';
    if (flag) {
        tableContent.append(loader);
        btnAddClient.style = 'display: none';
    } else {
        const loader = document.querySelector('.loader');
        tableContent.removeChild(loader)
        btnAddClient.style = 'display: block';
    }
}