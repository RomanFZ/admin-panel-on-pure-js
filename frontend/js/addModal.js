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

const addClient = async (inputSurnameValue, inputNameValue, inputLastnameValue) => {
    const arrayContacts = addContacts();
    const dataClient = { name: inputNameValue, 'surname': inputSurnameValue, lastName: inputLastnameValue, contacts : arrayContacts}
    const buttonAddClient = document.querySelector('.button-save-client');
    buttonAddClient.classList.add('show-loader');
    buttonAddClient.classList.add('mini-loader');
    loader(true)
    await postClients(dataClient);
    loader(false)
    buttonAddClient.classList.remove('show-loader');
    buttonAddClient.classList.remove('mini-loader');
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
    inputSurname.className = 'input-surname field';
    inputSurname.type = 'text';

    labelSurname.append(inputSurname)
    containerAddClientModal.append(labelSurname)

    const labelName = document.createElement('label');
    labelName.innerText = 'Имя';
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.className = 'input-name field';

    labelName.append(inputName)
    containerAddClientModal.append(labelName)

    const labelLastName = document.createElement('label');
    labelLastName.innerText = 'Отчество';
    const inputLastName = document.createElement('input');
    inputLastName.className = 'input-last-name field';

    labelLastName.append(inputLastName)
    containerAddClientModal.append(labelLastName)

    const containerContacts = document.createElement('div');
    containerContacts.className = 'add-client-form-modal__contacts';

    const addFieldContact = () => {

        const fieldContact = document.createElement('div');
        fieldContact.className = 'field-contact';
        containerContacts.append(fieldContact)


        const selectContact = document.createElement('select');
        selectContact.className = 'select-contact field';
        const optionNull = document.createElement('option');
        optionNull.innerText = '123'
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
        inputContact.className = 'input-contact field';
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

    const errorMessageContainer = document.createElement('div');
    errorMessageContainer.className = 'error-message';
    containerAddClientModal.append(errorMessageContainer);

    const buttonAddContact = document.createElement('div');
    buttonAddContact.style.border = '1px solid green';
    buttonAddContact.innerText = 'Добавить контакт';
    containerContacts.append(buttonAddContact)

    buttonAddContact.onclick = () => addFieldContact();

    // const buttonAddContainer = document.createElement('div');

    const buttonAddClient = document.createElement('button');
    buttonAddClient.className = 'button-save-client validateBtn';
    buttonAddClient.innerText = 'Сохранить';
    // buttonAddClient.type = 'button';
    // buttonAddClient.onclick = () =>
    //     // e.preventDefault()
    //     addClient(inputSurname.value, inputName.value, inputLastname.value);
    //

    // buttonAddContainer.append(buttonAddClient)
    containerAddClientModal.append(buttonAddClient);


    const form = document.querySelector('.formWithValidation');
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        const fields = form.querySelectorAll('.field')
        for (let i = 0; i < fields.length; i++) {

            const error = document.createElement('div')
            error.className='error';
            error.style.color = 'red';
            error.innerHTML = 'Cannot be blank';
            console.log('form[i]', form[i].parentElement)
        }
    })
    // form.addEventListener('submit', function (event) {
    //     event.preventDefault()
        // const validateBtn = form.querySelector('.validateBtn');
        // const valueSurname = form.querySelector('.input-surname');
        // const valueName = form.querySelector('.input-name')
        // const valueLastName = form.querySelector('.input-last-name')
        // const selectValue = form.querySelector('.select-contact');
        // console.log('selectValue', selectValue)
        // const valueInputContact = form.querySelector('.input-contact')
        // const errorMessage = form.querySelector('.error-message')
        // console.log('clicked on validate');
        // console.log('valueSurname: ', valueSurname.value)
        // console.log('valueName: ', valueName.value)
        // console.log('valueLastName: ', valueLastName.value)
        // console.log('valueInputContact: ', valueInputContact.value)
        // console.log('errorMessage: ', errorMessage.value)
        // console.log('selectValue: ', selectValue.value)
    // })


    clearSearch()
}