export const sortingClients = (clients, key, dir) => {
    console.log('сработала сортировка')
    if (key === 'id') {
        const copyClients = [...clients];
        const result = clients.sort((a,b) => {
            if (a[key].substr(7, 6) === b[key].substr(7, 6)) return 0;
            return a[key].substr(7, 6) > b[key].substr(7, 6) ? 1 : -1;
        })
        if (dir === 'desc') {
            return result.reverse();
        }
        return result;
    } else {
        const copyClients = [...clients];
        const result = copyClients.sort((a,b) => {
            if (a[key] === b[key]) return 0;
            return a[key] > b[key] ? 1 : -1;
        })
        if (dir === 'desc') {
            return result.reverse();
        }
        return result;
    }
}


// const tdHeadingId = document.createElement('td');
// tdHeadingId.className = 'table-line-heading';
// tdHeadingId.innerText = 'ID';
// tdHeadingId.onclick = () =>  dir === 'asc' ? sortParams('id','desc') : sortParams('id','asc')
// const tdHeadingIdDirSorting = document.createElement('span')
// tdHeadingIdDirSorting.innerText = 'убывание';
// if (key === 'id' && dir === 'asc') {
//     tdHeadingIdDirSorting.innerText = 'возрастание';
//     tdHeadingIdDirSorting.style.color = 'green';
// }
// if (key === 'id' && dir === 'desc') {
//     tdHeadingIdDirSorting.innerText = 'убывание'
//     tdHeadingIdDirSorting.style.color = 'green';
// }
// tdHeadingId.append(tdHeadingIdDirSorting)
//
// const tdHeadingName = document.createElement('td');
// tdHeadingName.className = 'table-line-heading';
// tdHeadingName.innerText = 'Фамилия Имя Отчество';
// tdHeadingName.onclick = () => dir === 'asc' ? sortParams('surname','desc') : sortParams('surname','asc')
// const tdHeadingNameDirSorting = document.createElement('span')
// tdHeadingNameDirSorting.innerText = 'убывание';
// if (key === 'surname' && dir === 'asc') {
//     tdHeadingNameDirSorting.innerText = 'возрастание'
//     tdHeadingNameDirSorting.style.color = 'green';
//     tdHeadingNameDirSorting.classList.toggle('test')
// }
// if (key === 'surname' && dir === 'desc') {
//     tdHeadingNameDirSorting.innerText = 'убывание'
//     tdHeadingNameDirSorting.style.color = 'green';
//     tdHeadingNameDirSorting.classList.toggle('test')
// }
// tdHeadingName.append(tdHeadingNameDirSorting)
//
// const tdHeadingCreateDate = document.createElement('td');
// tdHeadingCreateDate.className = 'table-line-heading';
// tdHeadingCreateDate.innerText = 'Дата создания';
// tdHeadingCreateDate.onclick = () => dir === 'asc' ? sortParams('createdAt','desc') : sortParams('createdAt','asc')
// const tdHeadingCreateDateDirSorting = document.createElement('span')
// tdHeadingCreateDateDirSorting.innerText = 'убывание';
// if (key === 'createdAt' && dir === 'asc') {
//     tdHeadingCreateDateDirSorting.innerText = 'возрастание'
//     tdHeadingCreateDateDirSorting.style.color = 'green';
// }
// if (key === 'createdAt' && dir === 'desc') {
//     tdHeadingCreateDateDirSorting.innerText = 'убывание'
//     tdHeadingCreateDateDirSorting.style.color = 'green';
// }
// tdHeadingCreateDate.append(tdHeadingCreateDateDirSorting)
//
// const tdHeadingUpdateDate = document.createElement('td');
// tdHeadingUpdateDate.className = 'table-line-heading';
// tdHeadingUpdateDate.innerText = 'Дата изменения';
// tdHeadingUpdateDate.onclick = () => dir === 'asc' ? sortParams('updatedAt','desc') : sortParams('updatedAt','asc')
// const tdHeadingUpdateDateDirSorting = document.createElement('span')
// tdHeadingUpdateDateDirSorting.innerText = 'убывание';
// if (key === 'updatedAt' && dir === 'asc') {
//     tdHeadingUpdateDateDirSorting.innerText = 'возрастание'
//     tdHeadingUpdateDateDirSorting.style.color = 'green';
// }
// if (key === 'updatedAt' && dir === 'desc') {
//     tdHeadingUpdateDateDirSorting.innerText = 'убывание'
//     tdHeadingUpdateDateDirSorting.style.color = 'green';
// }
// tdHeadingUpdateDate.append(tdHeadingUpdateDateDirSorting)
//
// const tdHeadingContacts = document.createElement('td');
// tdHeadingContacts.className = 'table-line-heading';
// tdHeadingContacts.innerText = 'Контакты';
// const tdHeadingButtons = document.createElement('td');
// tdHeadingButtons.className = 'table-line-heading';
// tdHeadingButtons.innerText = 'Кнопки деиствия';
// table.append(thead);
// thead.append(trHead);
// trHead.append(tdHeadingId, tdHeadingName, tdHeadingCreateDate, tdHeadingUpdateDate, tdHeadingContacts, tdHeadingButtons)