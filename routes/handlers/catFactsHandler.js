"use strict";

import fetch from "node-fetch";
import config from "../../config.js";
import model from "../../models/index.js";

const functions = {
  getListFromAPI: async function () {
    const path = "/facts";

    fetch(`${config.source.url}${path}`, {
      compress: true,
      timeout: 60e3, // 60s timeout as default
      follow: 0,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};

export default functions;
