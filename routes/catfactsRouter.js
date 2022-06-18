"use strict";

import { Router } from "express";
import catfactsController from "../controllers/catfactsController.js";

const router = Router();

// add cat facts route
router.post('/addcatfacts', catfactsController.addCatFacts);

// get all cat facts route
router.get('/allcatfacts', catfactsController.getAllCatfacts);

// get one cat fact route
router.get('/onecatfact/:id', catfactsController.getOneCatfacts);

// update cat fact route
router.put('/updatecatfact/:id', catfactsController.updateCatfact);

// delete cat fact route
router.delete('/deletecatfact/:id', catfactsController.deleteCatfact);

export default router;
