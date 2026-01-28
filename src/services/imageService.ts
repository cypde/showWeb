// R2 Image Service for handling media uploads and retrieval
// This service would connect to Vercel's Cloudflare R2 for image storage

export interface GalleryImage {
  id: number;
  url: string;
  alt_text: string;
  caption?: string;
  category?: string; // e.g., 'performance', 'recording', 'personal'
  upload_date: string;
}

// Mock implementation - in a real app, this would connect to R2
export const imageService = {
  // Fetch all gallery images
  async getGalleryImages(category?: string): Promise<GalleryImage[]> {
    // Simulate API call to R2
    const mockImages: GalleryImage[] = [
      {
        id: 1,
        url: '/performance1.jpg',
        alt_text: 'Performance at Concert Hall',
        caption: 'Solo recital at the prestigious concert hall',
        category: 'performance',
        upload_date: '2023-11-15'
      },
      {
        id: 2,
        url: '/performance2.jpg',
        alt_text: 'Chamber Music Recital',
        caption: 'Collaboration with string quartet',
        category: 'performance',
        upload_date: '2023-10-22'
      },
      {
        id: 3,
        url: '/performance3.jpg',
        alt_text: 'Solo Performance',
        caption: 'Playing Chopin\'s Ballade No. 1',
        category: 'performance',
        upload_date: '2023-09-30'
      },
      {
        id: 4,
        url: '/performance4.jpg',
        alt_text: 'Music Festival',
        caption: 'Festival finale performance',
        category: 'performance',
        upload_date: '2023-08-15'
      },
      {
        id: 5,
        url: '/performance5.jpg',
        alt_text: 'Recording Session',
        caption: 'Studio recording for upcoming album',
        category: 'recording',
        upload_date: '2023-07-10'
      },
      {
        id: 6,
        url: '/performance6.jpg',
        alt_text: 'Masterclass',
        caption: 'Teaching young musicians',
        category: 'personal',
        upload_date: '2023-06-05'
      }
    ];

    if (category) {
      return mockImages.filter(img => img.category === category);
    }

    return mockImages;
  },

  // Fetch a single image by ID
  async getImageById(id: number): Promise<GalleryImage | null> {
    const mockImages = await this.getGalleryImages();
    const image = mockImages.find(img => img.id === id);
    return image || null;
  },

  // Add a new image (would require authentication and R2 upload in real implementation)
  async addImage(imageData: Omit<GalleryImage, 'id' | 'upload_date'>): Promise<GalleryImage> {
    // Simulate adding image to R2
    const newImage: GalleryImage = {
      ...imageData,
      id: Date.now(), // Mock ID generation
      upload_date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };
    
    console.log(`Mock: Added image to R2 storage`, newImage);
    return newImage;
  },

  // Delete an image (would require authentication and R2 deletion in real implementation)
  async deleteImage(id: number): Promise<void> {
    console.log(`Mock: Deleted image ${id} from R2 storage`);
  }
};