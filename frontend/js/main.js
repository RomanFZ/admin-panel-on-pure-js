import {Api} from "./Api.js";
import {getToUpdateClient} from "./updateModal.js";
import {addClientModalRender} from "./addModal.js";
import {sortingClients} from "./sort.js";
import {loader} from "./loader.js";
import {deleteClientModalRender} from "./deleteModal.js";

let allClients = [];
let key = 'id';
let dir = 'asc';


// Запрос всех клиентов
export const getClients = async () => {

    const tableContent = document.querySelector('.table-content')
    tableContent.classList.add('show-loader');
    tableContent.classList.add('big-loader');
    loader(true);
    const clients = await Api.get('http://localhost:3000/api/clients');
    allClients = sortingClients(clients, key, dir);

    if (allClients.length >= 0) {
        loader(false);
    }
    tableContent.classList.remove('big-loader');
    renderTableClients();
}

    
// Переход(скролл) к клиенту после выбора в поиске и добавление бордера
const goToClient = (id) => {
    const validId = id.substr(7, 6);
    const idClients = document.querySelectorAll('.cell-id')
    idClients.forEach((item, index) => {
        if (item.innerText === validId) {
            item.scrollIntoView({
                behavior:"smooth"
            })
            item.parentNode.classList.add('add-table-border');
        } else {
        }
    })

}

// При клике на наиденные данные клиентов, записывается значение в поле поиска и добавляется бордер для элемента
const onclickSearchResult = (client) => {
    const tableLines = document.querySelectorAll('.table-line')
    tableLines.forEach(item => {
        item.classList.remove('add-table-border')
    })
    const inputValue = document.querySelector('.input-search');
    inputValue.value = `${client.surname} ${client.name} ${client.lastName}`;
    const findClients = document.querySelectorAll('.find-client');
    findClients.forEach((item, index) => {
        item.innerHTML = '';
    })
    goToClient(client.id)
}


// Кнопка очищает полностью поиск
export const clearSearch = () => {
    const inputSearch = document.querySelector('.input-search');
    inputSearch.value = '';
    const searchResult = document.querySelector('.input-search-result');
    searchResult.innerText = '';
    const tableLines = document.querySelectorAll('.table-line')
    tableLines.forEach((item, index) => {
       item.classList.remove('add-table-border')
    })
    const header = document.querySelector('.header-container')
    const button = document.querySelector('.clear-button');
    if (button) {
        header.removeChild(button);
    }
}

// Рендер header
export const headerRender = () => {
    const container = document.getElementById('container');
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';
    container.append(headerContainer);

    const logo = document.createElement('img');
    logo.className = 'header-logo';
    logo.src = '../image/logo.png'
    headerContainer.append(logo);

    const searchContainer = document.createElement('div');
    searchContainer.className = 'header-search';
    headerContainer.append(searchContainer);

    const searchResult = document.createElement('div');
    searchResult.className = 'input-search-result';

    // Вызывается контейнер после ввода текста в инпут поиска
    const resultSearch = async () => {

        const inputValue = inputSearch.value;
        const clears = document.querySelectorAll('.clear-button')
        clears.forEach((item) => {
            headerContainer.removeChild(item);
        })
        if (inputValue.length >= 0) {
            const clearButton = document.createElement("button");
            clearButton.classList = 'clear-button';
            clearButton.innerText = 'очистить';
            clearButton.onclick = () => clearSearch();
            headerContainer.append(clearButton)
        }

        searchResult.innerText = '';
        let pattern = /^[\s]+$/;

        if (!pattern.test(inputValue)) {
            let searchAllClients = await Api.get(`http://localhost:3000/api/clients?search=${inputValue}`);
            searchAllClients.map((item, index) => {
                const findClient = document.createElement('div');
                findClient.classList = 'find-client';
                findClient.innerText = `${item.surname} ${item.name} ${item.lastName}`;
                findClient.onclick = () => onclickSearchResult(item);
                searchResult.append(findClient)
            })
        } else {
            alert ('Переменная String содержит одни пробелы!');
        }
    }

    const inputSearch = document.createElement('input');
    inputSearch.className = 'input-search';
    inputSearch.placeholder = 'Введите запрос';

    let timer;
    inputSearch.onkeyup = () => {
        clearInterval(timer);
        timer = setTimeout(resultSearch, 2000)
    }

    searchContainer.append(inputSearch, searchResult)
}

// Перерендер всего контента(таблицы)
export const reloadContent = () => {
    const tableContent = document.querySelector('.table-content');
    const tableLines = document.querySelectorAll('.table-line');
    tableLines.forEach(item => {
        tableContent.removeChild(item)
    })
}



const sortParams = (keySort, direction) => {
    if (allClients.length > 0) {
        key = keySort;
        dir = direction;
        reloadContent()
        getClients()
    }
}

headerRender()

const container = document.getElementById('container');

const content = document.createElement('div');
content.className = 'content';
container.append(content);

const tableContainer = document.createElement('div');
tableContainer.className = 'table-container';
content.append(tableContainer);

const heading = document.createElement('h2');
heading.className = 'table-container-heading';
heading.innerText = 'Клиенты';

tableContainer.append(heading);

const table = document.createElement('table');
table.className = 'table';
tableContainer.append(table)

const thead = document.createElement('thead');
thead.className = 'table-heading';
const trHead = document.createElement('tr')
trHead.className = 'table-head-line-heading';

const tdHeadingId = document.createElement('td');
tdHeadingId.className = 'table-line-heading';
const tdHeadingIdText = document.createElement('div')
tdHeadingIdText.innerText = 'ID';
tdHeadingIdText.className = 'heading-id header-table-highlight';
const tdHeadingIdSort = document.createElement('div');
tdHeadingIdSort.className = 'image-sorting image-sorting-up';
tdHeadingId.append(tdHeadingIdText, tdHeadingIdSort)

const tdHeadingName = document.createElement('td');
tdHeadingName.className = 'table-line-heading';
const tdHeadingNameText = document.createElement('div')
tdHeadingNameText.innerText = 'Фамилия Имя Отчество';
tdHeadingNameText.className = 'heading-name';
const tdHeadingNameSort = document.createElement('div');
tdHeadingNameSort.className = 'image-sorting image-sorting-down';
const sortingDirection = document.createElement('div');
sortingDirection.className = 'sorting-direction';
sortingDirection.innerText = 'Я-А';
tdHeadingName.append(tdHeadingNameText, tdHeadingNameSort, sortingDirection)

const tdHeadingCreateDate = document.createElement('td');
tdHeadingCreateDate.className = 'table-line-heading';
const tdHeadingCreateDateText = document.createElement('div')
tdHeadingCreateDateText.innerText = 'Дата и время создания';
tdHeadingCreateDateText.className = 'heading-createAt';
const tdHeadingCreateDateSort = document.createElement('div');
tdHeadingCreateDateSort.className = 'image-sorting image-sorting-down';
tdHeadingCreateDate.append(tdHeadingCreateDateText, tdHeadingCreateDateSort)

const tdHeadingUpdateDate = document.createElement('td');
tdHeadingUpdateDate.className = 'table-line-heading';
const tdHeadingUpdateDateText = document.createElement('div')
tdHeadingUpdateDateText.innerText = 'Последнее изменение';
tdHeadingUpdateDateText.className = 'heading-updateAt';
const tdHeadingUpdateDateSort = document.createElement('div');
tdHeadingUpdateDateSort.className = 'image-sorting image-sorting-down';
tdHeadingUpdateDate.append(tdHeadingUpdateDateText, tdHeadingUpdateDateSort)

const tdHeadingContacts = document.createElement('td');
tdHeadingContacts.className = 'table-line-heading';
tdHeadingContacts.innerText = 'Контакты';


const tdHeadingButtons = document.createElement('td');
tdHeadingButtons.className = 'table-line-heading';
tdHeadingButtons.innerText = 'Действия';
table.append(thead);
thead.append(trHead);
trHead.append(tdHeadingId, tdHeadingName, tdHeadingCreateDate, tdHeadingUpdateDate, tdHeadingContacts, tdHeadingButtons)

const tbody = document.createElement('tbody');
tbody.className = 'table-content';
table.append(tbody);

const tableHeadings = document.querySelectorAll('.table-line-heading');

tableHeadings.forEach(item => {
    item.addEventListener('click', function () {
        if (item.innerText === 'ID') {
            const text = item.childNodes[0];
            text.classList.add('header-table-highlight')
            const arrowUpDown = item.childNodes[1];
            if (dir === 'asc') {
                arrowUpDown.classList.remove('image-sorting-up')
                arrowUpDown.classList.add('image-sorting-down')
                sortParams('id','desc')
            } else {
                arrowUpDown.classList.add('image-sorting-up')
                arrowUpDown.classList.remove('image-sorting-down')
                sortParams('id','asc')
            }
        } else {
            const noUnderlineHeading = document.querySelector('.heading-id')
            noUnderlineHeading.classList.remove('header-table-highlight')
        }
        if (item.childNodes[0].innerText === 'Фамилия Имя Отчество') {
            console.log('я здесь');
            const text = item.childNodes[0];
            const sortDir = item.childNodes[2];
            text.classList.add('header-table-highlight');
            const arrowUpDown = item.childNodes[1];
            if (dir === 'asc') {
                sortDir.innerText = 'Я-А';
                arrowUpDown.classList.remove('image-sorting-up')
                arrowUpDown.classList.add('image-sorting-down')
                sortParams('surname','desc')
            } else {
                sortDir.innerText = 'А-Я';
                arrowUpDown.classList.add('image-sorting-up')
                arrowUpDown.classList.remove('image-sorting-down')
                sortParams('surname','asc')
            }
        } else {
            const noUnderlineHeading = document.querySelector('.heading-name')
            noUnderlineHeading.classList.remove('header-table-highlight')
        }
        if (item.innerText === 'Дата и время создания') {
            const text = item.childNodes[0];
            text.classList.add('header-table-highlight');
            const arrowUpDown = item.childNodes[1];
            if (dir === 'asc') {
                arrowUpDown.classList.remove('image-sorting-up')
                arrowUpDown.classList.add('image-sorting-down')
                sortParams('createdAt','desc')
            } else {
                arrowUpDown.classList.add('image-sorting-up')
                arrowUpDown.classList.remove('image-sorting-down')
                sortParams('createdAt','asc')
            }
        } else {
            const noUnderlineHeading = document.querySelector('.heading-createAt')
            noUnderlineHeading.classList.remove('header-table-highlight')
        }
        if (item.innerText === 'Последнее изменение') {
            const text = item.childNodes[0];
            text.classList.add('header-table-highlight');
            const arrowUpDown = item.childNodes[1];
            if (dir === 'asc') {
                arrowUpDown.classList.remove('image-sorting-up')
                arrowUpDown.classList.add('image-sorting-down')
                sortParams('updatedAt','desc')
            } else {
                arrowUpDown.classList.add('image-sorting-up')
                arrowUpDown.classList.remove('image-sorting-down')
                sortParams('updatedAt','asc')
            }
        } else {
            const noUnderlineHeading = document.querySelector('.heading-updateAt')
            noUnderlineHeading.classList.remove('header-table-highlight')
        }
    })
})

// Рендер таблицы с клиентами
const renderTableClients = () => {

     allClients.map((item, index) => {
        const trBody = document.createElement('tr');
        trBody.className = 'table-line';
        const id = document.createElement('td');
        id.className = 'cell-id table-content-cell';
        id.innerText = item.id.substr(7, 6);
        const name = document.createElement('td');
        name.className = 'table-content-cell';
        name.innerText = `${item.surname} ${item.name} ${item.lastName}`;
        const createDate = document.createElement('td');
        createDate.className = 'table-content-cell';

        const convertCreatedDate = new Date(item.updatedAt);
        const convertUpdatedDate = new Date(item.createdAt);

        createDate.innerText = convertCreatedDate.toLocaleString().slice(0, 10);
        const changeDate = document.createElement('td');
        changeDate.className = 'table-content-cell';
        const spanCreatedTime = document.createElement('span');
        spanCreatedTime.innerText = convertCreatedDate.toLocaleString().slice(11, 17);

        changeDate.innerText = convertUpdatedDate.toLocaleString().slice(0, 10);

        const spanUpdatedTime = document.createElement('span');
        spanUpdatedTime.innerText = convertUpdatedDate.toLocaleString().slice(11, 17);

        const contacts = document.createElement('td');
        contacts.className = 'table-content-cell cell-contacts';

        item.contacts.map((item, index) => {

            if (item.type === 'Телефон') {
                const spanContactTel = document.createElement('span');
                spanContactTel.setAttribute('tooltip', `${item.type}: ${item.value}`);
                spanContactTel.className = 'icon-contact tel';
                contacts.append(spanContactTel)
            }
            if (item.type === 'Доп. телефон') {
                const spanAdditionalTel = document.createElement('span');
                spanAdditionalTel.setAttribute('tooltip', `${item.type}: ${item.value}`);
                spanAdditionalTel.className = 'icon-contact other';
                contacts.append(spanAdditionalTel)
            }
            if (item.type === 'Email') {
                const spanContactEmail = document.createElement('span');
                spanContactEmail.setAttribute('tooltip', `${item.type}: ${item.value}`);
                spanContactEmail.className = 'icon-contact email';
                contacts.append(spanContactEmail)
            }
            if (item.type === 'Vk') {
                const spanContactVk = document.createElement('span');
                spanContactVk.setAttribute('tooltip', `${item.type}: ${item.value}`);
                spanContactVk.className = 'icon-contact vk';
                contacts.append(spanContactVk)
            }
            if (item.type === 'Facebook') {
                const spanContactFacebook = document.createElement('span');
                spanContactFacebook.setAttribute('tooltip', `${item.type}: ${item.value}`);
                spanContactFacebook.className = 'icon-contact facebook';
                contacts.append(spanContactFacebook)
            }
        });
        const buttons = document.createElement('td');
         buttons.className = 'table-content-cell';

        const buttonsContainer = document.createElement('div');
         buttonsContainer.classList = 'buttons-container';

        const editButtonContainer = document.createElement('div')
         editButtonContainer.classList = 'edit-button-container';

         const deleteButtonContainer = document.createElement('div')
        deleteButtonContainer.classList = 'delete-button-container';

        const updateButton = document.createElement('button');
        updateButton.className = 'edit-delete-button edit-button';
        const deleteButton = document.createElement('button');
         deleteButton.className = 'edit-delete-button';

        const editImage = document.createElement('div');
        editImage.classList = 'edit-button-image';

         const deleteImage = document.createElement('div');
         deleteImage.classList = 'delete-button-image';

        updateButton.innerText = 'Изменить';
        deleteButton.innerText = 'Удалить';

         editButtonContainer.onclick = () => {
             editButtonContainer.classList.add('show-loader');
             editButtonContainer.classList.add('mini-loader');
             return  getToUpdateClient(item.id);
         }
         deleteButtonContainer.onclick = () => deleteClientModalRender(item.id);

         buttonsContainer.append(editButtonContainer, deleteButtonContainer);
         buttons.append(buttonsContainer)

        editButtonContainer.append(editImage, updateButton);
        deleteButtonContainer.append(deleteImage, deleteButton);

        tbody.append(trBody)
        trBody.append(id, name, createDate, changeDate, contacts, buttons)
        changeDate.append(spanCreatedTime);
        createDate.append(spanUpdatedTime);
    })

}

const buttonAddClient = document.createElement('button');
buttonAddClient.classList = 'button-add-client';
buttonAddClient.innerText = 'добавить клиента';
tableContainer.append(buttonAddClient)

buttonAddClient.onclick = () => addClientModalRender();

getClients()

