"use strict";

import { Router } from "express";

// Import routes
import catRoutes from "./catfactsRouter.js";

const router = Router({
    caseSensitive: true,
});

// use imported routes in router
router.use(catRoutes);

export default router;
