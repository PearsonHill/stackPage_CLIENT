const isDev = true;

const DEV_HOST = 'http://localhost:8000';
const PROD_HOST = 'http://joose.azurewebsites.net'
const HOST = isDev ? DEV_HOST : PROD_HOST

import * as forge from './forge'
// const dayjs = require('dayjs')


function send({ method, path, data, token, mlb }) {	
	const fetch = process.browser ? window.fetch : require('node-fetch').default;
	const opts = { method, headers: {} };


	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['auth-x-token'] = `${token}`;
		
	}

	if (mlb) {
		console.log('line 27')
		opts.headers['Ocp-Apim-Subscription-Key'] = `${mlb}`;

		
	}





	//console.log('line 29', forge.encrypt(eData))


	// new end

		return fetch(`${HOST}/${path}`, opts)
		.then(r => r.text())
		.then(json => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});





}

export function get(path, token) {
	return send({ method: 'GET', path, token});
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}
