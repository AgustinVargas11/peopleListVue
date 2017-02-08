import request from './request';

export default class Form {
    constructor(data) {
        for (let field in data) {
            this[field] = data[field];
        }
    }

    post(url, data) {
        return request('post', url, data);
    }

    reset() {
        for (let field in this) {
            this[field] = '';
        }
    }
}
