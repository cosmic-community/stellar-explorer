'use client'

import Link from 'next/link'
import { Star, Sparkles, Globe, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <Star className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">Stellar Explorer</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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
              <Sparkles className="w-4 h-4" />
              <span>Constellations</span>
            </Link>
            <Link 
              href="/galaxies" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Galaxies</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/stars" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <Star className="w-5 h-5" />
                <span>Stars</span>
              </Link>
              <Link 
                href="/constellations" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <Sparkles className="w-5 h-5" />
                <span>Constellations</span>
              </Link>
              <Link 
                href="/galaxies" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <Globe className="w-5 h-5" />
                <span>Galaxies</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}