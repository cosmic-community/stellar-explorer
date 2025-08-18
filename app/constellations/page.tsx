import { getConstellations } from '@/lib/cosmic'
import ObjectCard from '@/components/ObjectCard'
import { Sparkles } from 'lucide-react'
import { Constellation } from '@/types'

export default async function ConstellationsPage() {
  const constellations: Constellation[] = await getConstellations()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Sparkles className="w-8 h-8 text-yellow-400" />
        <h1 className="text-3xl font-bold">Constellations</h1>
      </div>
      
      <p className="text-muted-foreground mb-8 text-lg">
        Explore the patterns of stars that have guided humanity for millennia. Each constellation carries stories, myths, and cultural significance from civilizations across the globe.
      </p>

      {constellations.length === 0 ? (
        <div className="text-center py-12">
          <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Constellations Found</h2>
          <p className="text-muted-foreground">
            No constellation data is currently available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {constellations.map((constellation) => (
            <ObjectCard
              key={constellation.id}
              object={constellation}
              type="constellation"
            />
          ))}
        </div>
      )}
    </div>
  )
}