import {Api} from "./Api.js";
import {getClient} from "./updateModal.js";
import {addClientModalRender} from "./addModal.js";
import {sortingClients} from "./sort.js";
import {loader} from "./loader.js";

let allClients = [];
let key = 'id';
let dir = 'asc';


// Запрос всех клиентов
export const getClients = async () => {
    loader(true)
    const clients = await Api.get('http://localhost:3000/api/clients');
    allClients = sortingClients(clients, key, dir);
    if (allClients.length > 0) {
        loader(false);
    }
    renderTableClients();
}

getClients()

    
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
            console.log('не работает')
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

    const logo = document.createElement('div');
    logo.className = 'header-logo';
    logo.innerText = 'ЛОГОТИП';
    headerContainer.append(logo);

    const searchContainer = document.createElement('div');
    searchContainer.className = 'header-search';
    headerContainer.append(searchContainer);

    const searchResult = document.createElement('div');
    searchResult.className = 'input-search-result';

    // Вызывается контеинер после ввода текста в инпут поиска
    const resultSearch = async () => {

        const inputValue = inputSearch.value;

        if (inputValue.length >= 0) {
            const clearButton = document.createElement("button")
            clearButton.classList = 'clear-button'
            clearButton.innerText = 'очистить';
            clearButton.onclick = () => clearSearch();
            headerContainer.append(clearButton)
        }

        searchResult.innerText = ''
        let pattern = /^[\s]+$/;

        if (inputValue.length > 2 && !pattern.test(inputValue)) {
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

    let timer;
    inputSearch.onkeyup = () => {
        clearInterval(timer);
        timer = setTimeout(resultSearch, 2000)
    }

    searchContainer.append(inputSearch, searchResult)
}

// Перерендер всего контента(таблицы)
export const reloadContent = () => {
    const container = document.getElementById('container');
    const content = document.querySelector('.content');
    container.removeChild(content)
}

const deleteContact = async (id) => {
    await Api.delete(`http://localhost:3000/api/clients/${id}`);
    clearSearch()
    reloadContent()
    getClients()
}

const sortParams = (keySort, direction) => {
    key = keySort;
    dir = direction;
    reloadContent()
    getClients()
}

headerRender()

// Рендер таблицы с клиентами
const renderTableClients = () => {
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
    trHead.className = 'table-line-heading';
    
    const tdHeadingId = document.createElement('td');
    tdHeadingId.className = 'table-line-heading';
    tdHeadingId.innerText = 'ID';
    tdHeadingId.onclick = () =>  dir === 'asc' ? sortParams('id','desc') : sortParams('id','asc')
    const tdHeadingIdDirSorting = document.createElement('span')
    tdHeadingIdDirSorting.innerText = 'убывание';
    if (key === 'id' && dir === 'asc') {
        tdHeadingIdDirSorting.innerText = 'возрастание';
        tdHeadingIdDirSorting.style.color = 'green';
    }
    if (key === 'id' && dir === 'desc') {
        tdHeadingIdDirSorting.innerText = 'убывание'
        tdHeadingIdDirSorting.style.color = 'green';
    }
    tdHeadingId.append(tdHeadingIdDirSorting)

    const tdHeadingName = document.createElement('td');
    tdHeadingName.className = 'table-line-heading';
    tdHeadingName.innerText = 'Фамилия Имя Отчество';
    tdHeadingName.onclick = () => dir === 'asc' ? sortParams('surname','desc') : sortParams('surname','asc')
    const tdHeadingNameDirSorting = document.createElement('span')
    tdHeadingNameDirSorting.innerText = 'убывание';
    if (key === 'surname' && dir === 'asc') {
        tdHeadingNameDirSorting.innerText = 'возрастание'
        tdHeadingNameDirSorting.style.color = 'green';
    }
    if (key === 'surname' && dir === 'desc') {
        tdHeadingNameDirSorting.innerText = 'убывание'
        tdHeadingNameDirSorting.style.color = 'green';
    }
    tdHeadingName.append(tdHeadingNameDirSorting)
    
    const tdHeadingCreateDate = document.createElement('td');
    tdHeadingCreateDate.className = 'table-line-heading';
    tdHeadingCreateDate.innerText = 'Дата создания';
    tdHeadingCreateDate.onclick = () => dir === 'asc' ? sortParams('createdAt','desc') : sortParams('createdAt','asc')
    const tdHeadingCreateDateDirSorting = document.createElement('span')
    tdHeadingCreateDateDirSorting.innerText = 'убывание';
    if (key === 'createdAt' && dir === 'asc') {
        tdHeadingCreateDateDirSorting.innerText = 'возрастание'
        tdHeadingCreateDateDirSorting.style.color = 'green';
    }
    if (key === 'createdAt' && dir === 'desc') {
        tdHeadingCreateDateDirSorting.innerText = 'убывание'
        tdHeadingCreateDateDirSorting.style.color = 'green';
    }
    tdHeadingCreateDate.append(tdHeadingCreateDateDirSorting)

    const tdHeadingUpdateDate = document.createElement('td');
    tdHeadingUpdateDate.className = 'table-line-heading';
    tdHeadingUpdateDate.innerText = 'Дата изменения';
    tdHeadingUpdateDate.onclick = () => dir === 'asc' ? sortParams('updatedAt','desc') : sortParams('updatedAt','asc')
    const tdHeadingUpdateDateDirSorting = document.createElement('span')
    tdHeadingUpdateDateDirSorting.innerText = 'убывание';
    if (key === 'updatedAt' && dir === 'asc') {
        tdHeadingUpdateDateDirSorting.innerText = 'возрастание'
        tdHeadingUpdateDateDirSorting.style.color = 'green';
    }
    if (key === 'updatedAt' && dir === 'desc') {
        tdHeadingUpdateDateDirSorting.innerText = 'убывание'
        tdHeadingUpdateDateDirSorting.style.color = 'green';
    }
    tdHeadingUpdateDate.append(tdHeadingUpdateDateDirSorting)
    
    const tdHeadingContacts = document.createElement('td');
    tdHeadingContacts.className = 'table-line-heading';
    tdHeadingContacts.innerText = 'Контакты';
    const tdHeadingButtons = document.createElement('td');
    tdHeadingButtons.className = 'table-line-heading';
    tdHeadingButtons.innerText = 'Кнопки деиствия';
    table.append(thead);
    thead.append(trHead);
    trHead.append(tdHeadingId, tdHeadingName, tdHeadingCreateDate, tdHeadingUpdateDate, tdHeadingContacts, tdHeadingButtons)

    const tbody = document.createElement('tbody');
    tbody.className = 'table-content';
    table.append(tbody)

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
            if (item.type === 'Другое') {
                const spanContactOther = document.createElement('span');
                spanContactOther.setAttribute('tooltip', `${item.type}: ${item.value}`);
                spanContactOther.className = 'icon-contact other';
                contacts.append(spanContactOther)
            }
        } )
        const buttons = document.createElement('td');
        buttons.className = 'table-content-cell';
        const updateButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        updateButton.innerText = 'изменить';
        deleteButton.innerText = 'удалить';

        deleteButton.onclick = () => deleteContact(item.id);
        updateButton.onclick = () => getClient(item.id);

        buttons.append(updateButton, deleteButton);

        tbody.append(trBody)
        trBody.append(id, name, createDate, changeDate, contacts, buttons)
        changeDate.append(spanCreatedTime);
        createDate.append(spanUpdatedTime);
    })

    const buttonAddClient = document.createElement('button');
    buttonAddClient.innerText = 'добавить клиента';
    tableContainer.append(buttonAddClient)

    buttonAddClient.onclick = () => addClientModalRender();
}

