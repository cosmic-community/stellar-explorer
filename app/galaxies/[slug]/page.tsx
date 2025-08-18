// app/galaxies/[slug]/page.tsx
import { getGalaxyBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Globe, Ruler, Calendar, Star } from 'lucide-react'
import Link from 'next/link'

interface GalaxyPageProps {
  params: Promise<{ slug: string }>
}

export default async function GalaxyPage({ params }: GalaxyPageProps) {
  const { slug } = await params
  const galaxy = await getGalaxyBySlug(slug)

  if (!galaxy) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/galaxies"
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Galaxies
        </Link>
        
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold">{galaxy.title}</h1>
        </div>

        {galaxy.metadata?.galaxy_name && galaxy.metadata.galaxy_name !== galaxy.title && (
          <p className="text-lg text-muted-foreground mb-6 italic">
            {galaxy.metadata.galaxy_name}
          </p>
        )}
      </div>

      {galaxy.metadata?.image?.imgix_url && (
        <div className="mb-8">
          <img 
            src={`${galaxy.metadata.image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={`Image of ${galaxy.title}`}
            width={800}
            height={600}
            className="w-full rounded-lg border border-border"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {galaxy.metadata?.description && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: galaxy.metadata.description }}
              />
            </section>
          )}

          {galaxy.metadata?.notable_features && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Notable Features</h2>
              <p className="text-muted-foreground leading-relaxed">
                {galaxy.metadata.notable_features}
              </p>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
            <div className="space-y-3">
              {galaxy.metadata?.galaxy_type?.value && (
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Type:</strong> {galaxy.metadata.galaxy_type.value}
                  </span>
                </div>
              )}

              {galaxy.metadata?.distance && (
                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Distance:</strong> {galaxy.metadata.distance}
                  </span>
                </div>
              )}

              {galaxy.metadata?.discovery_date && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Discovered:</strong> {galaxy.metadata.discovery_date}
                  </span>
                </div>
              )}

              {galaxy.metadata?.galaxy_name && galaxy.metadata.galaxy_name !== galaxy.title && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Official Name:</strong> {galaxy.metadata.galaxy_name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}