import { Star, Telescope, Galaxy } from 'lucide-react'
import Link from 'next/link'
import { getStars, getConstellations, getGalaxies } from '@/lib/cosmic'
import ObjectCard from '@/components/ObjectCard'

export default async function HomePage() {
  const [stars, constellations, galaxies] = await Promise.all([
    getStars(),
    getConstellations(), 
    getGalaxies()
  ]);

  // Get featured objects (first item from each category)
  const featuredStar = stars[0];
  const featuredConstellation = constellations[0];
  const featuredGalaxy = galaxies[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Stellar Explorer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the wonders of our universe through an interactive exploration of stars, galaxies, and constellations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/stars" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Star className="w-5 h-5 mr-2" />
              Explore Stars
            </Link>
            <Link 
              href="/constellations" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <Telescope className="w-5 h-5 mr-2" />
              View Constellations
            </Link>
            <Link 
              href="/galaxies" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <Galaxy className="w-5 h-5 mr-2" />
              Discover Galaxies
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Discoveries</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredStar && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-blue-400" />
                  Featured Star
                </h3>
                <ObjectCard object={featuredStar} type="star" />
              </div>
            )}
            
            {featuredConstellation && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Telescope className="w-5 h-5 mr-2 text-purple-400" />
                  Featured Constellation
                </h3>
                <ObjectCard object={featuredConstellation} type="constellation" />
              </div>
            )}
            
            {featuredGalaxy && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Galaxy className="w-5 h-5 mr-2 text-pink-400" />
                  Featured Galaxy
                </h3>
                <ObjectCard object={featuredGalaxy} type="galaxy" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">{stars.length}</div>
              <div className="text-muted-foreground">Stars Catalogued</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">{constellations.length}</div>
              <div className="text-muted-foreground">Constellations Mapped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">{galaxies.length}</div>
              <div className="text-muted-foreground">Galaxies Discovered</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}