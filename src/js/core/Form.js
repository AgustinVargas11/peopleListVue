export default class Form {
    constructor(data) {
        for (let field in data) {
            this[field] = data[field];
        }
    }

    get(url) {
        return this.submit('get', url);
    }

    post(url, data) {
        return this.submit('post', url, data);
    }

    delete(url) {
        return this.submit('delete', url);
    }

    update(url, data) {
        return this.submit('put', url, data);
    }

    submit(method, url, data = null) {
        let requestObj = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: method
        };

        if (data) {
            requestObj.body = JSON.stringify(data);
        }

        return new Promise((resolve, reject) => {
            fetch(url, requestObj)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    reject(response);
                })
                .then(person => {
                    resolve(person)
                })
        })
    }

    reset() {
        for (let field in this) {
            this[field] = '';
        }
    }
}
