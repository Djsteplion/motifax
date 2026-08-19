import { ScanSearch, History, Library, ShieldCheck, Info } from 'lucide-react'
import Scanner from '@/components/Scanner'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a] selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tighter italic">Motifax</h1>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:opacity-60 transition-opacity">Explore</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Archive</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-24 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold mb-6">
          <ScanSearch size={14} />
          <span> AI-POWERED MOTIF ANALYSIS</span>
        </div>
        
        <h2 className="text-6xl font-medium tracking-tight mb-6">
          Discover the story <br />
          <span className="text-gray-400 italic font-serif">behind every motif.</span>
        </h2>
        
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
           Analyze patterns, motifs, and visual traditions to uncover their
           symbolism, cultural context, history, and visual DNA.
        </p>

        {/* Upload Action Area */}
        <Scanner />

        {/* Authentication Notice */}
        <div className="max-w-xl mx-auto mt-6 text-left">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <ShieldCheck size={18} className="text-gray-700" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Secure AI Analysis
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Motifax uses <span className="font-medium text-gray-700">Puter</span>{' '}
                  to securely process AI analysis. You may be asked to authenticate
                  with Puter before your first analysis.
                </p>
              </div>
            </div>

            <details className="group mt-4 border-t border-gray-100 pt-3">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900">
                <Info size={14} />
                <span>Why am I seeing this?</span>
                <span className="ml-auto transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>

              <p className="mt-3 pl-6 text-xs leading-relaxed text-gray-400">
                Puter provides the AI infrastructure used by Motifax. Authentication
                is handled by Puter and is required to access its AI services.
                Motifax does not ask for your Puter password directly.
              </p>
            </details>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left border-t border-gray-200 pt-16 mb-24">
          <div>
            <div className="mb-4 text-black"><History size={24} /></div>
            <h3 className="font-bold mb-2">Historical Context</h3>
            <p className="text-sm text-gray-500">Explore possible origins, historical periods, cultural associations, and context.</p>
          </div>
          <div>
            <div className="mb-4 text-black"><Library size={24} /></div>
            <h3 className="font-bold mb-2">Motif Intelligence</h3>
            <p className="text-sm text-gray-500">Identify motifs, styles, related traditions, symbolism, and visual classifications.</p>
          </div>
          <div>
            <div className="mb-4 text-black"><ScanSearch size={24} /></div>
            <h3 className="font-bold mb-2">Visual DNA</h3>
            <p className="text-sm text-gray-500">Analyze symmetry, repetition, geometry, composition, and construction patterns.</p>
          </div>
        </div>
      </section>
    </main>
  )
}