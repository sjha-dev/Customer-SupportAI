import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Description from "@/model/des.model";


export async function POST(req: NextRequest) {
    try {

        const { ownerId } = await req.json()
        if (!ownerId) {
            return NextResponse.json(
                { message: "ownerId is required" },
                { status: 400 }
            )
        }
        await connectDB()
        const description = await Description.findOne(
            { ownerId }
        )
        return NextResponse.json(description)



    } catch (error) {

        return NextResponse.json(
            {message:` get Description error ${error}`},
            {status:500}
        )

    }
}