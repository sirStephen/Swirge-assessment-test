"use strict";

import fetch from "node-fetch";
import config from "../../config.js";

const functions = {
	getListFromAPI: async function () {
		// get 5 cat facts
		const path = "/facts?amount=5";

		const response = await fetch(`${config.source.url}${path}`, {
			//method of request
			method: 'GET',
			compress: true,
			// timeout: 60e3, // 60s timeout as default
			follow: 0,
			headers: {
				"content-type": "application/json",
			},
		});

		const data = await response.json()
		return data;
	}
};

export default functions;
