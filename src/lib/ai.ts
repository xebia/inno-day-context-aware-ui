"use server";

import "dotenv/config"
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai"
import { z } from "zod"
import path from "path";
import fs from "fs";
import { Entry } from "./types/Entry";

const oai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? undefined,
    organization: process.env.OPENAI_ORG_ID ?? undefined
})

const client = Instructor({
    client: oai,
    mode: "FUNCTIONS"
})

const entry = z.object({
    title: z.string(),
    content: z.string()
})


const entrySchema = z.object({
   entries: z.array(entry)
})



function loadJsonFile(filePath: string): any {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
}

async function requestContent(query: string = ""): Promise<Entry[]> {
    const data = loadJsonFile("data/data.json")
    const contentSelected = await client.chat.completions.create({
        messages: [{ role: "user", content: `This is your knowlege: ${JSON.stringify(data)}. Return the entries that best match the query: ${query}, in order of relevance.` }],
        model: "gpt-4o",
        response_model: {
            schema: entrySchema,
            name: "response"
        },
        max_retries: 3,
    })

    console.log(contentSelected)
    return contentSelected.entries
    // { age: 30, name: "Jason Liu" }
}

export default requestContent