"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withMessageHistory = exports.chain = exports.promptTemplate = exports.loadDocument = exports.model = void 0;
const openai_1 = require("@langchain/openai");
const csv_1 = require("@langchain/community/document_loaders/fs/csv");
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const prompts_1 = require("@langchain/core/prompts");
const chat_history_1 = require("@langchain/core/chat_history");
const runnables_1 = require("@langchain/core/runnables");
dotenv_1.default.config();
exports.model = new openai_1.ChatOpenAI({
    model: 'gpt-4',
    temperature: 0.7,
});
// Initialize message history storage
const messageHistories = {};
// Load CSV document
const docPath = node_path_1.default.resolve(__dirname, 'corrected_final_home_improvement_services.csv');
const loadDocument = () => __awaiter(void 0, void 0, void 0, function* () {
    const loader = new csv_1.CSVLoader(docPath);
    const docs = yield loader.load();
    return docs;
});
exports.loadDocument = loadDocument;
// Define the system prompt
const systemPrompt = `You are a helpful assistant. Your goal is to guide the user through questions to identify the correct service code from the CSV. Based on the user's input, dynamically find the relevant questions and provide the available options.`;
// Define the prompt template for the chat interaction
exports.promptTemplate = prompts_1.ChatPromptTemplate.fromMessages([
    new prompts_1.SystemMessagePromptTemplate(systemPrompt), // Static system message
    new prompts_1.HumanMessagePromptTemplate("{input}"), // Human input
    new prompts_1.SystemMessagePromptTemplate("{chat_history}"), // Chat history
    new prompts_1.SystemMessagePromptTemplate("{context}") // Context from CSV
]);
// Combine prompt template with the model
exports.chain = exports.promptTemplate.pipe(exports.model);
// Runnable with message history
exports.withMessageHistory = new runnables_1.RunnableWithMessageHistory({
    runnable: exports.chain,
    getMessageHistory: (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
        if (messageHistories[sessionId] === undefined) {
            messageHistories[sessionId] = new chat_history_1.InMemoryChatMessageHistory();
        }
        return messageHistories[sessionId];
    }),
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
});
//# sourceMappingURL=langchain.service.js.map