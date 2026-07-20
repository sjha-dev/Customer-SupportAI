import { NextRequest, NextResponse } from "next/server";
import Description from "@/model/des.model";
import { GoogleGenAI } from "@google/genai";
import connectDB from "@/lib/db";


export async function POST(req:NextRequest) {

    try{
        const {message , ownerId} = await req.json();
        if (!message || !ownerId) {
            return NextResponse.json({ message: "Missing message or ownerId" }, { status: 400 });
        }

        await connectDB();

        const description = await Description.findOne({ ownerId });
        if (!description) {
            return NextResponse.json({ message: "Description not found" }, { status: 404 });
        }


        const KNOWLEDGE = `
        business name - ${description.BusinessName || "not provided"}
        support email - ${description.supportEmail || "not provided"}
        knowledge - ${description.knowledgeBase || "not provided"}
    
        `;


        const prompt = `You are an AI Customer Support Assistant.

Your responsibilities are:

- Answer ONLY using the information provided below.
- Never make up facts, policies, prices, features, or promises.
- If the answer is not present in the provided information, reply exactly:

"I don't have that information. Please contact customer support."

Official Business Information are : 

Business Name:
${description.BusinessName}

Official Support Email:
${description.supportEmail}

------------------------

Additional Knowledge:

${description.knowledgeBase}

Guidelines:

1. Be polite and professional.
2. Keep answers concise but complete.
3. Rephrase the information naturally.
4. Do not mention that you are using a knowledge base.
5. Do not hallucinate.
6. If multiple answers exist, choose the most relevant one.
7. If the user greets you, greet them back politely.
8. If the question is unrelated to the business, politely refuse.

-------------------------
BUSINESS INFORMATION    
-------------------------

${KNOWLEDGE}

-------------------------
CUSTOMER QUESTION
-------------------------

${message}

-------------------------
ANSWER
-------------------------




`;

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY });
const response = await ai.interactions.create({
  model: "gemini-2.5-flash",
  input: prompt,
})

return NextResponse.json(response.output_text)


    } catch (error) {
        return NextResponse.json(
            {message:` get Description error ${error}`},
            {status:500}
        )

    }
    
}