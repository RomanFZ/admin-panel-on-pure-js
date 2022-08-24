import {Api} from "./Api.js";
import {clearSearch, getClients, reloadContent} from "./main.js";
import {addContacts, disableError, errorMessage, validate} from "./addModal.js";
import {loader} from "./loader.js";
import {deleteClientModalRender} from "./deleteModal.js";

let client = [];
let idClient = null;

export const getToUpdateClient = async (id) => {
    loader(true)
    idClient = id;
    const result = await Api.get(`http://localhost:3000/api/clients/${id}`);
    loader(false)
    const editButtonContainers = document.querySelectorAll('.edit-button-container');
    editButtonContainers.forEach(item => {
        item.classList.remove('mini-loader')
    })
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
    history.pushState("", document.title, window.location.pathname);
}

const updateClient = async (inputSurnameValue, inputNameValue, inputLastnameValue) => {
    const arrayContacts = addContacts();
    const validateReg = validate(inputSurnameValue, inputNameValue, inputLastnameValue, arrayContacts)
    if (validateReg) {
        return;
    }
    const dataClient = { name: inputNameValue, surname: inputSurnameValue, lastName: inputLastnameValue, contacts : arrayContacts}
    const buttonAddClient = document.querySelector('.button-save-client');
    buttonAddClient.classList.add('show-loader');
    buttonAddClient.classList.add('mini-loader');
    buttonAddClient.classList.add('save-loader');
    loader(true)
    await patchClients(idClient, dataClient);
    loader(false)
    buttonAddClient.classList.remove('show-loader');
    buttonAddClient.classList.remove('mini-loader');
    buttonAddClient.classList.remove('save-loader');
    closeUpdateModal();
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

    const headingContainerUpdateClientModal = document.createElement('div');
    headingContainerUpdateClientModal.className = 'update-modal-heading-container';
    containerUpdateClientModal.append(headingContainerUpdateClientModal)

    const headingUpdateClientModal = document.createElement('h3');
    headingUpdateClientModal.className = 'add-client-heading update-client-heading';
    headingUpdateClientModal.innerText = 'Изменить данные';
    headingContainerUpdateClientModal.append(headingUpdateClientModal);

    const headingUpdateIdClient = document.createElement('span')
    headingUpdateIdClient.className = 'update-modal-id-client'
    headingUpdateIdClient.innerText = `ID: ${client.id.substr(7, 6)}`;
    headingContainerUpdateClientModal.append(headingUpdateIdClient)
    window.location.hash = client.id;

    const buttonCloseModal = document.createElement('button');
    buttonCloseModal.className = 'close-modal-btn close-modal-btn-update';

    buttonCloseModal.onclick = () => closeUpdateModal();
    headingContainerUpdateClientModal.append(buttonCloseModal)

    const containerUpdateModalFields = document.createElement('div');
    containerUpdateModalFields.className = 'container-update-modal-fields';
    containerUpdateClientModal.append(containerUpdateModalFields);

        const labelSurname = document.createElement('label');
        labelSurname.innerText = 'Фамилия';
        labelSurname.className = 'update-client-modal-label';
        const inputSurname = document.createElement('input');
        inputSurname.className = 'field update-field';
        inputSurname.type = 'text';
        inputSurname.required = 'required';
        inputSurname.value = client.surname;

        labelSurname.append(inputSurname)
        containerUpdateModalFields.append(labelSurname)

        const labelName = document.createElement('label');
        labelName.innerText = 'Имя';
        labelName.className = 'update-client-modal-label update-label-fix';
        const inputName = document.createElement('input');
        inputName.className = 'field update-field';
        inputName.type = 'text';
        inputName.required = 'required';
        inputName.value = client.name;

        labelName.append(inputName)
    containerUpdateModalFields.append(labelName)

        const labelLastname = document.createElement('label');
        labelLastname.innerText = 'Отчество';
        labelLastname.className = 'update-client-modal-label update-label-fixed';
        const inputLastname = document.createElement('input');
        inputLastname.className = 'field update-field';
        inputLastname.type = 'text';
        inputLastname.required = 'required';
        inputLastname.value = client.lastName;

        labelLastname.append(inputLastname)
    containerUpdateModalFields.append(labelLastname)

        const containerContacts = document.createElement('div');
        containerContacts.className = 'add-client-form-modal__contacts update-client-form-modal';
        const containerFieldsContacts = document.createElement('div')
        containerFieldsContacts.className = 'container-fields-contact'
        containerContacts.append(containerFieldsContacts)

        client.contacts.map((i, index) => {

            const fieldContactOld = document.createElement('div');
            fieldContactOld.className = 'field-contact update-field-contact';
            containerFieldsContacts.append(fieldContactOld)

            const selectUpdateContact = document.createElement('select');
            selectUpdateContact.className = 'select-contact update-select';

            const optionClient = document.createElement('option');
            optionClient.innerText = i.type
            const optionTel = document.createElement('option');
            optionTel.innerText = 'Телефон';
            const optionAdditionalTel = document.createElement('option');
            optionAdditionalTel.innerText = 'Доп. телефон';
            const optionEmail = document.createElement('option');
            optionEmail.innerText = 'Email';
            const optionVk = document.createElement('option');
            optionVk.innerText = 'Vk';
            const optionFb = document.createElement('option');
            optionFb.innerText = 'Facebook';

            selectUpdateContact.append(optionClient ,optionTel, optionEmail, optionVk, optionFb, optionAdditionalTel)

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
            if (i.type === 'Доп. телефон') {
                selectUpdateContact.removeChild(optionAdditionalTel);
            }

            const inputUpdateContact = document.createElement('input');
            inputUpdateContact.className = 'input-contact field-update';
            inputUpdateContact.value = i.value;

            const buttonDeleteContact = document.createElement('div');
            buttonDeleteContact.className = 'btn-delete-contact';
            buttonDeleteContact.setAttribute('tooltip', 'Удалить контакт');

            const deleteContact = () => {
                containerFieldsContacts.removeChild(fieldContactOld)
            }

            buttonDeleteContact.onclick = () => deleteContact()

            fieldContactOld.append(selectUpdateContact, inputUpdateContact, buttonDeleteContact)
        })

        const updateFieldContact = () => {
            const verifyContact = document.querySelectorAll('.field-contact')
            if (verifyContact.length === 10) {
                errorMessage('Максимально количество контактов 10')
            } else {
                const fieldContact = document.createElement('div');
                fieldContact.className = 'field-contact update-field-contact';
                containerFieldsContacts.append(fieldContact)

                const selectContact = document.createElement('select');
                selectContact.className = 'select-contact update-select';
                selectContact.required = 'required';
                const optionTel = document.createElement('option');
                optionTel.innerText = 'Телефон';
                const optionAdditionalTel = document.createElement('option');
                optionAdditionalTel.innerText = 'Доп. телефон';
                const optionEmail = document.createElement('option');
                optionEmail.innerText = 'Email';
                const optionVk = document.createElement('option');
                optionVk.innerText = 'Vk';
                const optionFb = document.createElement('option');
                optionFb.innerText = 'Facebook';

                selectContact.append(optionTel, optionAdditionalTel, optionEmail, optionVk, optionFb)

                const inputContact = document.createElement('input');
                inputContact.className = 'input-contact field-update';
                inputContact.type = 'text';
                inputContact.required = 2;

                const buttonDeleteContact = document.createElement('div');
                buttonDeleteContact.className = 'btn-delete-contact';
                buttonDeleteContact.setAttribute('tooltip', 'Удалить контакт');

                const deleteContact = () => {
                    disableError();
                    containerFieldsContacts.removeChild(fieldContact)
                }

                buttonDeleteContact.onclick = () => deleteContact()

                fieldContact.append(selectContact, inputContact, buttonDeleteContact);
            }
        }

        containerUpdateClientModal.append(containerContacts)

        const buttonUpdateContact = document.createElement('div');
        buttonUpdateContact.className = 'btn-add-contacts';
        buttonUpdateContact.innerText = 'Добавить контакт';
        containerContacts.append(buttonUpdateContact)

        buttonUpdateContact.onclick = () => updateFieldContact();

        const buttonUpdateClient = document.createElement('button');
        buttonUpdateClient.className = 'button-save-client update-save-client'
        buttonUpdateClient.innerText = 'Сохранить';
        buttonUpdateClient.type = 'button';

        buttonUpdateClient.onclick = () => updateClient(inputSurname.value, inputName.value, inputLastname.value)

        const deleteClientButton = document.createElement('div');
        deleteClientButton.className = 'add-modal-cancel update-modal-cancel';
        deleteClientButton.innerText = 'Удалить клиента';

        deleteClientButton.onclick = () => {
            closeUpdateModal();
            deleteClientModalRender(client.id);
        }

        containerUpdateClientModal.append(buttonUpdateClient, deleteClientButton);
        clearSearch();
}

