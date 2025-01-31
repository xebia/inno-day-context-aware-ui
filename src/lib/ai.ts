import "dotenv/config"
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai"
import { z } from "zod"
import fs from 'fs';
import path from 'path';
import { json } from "stream/consumers";

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

function loadJsonFile(filePath: string): any {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
}

async function main() {
    const data = loadJsonFile("data/data.json")
    const promt = "What are company trends in AI?"
    const user = await client.chat.completions.create({
        messages: [{ role: "user", content: `This is your knowlege: ${JSON.stringify(data)}. Based on the knowledge answer the following question: ${promt}. Output the text as is in the kowledge` }],
        model: "gpt-4o",
        response_model: {
            schema: responseSchema,
            name: "response"
        },
        max_retries: 3,
    })

    console.log(user)
    // { age: 30, name: "Jason Liu" }
}

main()