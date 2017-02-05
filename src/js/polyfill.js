import fetchPolyfill from 'whatwg-fetch';

if (!window.fetch) {
    window.fetch = fetchPolyfill;
}