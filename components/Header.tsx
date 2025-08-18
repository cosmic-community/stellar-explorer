import Link from 'next/link'
import { Star, Telescope, Galaxy } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Star className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">Stellar Explorer</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/stars" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Stars</span>
            </Link>
            <Link 
              href="/constellations" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Telescope className="w-4 h-4" />
              <span>Constellations</span>
            </Link>
            <Link 
              href="/galaxies" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Galaxy className="w-4 h-4" />
              <span>Galaxies</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}