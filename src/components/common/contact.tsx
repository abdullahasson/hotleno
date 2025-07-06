"use client"

// React
import { useState } from "react"
// Icons
import {
    MessageCircle
} from "lucide-react"

const Contact = () => {

    const [show, setShow] = useState(false)

    return (
        <>
            <button onClick={() => setShow(!show)} className="bg-green-400 text-white font-bold flex items-center justify-center rounded-full fixed bottom-6 right-6 w-14 h-14 cursor-pointer">
                <MessageCircle />
            </button>

            <div className={`rounded-xl fixed bottom-20 left-20 flex-col overflow-hidden ${show ? "flex" : "hidden"}`}>
                <div className="flex-1 bg-linear-0 from-blue-400 to-blue-600">
                    <h1>مرحبا</h1>
                    <p>كيف يمكنني مساعدتك</p>
                </div>

                <form action="">
                </form>
            </div>
        </>
    )
}

export default Contact;