import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { LanguageProvider } from '../utils/LanguageContext'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Musician Name - Official Website',
  description: 'Official website of Musician Name - Classical Musician & Performer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Navigation Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl md:text-2xl font-serif font-bold text-white hover:text-amber-400 transition-colors flex-shrink-0 whitespace-nowrap">Musician Name</Link>
                <div className="flex items-center gap-6">
                  <nav className="hidden md:flex gap-6">
                    <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                    <Link href="/bio" className="hover:text-amber-400 transition-colors">Biography</Link>
                    <Link href="/gallery" className="hover:text-amber-400 transition-colors">Gallery</Link>
                    <Link href="/upcoming" className="hover:text-amber-400 transition-colors">Upcoming</Link>
                    <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
                  </nav>
                  <LanguageSwitcher />
                </div>
              </div>
          </header>
          
          {/* Main Content */}
          <main className="pt-16">
            {children}
          </main>
        </body>
      </html>
    </LanguageProvider>
  )
}