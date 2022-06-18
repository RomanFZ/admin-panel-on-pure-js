import {Api} from "./Api.js";
import {clearSearch, getClients, reloadContent} from "./main.js";
import {addContacts} from "./addModal.js";

let client = [];
let idClient = null;

export const getToUpdateClient = async (id) => {

    idClient = id;
    const result = await Api.get(`http://localhost:3000/api/clients/${id}`);
    return updateClientModalRender(result)
}

const patchClients = async (id, data) => {
    await Api.patch(`http://localhost:3000/api/clients/${id}`, data);
}

const closeUpdateModal = () => {
    const container = document.getElementById('container');
    const modalOverlay = document.querySelector('.modal-overlay--visible');
    modalOverlay.classList.remove('modal-overlay--visible')
    container.removeChild(modalOverlay)
    client = [];
    idClient = null;
}

const updateClient = async (inputSurnameValue, inputNameValue, inputLastnameValue) => {
    const arrayContacts = addContacts();
    const dataClient = { name: inputNameValue, surname: inputSurnameValue, lastName: inputLastnameValue, contacts : arrayContacts}
    await patchClients(idClient, dataClient);
    closeUpdateModal()
    reloadContent();
    getClients();
}

const updateClientModalRender = (client) => {

    const modalOverlay = document.createElement('div');
    modalOverlay.classList = 'modal-overlay modal-overlay--visible';
    const container = document.getElementById('container');
    container.append(modalOverlay);
    const containerUpdateClientModal = document.createElement('form');
    containerUpdateClientModal.className = 'add-client-form-modal modal modal--visible';
    modalOverlay.append(containerUpdateClientModal);

    const headingUpdateClientModal = document.createElement('h3');
    headingUpdateClientModal.innerText = 'Добавить клиента';
    containerUpdateClientModal.append(headingUpdateClientModal);

    const buttonCloseModal = document.createElement('button');
    buttonCloseModal.innerText = 'Закрыть модалку';

    buttonCloseModal.onclick = () => closeUpdateModal();
    containerUpdateClientModal.append(buttonCloseModal)

        const labelSurname = document.createElement('label');
        labelSurname.innerText = 'Фамилия';
        const inputSurname = document.createElement('input');
        inputSurname.type = 'text';
        inputSurname.required = 2;
        inputSurname.value = client.surname;

        labelSurname.append(inputSurname)
        containerUpdateClientModal.append(labelSurname)

        const labelName = document.createElement('label');
        labelName.innerText = 'Имя';
        const inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.required = 2;
        inputName.value = client.name;

        labelName.append(inputName)
        containerUpdateClientModal.append(labelName)

        const labelLastname = document.createElement('label');
        labelLastname.innerText = 'Отчество';
        const inputLastname = document.createElement('input');
        inputLastname.type = 'text';
        inputLastname.required = 2;
        inputLastname.value = client.lastName;

        labelLastname.append(inputLastname)
        containerUpdateClientModal.append(labelLastname)

        const containerContacts = document.createElement('div');
        containerContacts.className = 'add-client-form-modal__contacts';

        client.contacts.map((i, index) => {

            const fieldContactOld = document.createElement('div');
            fieldContactOld.className = 'field-contact';
            containerContacts.append(fieldContactOld)

            const selectUpdateContact = document.createElement('select');
            selectUpdateContact.className = 'select-contact';



            const optionClient = document.createElement('option');
            optionClient.innerText = i.type
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

            selectUpdateContact.append(optionClient ,optionTel, optionEmail, optionVk, optionFb, optionOther)

            if (i.type === 'Телефон') {
                selectUpdateContact.removeChild(optionTel);
            }
            if (i.type === 'Email') {
                selectUpdateContact.removeChild(optionEmail);
            }
            if (i.type === 'Vk') {
                selectUpdateContact.removeChild(optionVk);
            }
            if (i.type === 'Facebook') {
                selectUpdateContact.removeChild(optionFb);
            }
            if (i.type === 'Другое') {
                selectUpdateContact.removeChild(optionOther);
            }

            const inputUpdateContact = document.createElement('input');
            inputUpdateContact.className = 'input-contact';
            inputUpdateContact.value = i.value;

            const buttonDeleteContact = document.createElement('button');
            buttonDeleteContact.innerText = 'Закрыть';

            const deleteContact = () => {
                containerContacts.removeChild(fieldContactOld)
            }

            buttonDeleteContact.onclick = () => deleteContact()

            fieldContactOld.append(selectUpdateContact, inputUpdateContact, buttonDeleteContact)
        })

        const updateFieldContact = () => {
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
            inputContact.required = 2;

            const buttonDeleteContact = document.createElement('button');
            buttonDeleteContact.innerText = 'Закрыть';

            const deleteContact = () => {
                containerContacts.removeChild(fieldContact)
            }

            buttonDeleteContact.onclick = () => deleteContact()

            fieldContact.append(selectContact, inputContact, buttonDeleteContact);
        }

        containerUpdateClientModal.append(containerContacts)

        const buttonUpdateContact = document.createElement('div');
        buttonUpdateContact.style.border = '1px solid green';
        buttonUpdateContact.innerText = 'Добавить контакт';
        containerContacts.append(buttonUpdateContact)

        buttonUpdateContact.onclick = () => updateFieldContact();

        const buttonUpdateClient = document.createElement('button');
        buttonUpdateClient.innerText = 'Изменить';
        buttonUpdateClient.type = 'button';
        buttonUpdateClient.onclick = () => updateClient(inputSurname.value, inputName.value, inputLastname.value)
        containerUpdateClientModal.append(buttonUpdateClient);
        clearSearch();
}

