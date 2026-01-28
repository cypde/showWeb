import Image from 'next/image'
import Link from 'next/link'

export default function BioPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-center mb-12">Biography</h1>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image 
                src="/musician-portrait.jpg" 
                alt="Musician Portrait" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-serif mb-4">About Musician Name</h2>
            <p className="mb-4 leading-relaxed">
              Musician Name is an internationally renowned classical musician known for their virtuosic performances and profound musical interpretations. With a career spanning over two decades, they have performed in the world's most prestigious concert halls and collaborated with leading orchestras and conductors.
            </p>
            <p className="mb-4 leading-relaxed">
              Born into a musical family, Musician Name began their studies at an early age and quickly demonstrated exceptional talent. They went on to study at the prestigious Conservatoire de Paris, where they honed their skills under the guidance of master teachers.
            </p>
            <p className="mb-4 leading-relaxed">
              Throughout their career, Musician Name has received numerous awards and accolades, including the prestigious International Music Prize and the Lifetime Achievement Award from the Classical Music Society. Their recordings have been praised for their technical brilliance and emotional depth.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-serif mb-6">Education & Awards</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Academic Degrees</h3>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Master of Music in Performance, Juilliard School</li>
                <li>Bachelor of Music, Curtis Institute of Music</li>
                <li>Advanced Diploma in Chamber Music, Royal Academy of Music</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">Notable Awards</h3>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>International Music Competition Winner, 2022</li>
                <li>Young Artist Grant, Music Foundation, 2021</li>
                <li>Excellence in Performance Award, 2020</li>
              </ul>
            </div>
          </div>
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