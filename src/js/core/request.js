export default function request(method, url, data = null) {
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
                if (response.ok) {
                    return response.json();
                }
                reject(response);
            })
            .then(person => {
                resolve(person)
            })
    })
};