import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";

interface Options{
    model:string,
    temperature:number
}

export class LangChain {
    private readonly model:ChatOpenAI<ChatOpenAICallOptions>

    constructor(params:Options){
        this.model =new ChatOpenAI(params)
    }

    getModel():ChatOpenAI<ChatOpenAICallOptions> {
        return this.model
    }
    
    
}