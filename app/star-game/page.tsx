import { Metadata } from 'next'
import StarGame from '../../components/StarGame'
import { cosmic } from '../../lib/cosmic'
import { Constellation } from '../../types'

export const metadata: Metadata = {
  title: 'Star Game | Stellar Explorer',
  description: 'Test your constellation knowledge with our interactive star connection game. Connect the stars to form constellations and earn points!',
}

async function getConstellations(): Promise<Constellation[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'constellations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects || []
  } catch (error) {
    console.error('Error fetching constellations:', error)
    return []
  }
}

export default async function StarGamePage() {
  const constellations = await getConstellations()
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Constellation Challenge</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Put your astronomical knowledge to the test! Connect the stars to form constellations in this 
            interactive game. Race against time to create as many constellation patterns as possible.
          </p>
        </div>
        
        <StarGame constellations={constellations} />
      </div>
    </div>
  )
}