'use client'
import React, { use, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"



function HomeClient({ email }: { email: string }) {
  const handleLogin = () => {
    window.location.href = "/api/auth/login"
  }

  const firstLetter = email?.charAt(0)?.toUpperCase()
  const [open, setOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return ()=> document.removeEventListener("mousedown", handleClickOutside);
  },[])
    
  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}



        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 ">

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">Support<span className="text-blue-700">Ai</span></div>
          {email ? <div className="relative" ref={popupRef}>
            <button className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition' onClick={() => setOpen(!open)}>
              {firstLetter} </button>

            <AnimatePresence>
            {open && (
              <motion.div
              initial={{opacity: 0, scale: 0.95, y: -10}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.95, y: -10}}

              
              className ="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden">

                <button className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-100'>Dashboard</button>
                <button className='block px-4 py-3 text-sm text-red-600 hover:bg-zinc-100'>Logout</button>

              </motion.div>
            )}

             </AnimatePresence>  


          </div> :
            <button className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2 " onClick={handleLogin}>Login

            </button>



          }


        </div>



      </motion.div>


      <section className ='pt-36 pb-28 px-6'>
        <div className="max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 gap-20 items-center">

          <motion.div 
          initial={{opacity:0, y:40}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.7}}
          >
            <h1 className='text-4xl md:text-5xl font-semibold tracking-tight'>
              AI Customer Support <br/>
              Built for Modern Websites
            </h1>

            <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
              Add a powerful AI chatbot to your website in minutes.
              Let your customers get instant answers using your own buisness knowledge.
            </p>

          </motion.div>

          <div className="div">

          </div>

        </div>

      </section>


    </div>
  )
}

export default HomeClient