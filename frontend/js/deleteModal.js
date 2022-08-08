import {Api} from "./Api.js";
import {clearSearch, getClients, reloadContent} from "./main.js";

const closeAddModal = () => {
    const container = document.getElementById('container');
    const modalOverlay = document.querySelector('.modal-overlay--visible');
    modalOverlay.classList.remove('modal-overlay--visible')
    container.removeChild(modalOverlay)
}

export const deleteContact = async (id) => {
    await Api.delete(`http://localhost:3000/api/clients/${id}`);
    clearSearch();
    reloadContent();
    getClients();
}

export const deleteClientModalRender = (clientId) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList = 'modal-overlay modal-overlay--visible';
    const container = document.getElementById('container');
    container.append(modalOverlay);
    const containerDeleteClientModal = document.createElement('form');
    containerDeleteClientModal.className = 'delete-client-form-modal modal modal--visible';
    modalOverlay.append(containerDeleteClientModal);

    const buttonDeleteClient = document.createElement('button');
    buttonDeleteClient.innerText = 'Удалить клиента';

    buttonDeleteClient.onclick = () => deleteContact(clientId);
    containerDeleteClientModal.append(buttonDeleteClient)

    const buttonCloseModal = document.createElement('button');
    buttonCloseModal.innerText = 'Закрыть модалку';

    buttonCloseModal.onclick = () => closeAddModal();
    containerDeleteClientModal.append(buttonCloseModal)
}