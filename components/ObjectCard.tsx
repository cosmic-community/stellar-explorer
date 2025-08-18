import Link from 'next/link'
import { Star, Constellation, Galaxy } from '@/types'

interface ObjectCardProps {
  object: Star | Constellation | Galaxy;
  type: 'star' | 'constellation' | 'galaxy';
}

export default function ObjectCard({ object, type }: ObjectCardProps) {
  const getObjectImage = () => {
    if (type === 'star' && 'metadata' in object && object.metadata?.image?.imgix_url) {
      return object.metadata.image.imgix_url;
    }
    if (type === 'constellation' && 'metadata' in object && object.metadata?.star_map?.imgix_url) {
      return object.metadata.star_map.imgix_url;
    }
    if (type === 'galaxy' && 'metadata' in object && object.metadata?.image?.imgix_url) {
      return object.metadata.image.imgix_url;
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
          
          {type === 'star' && 'metadata' in object && (
            <div className="flex justify-between text-xs text-muted-foreground">
              {object.metadata?.magnitude && (
                <span>Magnitude: {object.metadata.magnitude}</span>
              )}
              {object.metadata?.spectral_class?.value && (
                <span>Type: {object.metadata.spectral_class.value}</span>
              )}
            </div>
          )}
          
          {type === 'constellation' && 'metadata' in object && (
            <div className="flex justify-between text-xs text-muted-foreground">
              {object.metadata?.hemisphere?.value && (
                <span>Hemisphere: {object.metadata.hemisphere.value}</span>
              )}
              {object.metadata?.best_viewing_season?.value && (
                <span>Best: {object.metadata.best_viewing_season.value}</span>
              )}
            </div>
          )}
          
          {type === 'galaxy' && 'metadata' in object && (
            <div className="flex justify-between text-xs text-muted-foreground">
              {object.metadata?.galaxy_type?.value && (
                <span>Type: {object.metadata.galaxy_type.value}</span>
              )}
              {object.metadata?.distance && (
                <span>Distance: {object.metadata.distance}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}