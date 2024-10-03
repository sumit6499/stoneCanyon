import { ChatOpenAI } from '@langchain/openai';
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv';
import dotenv from 'dotenv';
import path from 'node:path';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

dotenv.config();

export const model = new ChatOpenAI({
  model: 'gpt-4', 
  temperature: 0.7,
});

// Initialize message history storage
const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

// Load CSV document
const docPath = path.resolve(__dirname, 'corrected_final_home_improvement_services.csv');
export const loadDocument = async () => {
  const loader = new CSVLoader(docPath);
  const docs = await loader.load();
  return docs;
};

// Define the system prompt
const systemPrompt = `You are a helpful assistant. Your goal is to guide the user through questions to identify the correct service code from the CSV. Based on the user's input, dynamically find the relevant questions and provide the available options.`;

// Define the prompt template for the chat interaction
export const promptTemplate = ChatPromptTemplate.fromMessages([
  new SystemMessagePromptTemplate(systemPrompt), // Static system message
  new HumanMessagePromptTemplate("{input}"),     // Human input
  new SystemMessagePromptTemplate("{chat_history}"),  // Chat history
  new SystemMessagePromptTemplate("{context}")  // Context from CSV
]);

// Combine prompt template with the model
export const chain = promptTemplate.pipe(model);

// Runnable with message history
export const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});
