# Xebia XK-AI
Our APP is designed to look at datasets in the data.json file and reason about it specifically. The idea is that instead of browsing a whole website for something you're looking for specifically, you can ask via chat what it is you're looking for.

## Installation
```bash
npm i
```
Create a .env file in the root of this directory and add your OpenAI key to:
``
OPENAI_API_KEY=#your_key_here
``

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage 

### Add Data
To add or change the base data set, replace or make changes to:
 ``data\data.json`` file

### Question
Interact with the search field to get answers about your data.json file


## Future Improvements
Using an RAG to ingest entire websites, at regular intervals we could create a concise knowledge base about what ever website we would like to reason about. Currently it uses the data.json, but we could create our own LLM that is specific to our needs and connect to that instead.

You could use this for your own wesbite to provide a solid question bot that knows about the entire website.