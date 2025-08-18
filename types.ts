// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Star object type
export interface Star extends CosmicObject {
  type: 'stars';
  metadata: {
    star_name?: string;
    scientific_designation?: string;
    description?: string;
    constellation?: Constellation;
    magnitude?: string;
    spectral_class?: {
      key: SpectralClass;
      value: string;
    };
    distance?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Constellation object type
export interface Constellation extends CosmicObject {
  type: 'constellations';
  metadata: {
    constellation_name?: string;
    latin_name?: string;
    description?: string;
    mythology?: string;
    best_viewing_season?: {
      key: ViewingSeason;
      value: string;
    };
    hemisphere?: {
      key: Hemisphere;
      value: string;
    };
    notable_stars?: Star[];
    star_map?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Galaxy object type
export interface Galaxy extends CosmicObject {
  type: 'galaxies';
  metadata: {
    galaxy_name?: string;
    description?: string;
    galaxy_type?: {
      key: GalaxyType;
      value: string;
    };
    distance?: string;
    notable_features?: string;
    discovery_date?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Type literals for select-dropdown values
export type SpectralClass = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M';
export type ViewingSeason = 'spring' | 'summer' | 'fall' | 'winter' | 'year_round';
export type Hemisphere = 'northern' | 'southern' | 'both';
export type GalaxyType = 'spiral' | 'elliptical' | 'irregular' | 'lenticular';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Union type for all cosmic objects
export type CosmicObjectType = Star | Constellation | Galaxy;

// Type guards for runtime validation
export function isStar(obj: CosmicObject): obj is Star {
  return obj.type === 'stars';
}

export function isConstellation(obj: CosmicObject): obj is Constellation {
  return obj.type === 'constellations';
}

export function isGalaxy(obj: CosmicObject): obj is Galaxy {
  return obj.type === 'galaxies';
}