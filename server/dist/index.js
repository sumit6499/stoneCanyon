"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true, limit: "30mb" }));
app.use(express_1.default.json({ limit: '30mb' }));
//routes
app.use('/api', category_route_1.default);
app.get('/', (req, res) => {
    res.json({
        success: true,
        msg: "Hello from chatbot server"
    });
});
app.listen(PORT, () => {
    console.log(`server running on ${HOST}:${PORT}`);
});
//# sourceMappingURL=index.js.map