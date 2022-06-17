export const loader = (flag) => {
    console.log(flag)
    const container = document.getElementById('container');
    const loader = document.createElement('div');
    loader.classList = 'loader';
    if (flag) {
        container.append(loader);
    } else {
        const loader = document.querySelector('.loader');
        container.removeChild(loader)
    }
}