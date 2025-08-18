import Link from 'next/link'
import { Star, Constellation, Galaxy } from '@/types'

interface ObjectCardProps {
  object: Star | Constellation | Galaxy;
  type: 'star' | 'constellation' | 'galaxy';
}

export default function ObjectCard({ object, type }: ObjectCardProps) {
  const getObjectImage = () => {
    if (type === 'star' && 'metadata' in object) {
      const starObject = object as Star;
      return starObject.metadata?.image?.imgix_url || null;
    }
    if (type === 'constellation' && 'metadata' in object) {
      const constellationObject = object as Constellation;
      return constellationObject.metadata?.star_map?.imgix_url || null;
    }
    if (type === 'galaxy' && 'metadata' in object) {
      const galaxyObject = object as Galaxy;
      return galaxyObject.metadata?.image?.imgix_url || null;
    }
    return null;
  };

  const getObjectDescription = () => {
    if ('metadata' in object && object.metadata?.description) {
      // Strip HTML tags for card preview
      return object.metadata.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    }
    return 'No description available.';
  };

  const imageUrl = getObjectImage();
  const description = getObjectDescription();
  const linkHref = `/${type === 'star' ? 'stars' : type === 'constellation' ? 'constellations' : 'galaxies'}/${object.slug}`;

  return (
    <Link href={linkHref}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors group">
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={`${imageUrl}?w=400&h=225&fit=crop&auto=format,compress`}
              alt={object.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {object.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {description}
          </p>
          
          {type === 'star' && (
            <div className="flex justify-between text-xs text-muted-foreground">
              {(() => {
                const starObject = object as Star;
                return (
                  <>
                    {starObject.metadata?.magnitude && (
                      <span>Magnitude: {starObject.metadata.magnitude}</span>
                    )}
                    {starObject.metadata?.spectral_class?.value && (
                      <span>Type: {starObject.metadata.spectral_class.value}</span>
                    )}
                  </>
                );
              })()}
            </div>
          )}
          
          {type === 'constellation' && (
            <div className="flex justify-between text-xs text-muted-foreground">
              {(() => {
                const constellationObject = object as Constellation;
                return (
                  <>
                    {constellationObject.metadata?.hemisphere?.value && (
                      <span>Hemisphere: {constellationObject.metadata.hemisphere.value}</span>
                    )}
                    {constellationObject.metadata?.best_viewing_season?.value && (
                      <span>Best: {constellationObject.metadata.best_viewing_season.value}</span>
                    )}
                  </>
                );
              })()}
            </div>
          )}
          
          {type === 'galaxy' && (
            <div className="flex justify-between text-xs text-muted-foreground">
              {(() => {
                const galaxyObject = object as Galaxy;
                return (
                  <>
                    {galaxyObject.metadata?.galaxy_type?.value && (
                      <span>Type: {galaxyObject.metadata.galaxy_type.value}</span>
                    )}
                    {galaxyObject.metadata?.distance && (
                      <span>Distance: {galaxyObject.metadata.distance}</span>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}