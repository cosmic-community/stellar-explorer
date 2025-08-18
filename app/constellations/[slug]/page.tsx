// app/constellations/[slug]/page.tsx
import { getConstellationBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Sparkles, MapPin, Calendar, Globe } from 'lucide-react'
import Link from 'next/link'

interface ConstellationPageProps {
  params: Promise<{ slug: string }>
}

export default async function ConstellationPage({ params }: ConstellationPageProps) {
  const { slug } = await params
  const constellation = await getConstellationBySlug(slug)

  if (!constellation) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/constellations"
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Constellations
        </Link>
        
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold">{constellation.title}</h1>
        </div>

        {constellation.metadata?.latin_name && constellation.metadata.latin_name !== constellation.title && (
          <p className="text-lg text-muted-foreground mb-6 italic">
            {constellation.metadata.latin_name}
          </p>
        )}
      </div>

      {constellation.metadata?.star_map?.imgix_url && (
        <div className="mb-8">
          <img 
            src={`${constellation.metadata.star_map.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={`Star map of ${constellation.title}`}
            width={800}
            height={600}
            className="w-full rounded-lg border border-border"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {constellation.metadata?.description && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: constellation.metadata.description }}
              />
            </section>
          )}

          {constellation.metadata?.mythology && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Mythology & Cultural Significance</h2>
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: constellation.metadata.mythology }}
              />
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
            <div className="space-y-3">
              {constellation.metadata?.best_viewing_season?.value && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Best Season:</strong> {constellation.metadata.best_viewing_season.value}
                  </span>
                </div>
              )}

              {constellation.metadata?.hemisphere?.value && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Hemisphere:</strong> {constellation.metadata.hemisphere.value}
                  </span>
                </div>
              )}

              {constellation.metadata?.constellation_name && constellation.metadata.constellation_name !== constellation.title && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Common Name:</strong> {constellation.metadata.constellation_name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {constellation.metadata?.notable_stars && constellation.metadata.notable_stars.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Notable Stars</h3>
              <div className="space-y-2">
                {constellation.metadata.notable_stars.map((star, index) => (
                  <Link
                    key={star.id || index}
                    href={`/stars/${star.slug}`}
                    className="block text-sm text-primary hover:underline"
                  >
                    {star.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}