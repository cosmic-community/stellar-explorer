// app/stars/[slug]/page.tsx
import { getStarBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Star, Ruler, Eye, MapPin, Palette } from 'lucide-react'
import Link from 'next/link'

interface StarPageProps {
  params: Promise<{ slug: string }>
}

export default async function StarPage({ params }: StarPageProps) {
  const { slug } = await params
  const star = await getStarBySlug(slug)

  if (!star) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/stars"
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Stars
        </Link>
        
        <div className="flex items-center space-x-3 mb-4">
          <Star className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold">{star.title}</h1>
        </div>

        {star.metadata?.scientific_designation && star.metadata.scientific_designation !== star.title && (
          <p className="text-lg text-muted-foreground mb-6 italic">
            {star.metadata.scientific_designation}
          </p>
        )}
      </div>

      {star.metadata?.image?.imgix_url && (
        <div className="mb-8">
          <img 
            src={`${star.metadata.image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={`Image of ${star.title}`}
            width={800}
            height={600}
            className="w-full rounded-lg border border-border"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {star.metadata?.description && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: star.metadata.description }}
              />
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
            <div className="space-y-3">
              {star.metadata?.magnitude && (
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Magnitude:</strong> {star.metadata.magnitude}
                  </span>
                </div>
              )}

              {star.metadata?.spectral_class?.value && (
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Spectral Class:</strong> {star.metadata.spectral_class.value}
                  </span>
                </div>
              )}

              {star.metadata?.distance && (
                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Distance:</strong> {star.metadata.distance}
                  </span>
                </div>
              )}

              {star.metadata?.star_name && star.metadata.star_name !== star.title && (
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Common Name:</strong> {star.metadata.star_name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {star.metadata?.constellation && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Constellation</h3>
              <Link
                href={`/constellations/${star.metadata.constellation.slug}`}
                className="flex items-center space-x-2 text-primary hover:underline"
              >
                <MapPin className="w-4 h-4" />
                <span>{star.metadata.constellation.title}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}