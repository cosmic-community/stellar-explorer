import { createBucketClient } from '@cosmicjs/sdk'
import { Star, Constellation, Galaxy, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all stars
export async function getStars(): Promise<Star[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'stars' })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Star[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch stars');
  }
}

// Fetch all constellations
export async function getConstellations(): Promise<Constellation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'constellations' })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Constellation[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch constellations');
  }
}

// Fetch all galaxies
export async function getGalaxies(): Promise<Galaxy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'galaxies' })
      .depth(1)
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Galaxy[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch galaxies');
  }
}

// Fetch single star by slug
export async function getStarBySlug(slug: string): Promise<Star | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'stars', slug })
      .depth(1);
    
    return response.object as Star;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch star');
  }
}

// Fetch single constellation by slug
export async function getConstellationBySlug(slug: string): Promise<Constellation | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'constellations', slug })
      .depth(1);
    
    return response.object as Constellation;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch constellation');
  }
}

// Fetch single galaxy by slug
export async function getGalaxyBySlug(slug: string): Promise<Galaxy | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'galaxies', slug })
      .depth(1);
    
    return response.object as Galaxy;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch galaxy');
  }
}