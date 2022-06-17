
export class Api {

    static get(url) {
        return this.makeRequest('GET', url);
    }

    static post(url, data) {
        return this.makeRequest('POST', url, data);
    }

    static async patch(url, data) {
        return this.makeRequest('PATCH', url, data);
    }

    static async delete(url, data) {
        return this.makeRequest('DELETE', url, data);
    }

    static async makeRequest(method, url, data) {
        try {
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}
