import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-center mb-12">Contact</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
            <p className="mb-6">
              For bookings, inquiries, or general questions, please reach out using the information below. 
              We look forward to hearing from you.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Management</h3>
                <p className="text-gray-700">Elite Artists Management</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-700">Email: info@eliteartists.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">General Inquiries</h3>
                <p className="text-gray-700">Email: contact@musicianname.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">Press & Media</h3>
                <p className="text-gray-700">Press Office</p>
                <p className="text-gray-700">Email: press@musicianname.com</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300">
                  FB
                </a>
                <a href="#" className="bg-gray-800 hover:bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300">
                  IG
                </a>
                <a href="#" className="bg-gray-800 hover:bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300">
                  YT
                </a>
                <a href="#" className="bg-gray-800 hover:bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300">
                  TW
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded transition duration-300"
              >
                Send Message
              </button>
            </form>
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