import DashboardClient from '@/components/DashboardClient'
import { getSession } from '@/lib/getSession'
import session from '@scalekit-sdk/node/lib/session'
import React from 'react'
  
 

async function page(){
    const session=await getSession()

  
  return (
    <> 
      <DashboardClient ownerId={session?.user?.id!}/>

    </>
  )
}

export default page