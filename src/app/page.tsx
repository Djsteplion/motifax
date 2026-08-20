"use client"

import { useState } from "react"
import {
  ScanSearch,
  History,
  Library,
  ShieldCheck,
  Info,
  Sun,
  Moon,
} from "lucide-react"

import Scanner from "@/components/Scanner"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#0a0a0a] text-[#ededed]"
          : "bg-[#fafafa] text-[#1a1a1a]"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`flex items-center justify-between px-8 py-6 border-b sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
          darkMode
            ? "border-gray-800 bg-black/80"
            : "border-gray-200 bg-white/80"
        }`}
      >
        <h1 className="text-2xl font-bold tracking-tighter italic">
          Motifax
        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => {
                const scanner = document.getElementById("scanner")

                scanner?.scrollIntoView({
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                  block: "start",
                })
              }}
            className="hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Explore
          </button>

          {/*<a href="#" className="hover:opacity-60 transition-opacity">
            Archive
          </a>*/}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
              darkMode
                ? "border-gray-700 bg-gray-900 hover:bg-gray-800"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto pt-24 px-6 text-center">
        <div  aria-labelledby="hero-heading" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black dark:bg-white dark:text-black text-white text-xs font-semibold mb-6 shadow-md">
          <ScanSearch size={14} aria-hidden="true" />
          <h1 id="hero-heading">AI-POWERED MOTIF ANALYSIS</h1>
        </div>

        <h2 className="text-6xl font-medium tracking-tight mb-6">
          Discover the story <br />
          <span className="text-gray-400 italic font-serif">
            behind every motif.
          </span>
        </h2>

        <p
          className={`text-lg max-w-xl mx-auto mb-12 leading-relaxed ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Analyze patterns, motifs, and visual traditions to uncover their
          symbolism, cultural context, history, and visual DNA.
        </p>

        <Scanner darkMode={darkMode}/>

        {/* Authentication Notice */}
        <div className="max-w-xl mx-auto mt-6 text-left">
          <div
            className={`rounded-2xl border p-5 shadow-sm transition-colors ${
              darkMode
                ? "border-gray-800 bg-[#111111]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <ShieldCheck
                  size={18}
                  className={darkMode ? "text-gray-300" : "text-gray-700"}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Secure AI Analysis
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Motifax uses{" "}
                  <span
                    className={`font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Puter
                  </span>{" "}
                  to securely process AI analysis. You may be asked to
                  authenticate with Puter before your first analysis.
                </p>
              </div>
            </div>

            <details
              className={`group mt-4 border-t pt-3 ${
                darkMode ? "border-gray-800" : "border-gray-100"
              }`}
            >
              <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                <Info size={14} />
                <span>Why am I seeing this?</span>

                <span className="ml-auto transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>

              <p className="mt-3 pl-6 text-xs leading-relaxed text-gray-400">
                Puter provides the AI infrastructure used by Motifax.
                Authentication is handled by Puter and is required to access
                its AI services. Motifax does not ask for your Puter password
                directly.
              </p>
            </details>
          </div>
        </div>

        {/* Feature Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left border-t pt-16 pb-24 ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div>
            <div className="mb-4">
              <History size={24} />
            </div>
            <h3 className="font-bold mb-2">Historical Context</h3>
            <p className="text-sm text-gray-500">
              Explore possible origins, historical periods, cultural
              associations, and context.
            </p>
          </div>

          <div>
            <div className="mb-4">
              <Library size={24} />
            </div>
            <h3 className="font-bold mb-2">Motif Intelligence</h3>
            <p className="text-sm text-gray-500">
              Identify motifs, styles, related traditions, symbolism, and
              visual classifications.
            </p>
          </div>

          <div>
            <div className="mb-4">
              <ScanSearch size={24} />
            </div>
            <h3 className="font-bold mb-2">Visual DNA</h3>
            <p className="text-sm text-gray-500">
              Analyze symmetry, repetition, geometry, composition, and
              construction patterns.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}