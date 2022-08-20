import {Api} from "./Api.js";
import {clearSearch, getClients, reloadContent} from "./main.js";
import {loader} from "./loader.js";

const closeAddModal = () => {
    const container = document.getElementById('container');
    const modalOverlay = document.querySelector('.modal-overlay--visible');
    modalOverlay.classList.remove('modal-overlay--visible')
    container.removeChild(modalOverlay)
}

export const deleteContact = async (id) => {
    const buttonAddClient = document.querySelector('.button-save-client');
    buttonAddClient.classList.add('show-loader');
    buttonAddClient.classList.add('mini-loader');
    buttonAddClient.classList.add('save-loader');
    loader(true)
    await Api.delete(`http://localhost:3000/api/clients/${id}`);
    loader(false)
    buttonAddClient.classList.remove('show-loader');
    buttonAddClient.classList.remove('mini-loader');
    buttonAddClient.classList.remove('save-loader');
    closeAddModal();
    clearSearch();
    reloadContent();
    getClients();
}

export const deleteClientModalRender = (clientId) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList = 'modal-overlay modal-overlay--visible';
    const container = document.getElementById('container');
    container.append(modalOverlay);
    const containerDeleteClientModal = document.createElement('div');
    containerDeleteClientModal.className = 'delete-client-form-modal modal modal--visible';
    modalOverlay.append(containerDeleteClientModal);

    const deleteModalHeadingContainer = document.createElement('div')
    deleteModalHeadingContainer.className = 'delete-modal-heading-container'
    containerDeleteClientModal.append(deleteModalHeadingContainer);

    const deleteModalHeading = document.createElement('h3')
    deleteModalHeading.className = 'delete-modal-heading';
    deleteModalHeading.innerText = 'Удалить клиента';
    deleteModalHeadingContainer.append(deleteModalHeading);

    const buttonCloseModal = document.createElement('button');
    buttonCloseModal.className = 'close-modal-btn btn-close-delete-modal';
    deleteModalHeadingContainer.append(buttonCloseModal)

    const deleteModalDescription = document.createElement('div')
    deleteModalDescription.className = 'delete-modal-description';
    deleteModalDescription.innerText = 'Вы действительно хотите удалить данного клиента?';
    containerDeleteClientModal.append(deleteModalDescription);

    const deleteCancelButtonContainer = document.createElement('div')
    deleteCancelButtonContainer.className = 'delete-modal-button-container'
    containerDeleteClientModal.append(deleteCancelButtonContainer)

    const buttonDeleteClient = document.createElement('button');
    buttonDeleteClient.innerText = 'Удалить клиента';
    buttonDeleteClient.className = 'button-save-client button-delete-modal';
    buttonDeleteClient.onclick = () => deleteContact(clientId);
    deleteCancelButtonContainer.append(buttonDeleteClient)

    const buttonCancelModal = document.createElement('button');
    buttonCancelModal.className = 'add-modal-cancel delete-modal-button-cancel'
    buttonCancelModal.innerText = 'Отмена';
    deleteCancelButtonContainer.append(buttonCancelModal);

    buttonCloseModal.onclick = () => closeAddModal();
    buttonCancelModal.onclick = () => closeAddModal();
}