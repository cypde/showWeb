import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/placeholder-musician.jpg" 
            alt="Musician performing" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Musician Name</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">Classical Musician & Performer</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/upcoming" className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded transition duration-300">
              Upcoming Performances
            </Link>
            <Link href="/gallery" className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium py-3 px-8 rounded transition duration-300">
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/" className="group text-center">
              <div className="mb-4 h-64 bg-gray-200 border-2 border-dashed rounded-xl w-full" />
              <h3 className="text-xl font-serif group-hover:underline">Home</h3>
            </Link>
            
            <Link href="/bio" className="group text-center">
              <div className="mb-4 h-64 bg-gray-200 border-2 border-dashed rounded-xl w-full" />
              <h3 className="text-xl font-serif group-hover:underline">Biography</h3>
            </Link>
            
            <Link href="/gallery" className="group text-center">
              <div className="mb-4 h-64 bg-gray-200 border-2 border-dashed rounded-xl w-full" />
              <h3 className="text-xl font-serif group-hover:underline">Gallery</h3>
            </Link>
            
            <Link href="/upcoming" className="group text-center">
              <div className="mb-4 h-64 bg-gray-200 border-2 border-dashed rounded-xl w-full" />
              <h3 className="text-xl font-serif group-hover:underline">Performances</h3>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Link href="/contact" className="group text-center flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-xl hover:border-amber-500 transition-colors">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif group-hover:text-amber-600 transition-colors">Contact</h3>
              <p className="text-gray-600 mt-2">Get in touch for bookings and inquiries</p>
            </Link>
            
            <div className="text-center flex items-center justify-center">
              <div className="aspect-video w-full bg-gray-800 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <p className="text-lg mb-2">Featured Video</p>
                  <div className="bg-gray-700 h-48 w-full flex items-center justify-center">
                    <span>Video Player Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}