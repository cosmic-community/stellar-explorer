'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Star, Sparkles, Globe, Menu, X, Gamepad2 } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  const getLinkClasses = (path: string) => {
    const baseClasses = "flex items-center space-x-1 transition-colors"
    const activeClasses = "text-blue-400 font-medium"
    const inactiveClasses = "text-muted-foreground hover:text-foreground"
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`
  }

  const getMobileLinkClasses = (path: string) => {
    const baseClasses = "flex items-center space-x-2 transition-colors py-2"
    const activeClasses = "text-blue-400 font-medium"
    const inactiveClasses = "text-muted-foreground hover:text-foreground"
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`
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
              className={getLinkClasses('/stars')}
            >
              <Star className="w-4 h-4" />
              <span>Stars</span>
            </Link>
            <Link 
              href="/constellations" 
              className={getLinkClasses('/constellations')}
            >
              <Sparkles className="w-4 h-4" />
              <span>Constellations</span>
            </Link>
            <Link 
              href="/galaxies" 
              className={getLinkClasses('/galaxies')}
            >
              <Globe className="w-4 h-4" />
              <span>Galaxies</span>
            </Link>
            <Link 
              href="/star-game" 
              className={getLinkClasses('/star-game')}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Star Game</span>
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
                className={getMobileLinkClasses('/stars')}
                onClick={closeMobileMenu}
              >
                <Star className="w-5 h-5" />
                <span>Stars</span>
              </Link>
              <Link 
                href="/constellations" 
                className={getMobileLinkClasses('/constellations')}
                onClick={closeMobileMenu}
              >
                <Sparkles className="w-5 h-5" />
                <span>Constellations</span>
              </Link>
              <Link 
                href="/galaxies" 
                className={getMobileLinkClasses('/galaxies')}
                onClick={closeMobileMenu}
              >
                <Globe className="w-5 h-5" />
                <span>Galaxies</span>
              </Link>
              <Link 
                href="/star-game" 
                className={getMobileLinkClasses('/star-game')}
                onClick={closeMobileMenu}
              >
                <Gamepad2 className="w-5 h-5" />
                <span>Star Game</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}