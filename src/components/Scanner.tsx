"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { Camera, Loader2, RotateCcw } from "lucide-react"
import Image from "next/image"
import { analyzeMotif } from "../app/motifaxAI"
import { usePostHog } from "@posthog/react";

interface ScannerProps {
  darkMode: boolean
}

export default function Scanner({ darkMode }: ScannerProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const posthog = usePostHog();

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    setError("")
    setResult("")
    setPreview(null)
    setIsLoading(true)

    // Basic file validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.")
      setIsLoading(false)
      return
    }

    // 2MB maximum
    if (file.size > 2 * 1024 * 1024) {
      setError("Please choose an image smaller than 2MB.")
      setIsLoading(false)
      return
    }

    const reader = new FileReader()

    reader.onloadend = async () => {
      const base64 = reader.result as string

      setPreview(base64)

      try {
        posthog.capture("motif_scan_started");
        const analysis = await analyzeMotif(base64)

        setResult(
          typeof analysis === "string"
            ? analysis
            : JSON.stringify(analysis, null, 2)
        )
        posthog.capture("motif_scan_completed");
      } catch (error) {
        console.error("Motifax AI error:", error)

        setError(
          "Unable to analyze this image. Please try again."
        )
        posthog.capture("motif_scan_failed");
      } finally {
        setIsLoading(false)
      }
    }

    reader.onerror = () => {
      setError("Unable to read this image. Please try another file.")
      setIsLoading(false)
    }

    reader.readAsDataURL(file)
  }

  const handleReplaceImage = () => {
    fileInputRef.current?.click()
  }

  return (
    <section
      id="scanner"
      aria-labelledby="scanner-heading"
      className="max-w-xl mx-auto"
    >
      <h3 id="scanner-heading" className="sr-only">
        Motif image scanner
      </h3>

      {/* Upload Area */}
      <div
        className={`
          relative group flex flex-col items-center justify-center
          p-12 border-2 border-dashed rounded-3xl
          min-h-[300px] transition-all
          border-gray-500 dark:border-gray-700
          hover:border-blue-600 dark:hover:border-white
          focus-within:border-black dark:
           ${darkMode ?   "bg-[#111111] focus-within:border-white" : "bg-white border-gray-500 hover:border-blue-600"}
        `}
      >
        {preview ? (
          <div className="relative w-full h-64">
            <Image
              src={preview}
              alt="Preview of the uploaded motif or design"
              fill
              className="object-contain rounded-2xl"
              unoptimized
            />

            {/* Replace Image Button */}
            <button
              type="button"
              onClick={handleReplaceImage}
              disabled={isLoading}
              className="
                absolute inset-0 flex items-center justify-center
                rounded-2xl bg-black/50 opacity-0
                group-hover:opacity-100
                focus:opacity-100
                transition-opacity
                focus:outline-none
                focus-visible:ring-4
                focus-visible:ring-white/70
                disabled:cursor-not-allowed
              "
              aria-label="Replace uploaded image"
            >
              <span className="flex items-center gap-2 text-white font-bold">
                <RotateCcw size={20} aria-hidden="true" />
                Replace image
              </span>
            </button>
          </div>
        ) : (
          <label
            htmlFor="motif-image-upload"
            className="
              flex flex-col items-center
              cursor-pointer text-center
              focus-within:outline-none
            "
          >
            <span
              className="
                bg-black dark:bg-white
                text-white dark:text-black
                p-4 rounded-full mb-4
              "
              aria-hidden="true"
            >
              <Camera size={32} aria-hidden="true"/>
            </span>

            <span className={`font-semibold text-lg  ${darkMode ? "text-white" : "text-black"}`}>
              Upload a design to analyze
            </span>

            <span className={`mt-2 text-sm  ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              JPG, PNG, WEBP or GIF · Max 2MB
            </span>

            <span className={`mt-4 text-xs  ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Click to choose an image
            </span>
          </label>
        )}

        <input
          ref={fileInputRef}
          id="motif-image-upload"
          name="motif-image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={isLoading}
          className="
            absolute inset-0
            h-full w-full
            cursor-pointer
            opacity-0
            disabled:cursor-not-allowed
          "
          aria-label="Upload an image for motif analysis"
        />
      </div>

      {/* Accessibility instructions */}
      <p
        id="scanner-help"
        className={`mt-3 text-center text-xs md:text-[13px]    ${darkMode ? "text-gray-400" : "text-[#353535]"}`}
      >
        Upload an image of a motif, pattern, textile, artwork, or
        architectural detail for AI analysis.
      </p>

      {/* Loading State */}
      {isLoading && (
        <div
          className="mt-8 flex items-center justify-center gap-2 text-gray-500"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2
            className="animate-spin"
            size={20}
            aria-hidden="true"
          />

          <span>Decoding Design DNA...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="
            mt-6 rounded-2xl border
            border-red-200 dark:border-red-900
            bg-red-50 dark:bg-red-950/30
            p-4 text-sm text-red-700 dark:text-red-300
          "
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Results */}
      {result && !isLoading && (
        <article
          className={`mt-8 p-8 rounded-3xl text-left shadow-xl animate-in fade-in slide-in-from-bottom-4 ${
            darkMode
              ? "bg-[#111111] border border-gray-800 text-gray-200"
              : "bg-white border border-gray-200 text-gray-800"
          }`}
          aria-labelledby="analysis-heading"
        >
          <header
            className={`flex items-center justify-between mb-6 pb-4 border-b ${
              darkMode ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <h4
              id="analysis-heading"
              className={`text-xs font-black uppercase tracking-[0.2em] ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Motifax Analysis Report
            </h4>

            <span
              className={`text-[10px] px-2 py-1 rounded font-mono ${
                darkMode
                  ? "bg-gray-800 text-gray-400"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              v1.0.4
            </span>
          </header>

          <div
            className={`leading-relaxed ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <div className="text-sm">
              <span className="block whitespace-pre-wrap">
                {result}
              </span>
            </div>
          </div>
        </article>
      )}
    </section>
  )
}