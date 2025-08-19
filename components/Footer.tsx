import Link from 'next/link'
import { Star, Sparkles, Globe, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Star className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">Stellar Explorer</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Discover the wonders of the universe through our comprehensive astronomical database. 
              Explore stars, constellations, and galaxies from the comfort of your home.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@stellarexplorer.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <div className="space-y-3">
              <Link 
                href="/stars" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Star className="w-4 h-4" />
                <span>Stars</span>
              </Link>
              <Link 
                href="/constellations" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Constellations</span>
              </Link>
              <Link 
                href="/galaxies" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Galaxies</span>
              </Link>
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-3">
              <Link 
                href="/about" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/privacy" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Stellar Explorer. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-muted-foreground text-xs">
              Powered by Cosmic CMS
            </span>
            <span className="text-muted-foreground text-xs">
              Built with Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}