import Image from 'next/image'
import Link from 'next/link'

interface GalleryImage {
  id: number;
  url: string;
  alt_text: string;
  caption: string;
  category: string;
  upload_date: string;
}

function getGalleryImages(): GalleryImage[] {
  return [
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
}

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif text-center mb-12">Gallery</h1>
        <p className="text-center text-gray-600 mb-8">A collection of performance photos and moments</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-80">
                <Image 
                  src={image.url} 
                  alt={image.alt_text} 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-700 font-medium">{image.caption}</p>
                <p className="text-gray-500 text-sm mt-1">{image.alt_text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded transition duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}