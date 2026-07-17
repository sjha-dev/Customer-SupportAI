'use client'
import React, { use, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import axios from 'axios'
import { div } from 'framer-motion/client'



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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  const features = [{
    title: "Plug and Play",
    description: "Easily integrate SupportAi into your website with our simple setup process. No coding required."
  },
  {
    title: "Admin Controlled",
    description: "You control exactly what the AI knows and answers."
  },
  {
    title: "24/7 Support",
    description: "SupportAi is available around the clock, ensuring your customers receive assistance whenever they need it."
  }
  ]

  const handleLogout = async () => {
    try {

      const result = await axios.get("/api/auth/logout")
      window.location.href = "/"
      
      } catch(error){
        console.log(error)
      }
  }  


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
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}


                  className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden">

                  <button className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-100'>Dashboard</button>
                  <button className='block px-4 py-3 text-sm text-red-600 hover:bg-zinc-100'onClick={handleLogout}>Logout</button>

                </motion.div>
              )}

            </AnimatePresence>


          </div> :
            <button className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2 " onClick={handleLogin}>Login

            </button>



          }


        </div>



      </motion.div>


      <section className='pt-36 pb-28 px-6'>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className='text-4xl md:text-5xl font-semibold tracking-tight'>
              AI Customer Support <br />
              Built for Modern Websites
            </h1>

            <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
              Add a powerful AI chatbot to your website in minutes.
              Let your customers get instant answers using your own buisness knowledge.
            </p>

            <div className="mt-10 flex gap-4">

              {email ? <button className="px-6 py-3 bg-green-500 text-black rounded-xl font-bold font-
               hover:bg-green-600 transition">Go to Dashboard</button> :
                <button className="px-6 py-3 bg-black text-white rounded-full font-medium
                hover:bg-zinc-600 transition" onClick={handleLogin}>Get Started</button>}

              <a href="#features" className="px-6 py-3 bg-white text-black border border-zinc-300 rounded-full font-medium hover:bg-zinc-100 transition">Learn More</a>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >

            <div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>

              <div className='text-sm text-zinc-500 mb-3'>Live Chat Preview</div>
              <div className='space-y-5'>
                <div className='bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit'>Do you offer 24/7 support?</div>
                <div className='bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit '>yes, we offer 24/7 support!</div>

              </div>
              <motion.div

                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className='absolute -bottom-6 -right-6 
              w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl'

              >

                💬

              </motion.div>


            </div>


          </motion.div>

        </div>

      </section>

      <section id="features"
        className="bg-zinc-50 py-28 px-6 border-t border-zinc-200"


      >

        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className='text-3xl font-semibold text-center'

          >
            Why businesses <span className="text-red-500">choose</span> SupportAi
          </motion.h2>


          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className='bg-white rounded-2xl p-8 shadow-lg border border-zinc-200'

              >
                <h1 className='text-lg font-semibold'>{feature.title}</h1>
                <p className='mt-3 text-zinc-600 text-sm'>{feature.description}</p>

              </motion.div>))}


          </div>

        </div>

      </section>

      <footer className="bg-zinc-100 py-10 text-center text-sm text-zinc-400 border-t border-zinc-200">
        &copy; {new Date().getFullYear()} SupportAi. All rights reserved.
      </footer>


    </div>
  )
}

export default HomeClient