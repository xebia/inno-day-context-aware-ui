"use server";

import "dotenv/config"
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai"
import { z } from "zod"

const oai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? undefined,
    organization: process.env.OPENAI_ORG_ID ?? undefined
})

const client = Instructor({
    client: oai,
    mode: "FUNCTIONS"
})

const UserSchema = z.object({
    // Description will be used in the prompt
    age: z.number().describe("The age of the user"),
    name: z.string().describe("The name of the user")
})

const responseSchema = z.object({
    components: z.array(z.string()).describe("The list of components names")
})

async function requestContent(query: string = ""): Promise<string[]> {
    const contentSelected = await client.chat.completions.create({
        messages: [{ role: "user", content: `Here is the list of available components: [company_values, customer_cases, about]. Select 2 , based on the query string: ${query}` }],
        model: "gpt-4o",
        response_model: {
            schema: responseSchema,
            name: "response"
        },
        max_retries: 3,
    })

    console.log(contentSelected)
    return contentSelected.components
    // { age: 30, name: "Jason Liu" }
}

export default requestContent