import {OpenAI} from '@langchain/openai'

const model =new OpenAI({
    model:'gpt-4o-mini',
    temperature:0.3,
})