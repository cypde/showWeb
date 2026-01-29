'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState({ site_title: 'CHARLOTTE CLAPPERTON' });
  const [navLinks, setNavLinks] = useState([
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/upcoming', label: 'Upcoming' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Fetch site config
        const { data: configData, error: configError } = await supabase
          .from('site_config')
          .select('key, value');
        
        if (configData) {
          const configObj = { site_title: 'CHARLOTTE CLAPPERTON' };
          configData.forEach(item => {
            configObj[item.key] = item.value;
          });
          setSiteConfig(configObj);
        }

        // Fetch navigation links
        const { data: navData, error: navError } = await supabase
          .from('navigation')
          .select('id, name, url, order_position, is_active')
          .eq('is_active', true)
          .order('order_position', { ascending: true });
        
        if (navData) {
          setNavLinks(navData.map(item => ({ href: item.url, label: item.name })));
        }
      } catch (error) {
        console.error('Error fetching config:', error);
        // Ensure site title is always set even if there's an error
        setSiteConfig({ site_title: 'CHARLOTTE CLAPPERTON' });
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <header className="bg-black text-white py-6 px-4 md:px-8 lg:px-16 fixed top-0 left-0 right-0 z-50 shadow-lg header-animation">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wider mb-4 md:mb-0">
          {siteConfig.site_title}
        </Link>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 md:space-x-8">
          <nav className="flex space-x-6 md:space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className={`relative px-2 py-1 transition-all duration-300 ${pathname === link.href ? 'text-white' : 'text-gray-300 hover:text-white'}`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 transform scale-x-100 transition-transform duration-300" />
                )}
                {pathname !== link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 px-4 rounded transition-all duration-300 ${pathname === link.href ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;