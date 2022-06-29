export const sortingClients = (clients, key, dir) => {
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
