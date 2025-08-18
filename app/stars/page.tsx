import { getStars } from '@/lib/cosmic'
import ObjectCard from '@/components/ObjectCard'
import { Star } from 'lucide-react'

export default async function StarsPage() {
  const stars = await getStars();

  if (!stars || stars.length === 0) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Star className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          <h1 className="text-3xl font-bold mb-4">No Stars Found</h1>
          <p className="text-muted-foreground">No star data is currently available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Star className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          <h1 className="text-4xl font-bold mb-4">Stellar Catalog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of remarkable stars, from nearby neighbors to distant giants that light up our night sky.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stars.map((star) => (
            <ObjectCard key={star.id} object={star} type="star" />
          ))}
        </div>
      </div>
    </div>
  )
}