"use server";

import "dotenv/config"
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai"
import { z } from "zod"
import path from "path";
import fs from "fs";
import { Document } from "./types/Document";

const oai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? undefined,
    organization: process.env.OPENAI_ORG_ID ?? undefined
})

const client = Instructor({
    client: oai,
    mode: "FUNCTIONS"
})

const document = z.object({
    heading: z.string().describe("heading"),
    description: z.string().describe("description")
})

const documentSchema = z.object({
   documents: z.array(document).describe("A list of documents containing heading and description")
})

function loadJsonFile(filePath: string): any {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
}

async function requestContent(query: string = ""): Promise<Document[]> {
    const data = loadJsonFile("data/data.json")
    const contentSelected = await client.chat.completions.create({
        messages: [{ role: "user", content: `This is your knowledge: ${JSON.stringify(data)}. Answer the question: ${query} from your knowledge base. Return multiple documents, by splitting each section into the required formating. If you cannot find any matching information, return heading: Nothing found and a desscription saying "Cannot find any matching information about 'query'.` }],
        model: "gpt-4o",
        response_model: {
            schema: documentSchema,
            name: "response"
        },
        max_retries: 3,
    })

    console.log(contentSelected)
    return contentSelected.documents
}

export default requestContent