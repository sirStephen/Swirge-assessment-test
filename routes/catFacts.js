"use strict";

import { Router } from "express";
import handler from "./handlers/catFactsHandler.js";

const router = Router();

router.get("/fromSource", async (req, res, next) => {
  // Call handler to response with data
  try {
    const result = await handler.getListFromAPI();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// add other routes

export default router;
