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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const langchain_service_1 = require("../service/langchain.service");
const initSocketService = () => {
    index_1.io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);
        socket.on('msg', (msg) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('message incoming');
            try {
                const humanMsg = msg[msg.length - 1];
                console.log(humanMsg.content);
                const documentData = yield (0, langchain_service_1.loadDocument)();
                const systemPrompt = `You are a chatbot that helps users find home improvement services based on their input. 
        You have access to a table of services in CSV format. Based on the user’s category selection, 
        dynamically find relevant questions to ask and options to provide. 
        Your goal is to guide the user through the questions to identify a service code, 
        then collect personal information such as name, email, zip code, and phone number.`;
                const res = yield langchain_service_1.promptTemplate.invoke({
                    system_prompt: `${systemPrompt} Based on the input, ask the next question from the document, and extract options that are after '>' symbol.`,
                    chat_history: msg,
                    context: documentData,
                });
                socket.emit('receive-msg', {
                    role: 'bot',
                    content: res,
                });
            }
            catch (error) {
                console.log('Error in processing message:', error);
            }
        }));
        socket.on('disconnect', () => {
            console.log('socket disconnected');
        });
    });
};
exports.default = initSocketService;
//# sourceMappingURL=socket.service.js.map