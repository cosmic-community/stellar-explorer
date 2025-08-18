import { getGalaxies } from '@/lib/cosmic'
import ObjectCard from '@/components/ObjectCard'
import { Globe } from 'lucide-react'
import { Galaxy } from '@/types'

export default async function GalaxiesPage() {
  const galaxies: Galaxy[] = await getGalaxies()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Globe className="w-8 h-8 text-purple-400" />
        <h1 className="text-3xl font-bold">Galaxies</h1>
      </div>
      
      <p className="text-muted-foreground mb-8 text-lg">
        Journey beyond our solar system to explore the magnificent galaxies that populate our universe. Each galaxy contains billions of stars, planets, and cosmic wonders.
      </p>

      {galaxies.length === 0 ? (
        <div className="text-center py-12">
          <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Galaxies Found</h2>
          <p className="text-muted-foreground">
            No galaxy data is currently available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galaxies.map((galaxy) => (
            <ObjectCard
              key={galaxy.id}
              object={galaxy}
              type="galaxy"
            />
          ))}
        </div>
      )}
    </div>
  )
}