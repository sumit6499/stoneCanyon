"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangChain = void 0;
const openai_1 = require("@langchain/openai");
class LangChain {
    constructor(params) {
        this.model = new openai_1.ChatOpenAI(params);
    }
    getModel() {
        return this.model;
    }
}
exports.LangChain = LangChain;
//# sourceMappingURL=langChain.config.js.map