'use client'
import { motion } from "motion/react"
import { useRouter } from "next/dist/client/components/navigation"
import React, { useEffect, useState } from 'react'
import axios from "axios"



function DashboardClient({ ownerId }: { ownerId: string }) {

    const navigate = useRouter()
    const [businessName, setBusinessName] = useState("")
    const [supportEmail, setSupportEmail] = useState("")
    const [knowledgeBase, setKnowledgeBase] = useState("")
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)


    const handleSettings = async () => {
        setLoading(true)

        try {

            const result = await axios.post("/api/Description", { ownerId, businessName, supportEmail, knowledgeBase })
            console.log(result)
            setLoading(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (ownerId) {
            const handleGetDetails = async () => {
                try {

                    const result = await axios.post("/api/Description/get", { ownerId })
                    setBusinessName(result.data?.businessName ?? "")
                    setSupportEmail(result.data?.supportEmail ?? "")
                    setKnowledgeBase(result.data?.knowledgeBase ?? "")
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }


            }
            handleGetDetails()
        }
    }, [ownerId])

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

            <div className='flex justify-center px-4 py-14 mt-20'>
                <motion.div
                    className='w-full max-w-3xl bg-white rounded-2xl shdow-xl p-10'

                >
                    <div className='mb-12'>
                        <h1 className='text-2xl font-semibold'> Chat Assistant Settings</h1>
                        <p className='text-zinc-500 mt-1'>Manage your AI chat assistant knowledge and business details</p>
                    </div>

                    <div className='mb-10'>
                        <h1 className='text-lg font-medium mb-4'>Business Details </h1>
                        <div className='space-y-4'>
                            <input type="text" className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                            <input type="text" className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' placeholder="Support Email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />

                        </div>

                    </div>

                    <div className='mb-10'>
                        <h1 className='text-lg font-medium mb-4'>Knowledge Base </h1>
                        <p className='text-sm text-zinc-500 mb-4'> Add FAQ'S , Policies , delivery info , refunds , etc..</p>
                        <div className='space-y-4'>
                            <textarea
                                className="w-full h-54 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                                placeholder={`Knowledge Base Example:

                                    • Refund Policy: 7-day returns available
                                    • Delivery Time: 2–3 working days
                                    • Cash on Delivery: Available
                                    • Support Hours: Monday–Saturday, 9:00 AM – 6:00 PM
                                    • Contact: support@example.com
                                    • Shipping Charges: Free on orders above ₹499`}
                                onChange={(e) => setKnowledgeBase(e.target.value)} value={knowledgeBase}
                            />
                        </div>

                    </div>

                    <div className='flex items-center gap-5'>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSettings}
                            className='px-6 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-black/80 transition disabled:opacity-60'
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}

                        </motion.button>
                        {saved && (
                            <motion.span
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className='text-emerald-500 text-sm font-medium'
                            >
                                ✓ Knowledge Base saved successfully
                            </motion.span>
                        )}

                    </div>


                </motion.div>


            </div>
        </div>
    )
}

export default DashboardClient