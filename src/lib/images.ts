// Image registry for enhanced-img processing
// Import all images that should be optimized with enhanced-img

import helloImage from './images/hello.jpeg';

// Map of image keys to their enhanced imports
export const imageRegistry = {
	'hello': helloImage,
	// Add more images here as needed
	// 'another-image': anotherImage,
} as const;

export type ImageKey = keyof typeof imageRegistry;

/**
 * Get an enhanced image by key, fallback to regular path if not found
 */
export function getImage(key: string): string | undefined {
	return imageRegistry[key as ImageKey];
}

/**
 * Check if an image key exists in the enhanced registry
 */
export function hasEnhancedImage(key: string): key is ImageKey {
	return key in imageRegistry;
}