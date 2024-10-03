"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const category_controller_1 = require("../controllers/category.controller");
router.post('/category', category_controller_1.postCat);
exports.default = router;
//# sourceMappingURL=category.route.js.map