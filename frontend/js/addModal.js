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
    modalOverlay.classList.remove('modal-overlay--visible');
    container.removeChild(modalOverlay);
}

export const errorMessage = (error) => {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.innerText = error;
    const buttonSave = document.querySelector('.button-save-client');
    const addModalContainer = document.querySelector('.add-client-form-modal');
    const oldErrorContainer = document.querySelector('.error-container');
    if (oldErrorContainer) {
        addModalContainer.removeChild(oldErrorContainer);
    }
    addModalContainer.insertBefore(errorContainer, buttonSave);
}

export const disableError = () => {
    console.log('я туттут')
    const addModalContainer = document.querySelector('.add-client-form-modal');
    const oldErrorContainer = document.querySelector('.error-container');
    if (oldErrorContainer) {
        addModalContainer.removeChild(oldErrorContainer);
    }
}

export const validate = (surname, name, lastname, arrayContacts) => {
    const pattern= /^[А-яа-я0-9a-zA-z_-]{3,16}$/;
    const patternPhone = /^[0-9]*^\d{11,11}$/;
    const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const patternSocial =  /^[А-яа-я0-9a-zA-z_-]{3,50}$/

    if (surname.search(pattern) === -1) {
        errorMessage('Некорректная фамилия')
        return true;
    }
    if (name.search(pattern) === -1) {
        errorMessage('Некорректное имя')
        return true;
    }
    if (arrayContacts.length === 0) {
        errorMessage('Добавьте контакты');
        return true;
    }
    const arrayContactValidate = arrayContacts.map((item) => {
        if (item.type === 'Телефон') {
            if (item.value.search(patternPhone) === -1) {
                errorMessage('Некорректный телефон, должно быть 11 цифр')
                return true;
            }
        }
        if (item.type === 'Email') {
            if (item.value.search(patternEmail) === -1) {
                console.log('item.value', item.value)
                errorMessage('Некорректный email');
                return true;
            }
        }
        if (item.type === 'Доп. телефон') {
            if (item.value.search(patternPhone) === -1) {
                errorMessage('Некорректный дополнительный телефон')
                return true;
            }
        }
        if (item.type === 'Vk') {
            if (item.value.search(patternSocial) === -1) {
                errorMessage('Некорректный профиль VK')
                return true;
            }
        }
        if (item.type === 'Facebook') {
            if (item.value.search(patternSocial) === -1) {
                errorMessage('Некорректный профиль Facebook')
                return true;
            }
        }
        return false;
    })
    const flag = (el) => {
        return el === true;
    }
    return !!arrayContactValidate.some(flag);
}

const addClient = async (inputSurnameValue, inputNameValue, inputLastnameValue) => {
    const arrayContacts = addContacts();
    const validateReg = validate(inputSurnameValue, inputNameValue, inputLastnameValue, arrayContacts)
    if (validateReg) {
        return;
    }
    const dataClient = { name: inputNameValue, 'surname': inputSurnameValue, lastName: inputLastnameValue, contacts : arrayContacts}
    const buttonAddClient = document.querySelector('.button-save-client');
    buttonAddClient.classList.add('show-loader');
    buttonAddClient.classList.add('mini-loader');
    buttonAddClient.classList.add('save-loader');
    loader(true)
    await postClients(dataClient);
    loader(false)
    buttonAddClient.classList.remove('show-loader');
    buttonAddClient.classList.remove('mini-loader');
    buttonAddClient.classList.remove('save-loader');
    closeAddModal();
    reloadContent();
    await getClients();
}

export const addClientModalRender = () => {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList = 'modal-overlay modal-overlay--visible';
    const container = document.getElementById('container');
    container.append(modalOverlay);
    const containerAddClientModal = document.createElement('form');
    containerAddClientModal.className = 'add-client-form-modal modal modal--visible formWithValidation';
    modalOverlay.append(containerAddClientModal);


    const headingContainerAddClientModal = document.createElement('div');
    headingContainerAddClientModal.className = 'add-modal-heading-container';
    containerAddClientModal.append(headingContainerAddClientModal)
    const headingAddClientModal = document.createElement('h3');
    headingAddClientModal.className = 'add-client-heading'
    headingAddClientModal.innerText = 'Новый клиент';
    headingContainerAddClientModal.append(headingAddClientModal);

    const buttonCloseModal = document.createElement('button');
    buttonCloseModal.className = 'close-modal-btn';

    buttonCloseModal.onclick = () => closeAddModal();
    headingContainerAddClientModal.append(buttonCloseModal)

    const containerAddModalFields = document.createElement('div');
    containerAddModalFields.className = 'container-add-modal-fields';
    containerAddClientModal.append(containerAddModalFields)

    const labelSurname = document.createElement('label');
    labelSurname.className = 'add-client-modal-label';
    const inputSurname = document.createElement('input');
    inputSurname.className = 'input-surname field';
    inputSurname.type = 'text';
    inputSurname.required = 'required';
    const placeholderToFill = document.createElement('div');
    placeholderToFill.className = 'placeholder';
    placeholderToFill.innerText = 'Фамилия';
    const requiredToFill = document.createElement('span');
    requiredToFill.className = 'required';
    requiredToFill.innerText = '*';
    placeholderToFill.append(requiredToFill);
    labelSurname.append(inputSurname, placeholderToFill);
    containerAddModalFields.append(labelSurname)

    const labelName = document.createElement('label');
    labelName.className = 'add-client-modal-label';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.required = 'required';
    inputName.className = 'input-name field';
    const placeholderToFillName = document.createElement('div');
    placeholderToFillName.className = 'placeholder';
    placeholderToFillName.innerText = 'Имя';
    const requiredToFillName = document.createElement('span');
    requiredToFillName.className = 'required';
    requiredToFillName.innerText = '*';
    placeholderToFillName.append(requiredToFillName);
    labelName.append(inputName, placeholderToFillName)
    containerAddModalFields.append(labelName)

    const labelLastName = document.createElement('label');
    labelLastName.className = 'add-client-modal-label';
    const inputLastName = document.createElement('input');
    inputLastName.placeholder = 'Отчество';
    inputLastName.className = 'input-last-name field';
    labelLastName.append(inputLastName)
    containerAddModalFields.append(labelLastName)

    const containerContacts = document.createElement('div');
    containerContacts.className = 'add-client-form-modal__contacts';

    const containerFieldsContacts = document.createElement('div')
    containerFieldsContacts.className = 'container-fields-contact'
    containerContacts.append(containerFieldsContacts)

    const addFieldContact = () => {
        const verifyContact = document.querySelectorAll('.field-contact')
        console.log(verifyContact)
        if (verifyContact.length === 10) {
            errorMessage('Максимально количество контактов 10')
        } else {
            const fieldContact = document.createElement('div');
            fieldContact.className = 'field-contact';
            containerFieldsContacts.append(fieldContact)
            const selectContact = document.createElement('select');
            selectContact.className = 'select-contact field';
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
            inputContact.className = 'input-contact field';
            inputContact.type = 'text';
            inputContact.required = true;
            inputContact.placeholder = 'Введите данные контакта'

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

   containerAddClientModal.append(containerContacts)

    const buttonAddContact = document.createElement('div');
    buttonAddContact.className = 'btn-add-contacts'
    buttonAddContact.innerText = 'Добавить контакт';
    containerContacts.append(buttonAddContact)

    buttonAddContact.onclick = () => addFieldContact();


    const buttonAddClient = document.createElement('button');
    buttonAddClient.className = 'button-save-client validateBtn';
    buttonAddClient.innerText = 'Сохранить';
    buttonAddClient.type = 'button';
    buttonAddClient.onclick = () => addClient(inputSurname.value, inputName.value, inputLastName.value);
    containerAddClientModal.append(buttonAddClient);

    const cancelAddClient = document.createElement('div');
    cancelAddClient.className = 'add-modal-cancel'
    cancelAddClient.innerText = 'Отмена';
    cancelAddClient.onclick = () => closeAddModal();

    containerAddClientModal.append(cancelAddClient);

    clearSearch()
}