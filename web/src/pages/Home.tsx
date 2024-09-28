import { Button } from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import { FormEvent, useRef, useState } from 'react'
import {MessageCircle} from 'lucide-react'
import Chatbot from '@/components/Chatbot'

function Home() {
    const [category,setCategory]=useState('')
    const [isBtnDisable,setIsBtnDisable]=useState<boolean>(false)
    const ref=useRef<HTMLInputElement>(null)
    const [isChatOpen,setIsChatOpen]=useState<boolean>(false)

    const handleClick=(e:FormEvent<HTMLButtonElement>):void=>{
        e.preventDefault()
        setIsBtnDisable(true)
    }
    
    const toggleChat=():void=>{
        setIsChatOpen((prev:boolean)=>!prev)
    }
  return (
    
    <main className='h-screen w-full p-4 relative'>
        <div className="cat_input flex absolute top-4 left-4 gap-2">
                <Input 
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    ref={ref}
                    onChange={(e)=>setCategory(e.target.value)}
                />
                <Button type='submit' size={"sm"} onClick={handleClick} disabled={isBtnDisable}>Submit</Button>
        </div>
        {
            isChatOpen && (
                <iframe 
                    src='./chatbot.html'
                    className='fixed bottom-20 right-4 w-96 h-[500px] border border-gray-200 rounded-lg'
                    title='chatbot'
                />
            )}

        <Button 
            onClick={toggleChat}
            className="fixed bottom-4 right-4 w-12 h-12 rounded-full p-0"
        >
            <MessageCircle className='h-6 w-6'/>
        </Button>

        <Chatbot />
    </main>
  )
}

export default Home
