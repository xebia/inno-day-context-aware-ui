import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ContentAware } from "@/components/content-aware/content-aware";
import { BrainCircuit } from "lucide-react";



export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold text-center">Welcome to Xebia X-AI</h1>
        <BrainCircuit size={64} color="#6a1d57" />
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ContentAware />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          rel="noopener noreferrer"
        >
          <ModeToggle />
        </div>
      </footer>
    </div>
  );
}
