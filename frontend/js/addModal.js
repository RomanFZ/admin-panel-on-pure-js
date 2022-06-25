import {Api} from "./Api.js";
import {clearSearch, getClients, reloadContent} from "./main.js";
import {loader} from "./loader.js";

const postClients = async (data) => {
    await Api.post('http://localhost:3000/api/clients', data);
}

export const addContacts = () => {
    let arrayTypesContacts = [];
    let arrayValueContacts = [];

    document.querySelectorAll('.select-contact').forEach( function (select) {
        arrayTypesContacts.push(select.value)
    })
    document.querySelectorAll('.input-contact').forEach( function (input) {
        arrayValueContacts.push(input.value)
    })

    return Object.assign(arrayTypesContacts.map((n, i) => ({'type' : n, 'value' : arrayValueContacts[i]})));
}

const closeAddModal = () => {
    const container = document.getElementById('container');
    const modalOverlay = document.querySelector('.modal-overlay--visible');
    modalOverlay.classList.remove('modal-overlay--visible')
    container.removeChild(modalOverlay)
}

const addClient = async (inputSurnameValue, inputNameValue, inputLastnameValue) => {
    const arrayContacts = addContacts();
    const dataClient = { name: inputNameValue, 'surname': inputSurnameValue, lastName: inputLastnameValue, contacts : arrayContacts}
    const buttonAddClient = document.querySelector('.button-save-client');
    buttonAddClient.classList.add('show-loader');
    buttonAddClient.classList.add('mini-loader');
    loader(true)
    postClients(dataClient);
    loader(false)
    buttonAddClient.classList.remove('show-loader');
    buttonAddClient.classList.remove('mini-loader');
    closeAddModal();
    reloadContent();
    getClients();
}

export const addClientModalRender = () => {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList = 'modal-overlay modal-overlay--visible';
    const container = document.getElementById('container');
    container.append(modalOverlay);
    const containerAddClientModal = document.createElement('form');
    containerAddClientModal.className = 'add-client-form-modal modal modal--visible';
    modalOverlay.append(containerAddClientModal);

    const headingAddClientModal = document.createElement('h3');
    headingAddClientModal.innerText = 'Добавить клиента';
    containerAddClientModal.append(headingAddClientModal);

    const buttonCloseModal = document.createElement('button');
    buttonCloseModal.innerText = 'Закрыть модалку';

    buttonCloseModal.onclick = () => closeAddModal();
    containerAddClientModal.append(buttonCloseModal)

    const labelSurname = document.createElement('label');
    labelSurname.innerText = 'Фамилия';
    const inputSurname = document.createElement('input');
    inputSurname.type = 'text';
    inputSurname.required = true;

    labelSurname.append(inputSurname)
    containerAddClientModal.append(labelSurname)

    const labelName = document.createElement('label');
    labelName.innerText = 'Имя';
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.required = true;

    labelName.append(inputName)
    containerAddClientModal.append(labelName)

    const labelLastname = document.createElement('label');
    labelLastname.innerText = 'Отчество';
    const inputLastname = document.createElement('input');
    inputLastname.type = 'text';
    inputLastname.required = true;

   labelLastname.append(inputLastname)
    containerAddClientModal.append(labelLastname)

    const containerContacts = document.createElement('div');
    containerContacts.className = 'add-client-form-modal__contacts';

    const addFieldContact = () => {

        const fieldContact = document.createElement('div');
        fieldContact.className = 'field-contact';
        containerContacts.append(fieldContact)


        const selectContact = document.createElement('select');
        selectContact.className = 'select-contact';
        const optionNull = document.createElement('option');
        const optionTel = document.createElement('option');
        optionTel.innerText = 'Телефон';
        const optionEmail = document.createElement('option');
        optionEmail.innerText = 'Email';
        const optionVk = document.createElement('option');
        optionVk.innerText = 'Vk';
        const optionFb = document.createElement('option');
        optionFb.innerText = 'Facebook';
        const optionOther = document.createElement('option');
        optionOther.innerText = 'Другое';

        selectContact.append(optionNull,optionTel, optionEmail, optionVk, optionFb, optionOther)

        const inputContact = document.createElement('input');
        inputContact.className = 'input-contact';
        inputContact.type = 'text';
        inputContact.required = true;

        const buttonDeleteContact = document.createElement('button');
        buttonDeleteContact.innerText = 'Закрыть';

        const deleteContact = () => {
            containerContacts.removeChild(fieldContact)
        }

        buttonDeleteContact.onclick = () => deleteContact()

        fieldContact.append(selectContact, inputContact, buttonDeleteContact);
    }

   containerAddClientModal.append(containerContacts)

    const buttonAddContact = document.createElement('div');
    buttonAddContact.style.border = '1px solid green';
    buttonAddContact.innerText = 'Добавить контакт';
    containerContacts.append(buttonAddContact)

    buttonAddContact.onclick = () => addFieldContact();

    // const buttonAddContainer = document.createElement('div');

    const buttonAddClient = document.createElement('button');
    buttonAddClient.className = 'button-save-client';
    buttonAddClient.innerText = 'Сохранить';
    buttonAddClient.type = 'submit';
    buttonAddClient.onclick = () => addClient(inputSurname.value, inputName.value, inputLastname.value)
    // buttonAddContainer.append(buttonAddClient)
    containerAddClientModal.append(buttonAddClient);
    clearSearch()
}