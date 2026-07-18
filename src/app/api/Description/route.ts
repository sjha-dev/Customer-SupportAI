import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Description from "@/model/des.model";


export async function POST(req:NextRequest){
    try{
        const {ownerId,BusinessName,supportEmail,knowledgeBase} = await req.json()
        if(!ownerId){
            return NextResponse.json(
                {message:"ownerId is required"},
                {status:400}             
            )
        }
        await connectDB()
        const description= await Description.findOneAndUpdate(
            {ownerId},
            {ownerId,BusinessName,supportEmail,knowledgeBase},
            {new:true,upsert:true}
        )
        return NextResponse.json(description,{status:200})

    } catch(error){
        return NextResponse.json(
            {message:`Description error ${error}`},
            {status:500}
        )
    }
}
