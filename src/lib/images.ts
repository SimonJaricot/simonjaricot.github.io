// Image utilities for enhanced-img processing

/**
 * Generate optimized sizes attribute for responsive images
 */
export function getImageSizes(breakpoints?: string[]): string {
	if (breakpoints) {
		return breakpoints.join(', ');
	}
	
	// Default responsive sizes
	return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
}

/**
 * Check if a source string is a supported image format
 */
export function isImageFile(src: string): boolean {
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
	return imageExtensions.some(ext => src.toLowerCase().includes(ext));
}