import { ScanSearch, History, Library } from 'lucide-react'
import Scanner from '@/components/Scanner'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a] selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tighter italic">Motifax</h1>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:opacity-60 transition-opacity">Encyclopedia</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Archive</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-24 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold mb-6">
          <ScanSearch size={14} />
          <span> WORLD`S FIRST DESIGN IDENTIFIER AI</span>
        </div>
        
        <h2 className="text-6xl font-medium tracking-tight mb-6">
          Identify any pattern <br /> 
          <span className="text-gray-400 italic font-serif">instantly.</span>
        </h2>
        
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
          The encyclopedia of motifs in your pocket. Upload a photo to uncover 
          style origins, classifications, and historical context.
        </p>

        {/* Upload Action Area */}
        <Scanner />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left border-t border-gray-200 pt-16 mb-24">
          <div>
            <div className="mb-4 text-black"><History size={24} /></div>
            <h3 className="font-bold mb-2">Historical Context</h3>
            <p className="text-sm text-gray-500">Discover the century and culture where your pattern originated.</p>
          </div>
          <div>
            <div className="mb-4 text-black"><Library size={24} /></div>
            <h3 className="font-bold mb-2">Taxonomy Search</h3>
            <p className="text-sm text-gray-500">Automatically classify designs into geometric, organic, or abstract categories.</p>
          </div>
          <div>
            <div className="mb-4 text-black"><ScanSearch size={24} /></div>
            <h3 className="font-bold mb-2">AI-Powered Detail</h3>
            <p className="text-sm text-gray-500">Our neural engine detects symmetry, repeat types, and construction methods.</p>
          </div>
        </div>
      </section>
    </main>
  )
}