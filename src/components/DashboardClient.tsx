'use client'
import { motion } from "motion/react"
import { useRouter } from "next/dist/client/components/navigation"
import React from 'react'


function DashboardClient({ ownerId }: { ownerId: string }) {

    const navigate = useRouter()
    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-900'>

            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 ">

                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-lg font-semibold tracking-tight" onClick={() => navigate.push("/")}>Support<span className="text-blue-700">Ai</span></div>
                    <button className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition'> Embed Chat Assistant</button>
                    


                </div>
            </motion.div>
        </div>
    )
}

export default DashboardClient