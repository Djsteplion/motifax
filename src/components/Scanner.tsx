'use client'

import { useChat } from '@ai-sdk/react'
import { useState, ChangeEvent } from 'react'
import { Camera, Loader2, RotateCcw } from 'lucide-react'
import Image from 'next/image'

export default function Scanner() {
  const [preview, setPreview] = useState<string | null>(null)
  
  // We add 'setMessages' to manually clear the history
  const { messages, sendMessage, status, setMessages } = useChat()
  const isLoading = status === 'submitted' || status === 'streaming'

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 1. CLEAR PREVIOUS STATE: Remove old messages and preview
    setMessages([]) 
    
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setPreview(base64)
      
      sendMessage({
        text: 'Identify the design DNA of this image.',
        files: [{ type: 'file', url: base64, mediaType: file.type }]
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Upload Box */}
      <div className="relative group flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-3xl bg-white hover:border-black transition-all cursor-pointer min-h-[300px]">
        {preview ? (
          <div className="relative w-full h-64">
            <Image src={preview} alt="Scan" fill className="object-contain rounded-2xl" unoptimized />
            {/* Overlay to hint at re-uploading */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
              <p className="text-white font-bold flex items-center gap-2">
                <RotateCcw size={20} /> REPLACE IMAGE
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-black text-white p-4 rounded-full mb-4"><Camera size={32} /></div>
            <p className="font-semibold text-lg">Click to scan design</p>
          </div>
        )}
        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 italic">
          <Loader2 className="animate-spin" size={20} />
          Decoding Design DNA...
        </div>
      )}

      {/* Results Display */}
      {messages.filter(m => m.role === 'assistant').map((m) => (
        <div key={m.id} className="mt-8 p-8 bg-white border border-gray-200 rounded-3xl text-left shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black">Motifax Analysis Report</h4>
            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-mono text-gray-500">v1.0.4</span>
          </div>

          <div className="text-gray-800 leading-relaxed space-y-4">
            <div className="prose-sm prose-headings:text-black prose-strong:text-black prose-strong:font-bold">
              {/* SAFELY MAPS OVER PARTS AND CONCATENATES TEXT */}
              <span className="block whitespace-pre-wrap">
                {m.parts
                  ? m.parts
                      .filter(part => part.type === 'text')
                      .map(part => part.text)
                      .join('')
                  : '' // Fallback if parts is somehow undefined
                }
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}