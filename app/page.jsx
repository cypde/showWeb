'use client';

import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import supabase from './lib/supabase';
import { useLanguage } from './lib/LanguageContext';

const HomePage = () => {
  const { language } = useLanguage();
  const [data, setData] = useState({
    about: null,
    performances: [],
    gallery: []
  });
  const [homeSections, setHomeSections] = useState({
    hero: {
      title: 'Charlotte Clapperton',
      subtitle: 'Mezzo-Soprano Opera Singer',
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20mezzo-soprano%20opera%20singer%20on%20stage%2C%20elegant%20pose%2C%20dramatic%20lighting%2C%20high%20quality%20photography&image_size=landscape_16_9",
      button_text: 'About Me',
      button_url: '#about'
    },
    video: {
      title: 'Featured Performance',
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    about_preview: {
      title: 'About Charlotte',
      content: 'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice and captivating stage presence.',
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20mezzo-soprano%20singer%20in%20opera%20costume%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=portrait_4_3",
      button_text: 'Learn More',
      button_url: '/about'
    },
    upcoming_preview: {
      title: 'Upcoming Performances',
      content: 'Check my upcoming performances around the world',
      button_text: 'View All',
      button_url: '/upcoming'
    },
    gallery_preview: {
      title: 'Gallery',
      content: 'Browse my performance photos',
      button_text: 'View Full Gallery',
      button_url: '/gallery'
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取首页各部分配置
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('home_sections')
          .select('*')
          .eq('is_active', true)
          .eq('language', language);
        
        if (sectionsData) {
          const sectionsObj = {};
          sectionsData.forEach(section => {
            sectionsObj[section.section_name] = section;
          });
          setHomeSections(prev => ({ ...prev, ...sectionsObj }));
        }

        // 获取个人信息
        const { data: aboutData, error: aboutError } = await supabase
          .from('about')
          .select('*')
          .eq('language', language)
          .limit(1);

        if (aboutError) {
          console.error('获取个人信息失败:', aboutError);
        }

        // 获取演出信息
        const { data: performanceData, error: performanceError } = await supabase
          .from('performances')
          .select('*')
          .eq('is_active', true)
          .eq('language', language)
          .order('date', { ascending: true })
          .limit(3);

        if (performanceError) {
          console.error('获取演出信息失败:', performanceError);
        }

        // 获取画廊图片
        const { data: galleryData, error: galleryError } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .eq('language', language)
          .order('order_position', { ascending: true })
          .limit(4);

        if (galleryError) {
          console.error('获取画廊图片失败:', galleryError);
        }

        setData({
          about: aboutData?.[0] || null,
          performances: performanceData || [],
          gallery: galleryData || []
        });
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  // 默认数据，当数据库中没有数据时使用
  const defaultData = {
    performances: [
      {
        id: 1,
        title: 'Royal Albert Hall',
        location: 'London, UK',
        date: '2024-03-15',
        image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20stage%20performance%20venue%2C%20elegant%20interior%2C%20concert%20hall&image_size=landscape_16_9"
      },
      {
        id: 2,
        title: 'La Scala',
        location: 'Milan, Italy',
        date: '2024-04-22',
        image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20grand%20stage%2C%20luxury%20venue&image_size=landscape_16_9"
      },
      {
        id: 3,
        title: 'Carnegie Hall',
        location: 'New York, USA',
        date: '2024-05-10',
        image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20hall%20interior%2C%20modern%20design%2C%20orchestra%20stage&image_size=landscape_16_9"
      }
    ],
    gallery: [
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20stage%2C%20professional%20photography%2C%20dramatic%20lighting&image_size=square",
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20costume%2C%20backstage%20photo%2C%20professional%20lighting&image_size=square",
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20orchestra%2C%20concert%20performance%2C%20professional%20photography&image_size=square",
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20rehearsing%2C%20professional%20photography%2C%20natural%20lighting&image_size=square"
    ]
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Main Image */}
      <section className="relative w-full h-screen overflow-hidden">
        <img 
          src={homeSections.hero?.image_url || data.about?.image_url} 
          alt="Charlotte Clapperton" 
          className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
        />
        <div className="absolute inset-0 gradient-overlay flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wider fade-in">{homeSections.hero?.title}</h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 fade-in" style={{ animationDelay: '0.2s' }}>{homeSections.hero?.subtitle}</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 fade-in" style={{ animationDelay: '0.4s' }}>
            <a href={homeSections.hero?.button_url || '#about'} className="bg-primary text-white px-8 py-3 font-bold hover:bg-primary-700 transition-colors btn">{homeSections.hero?.button_text || 'About Me'}</a>
            <a href="#upcoming" className="border-2 border-white text-white px-8 py-3 font-bold hover:bg-white hover:text-black transition-colors btn">{homeSections.upcoming_preview?.button_text || 'Upcoming'}</a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center fade-in">{homeSections.video?.title || 'Featured Performance'}</h2>
          <div className="aspect-w-16 aspect-h-9 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-elegant fade-in" style={{ animationDelay: '0.2s' }}>
            <iframe 
              src={homeSections.video?.video_url || "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
              title="Charlotte Clapperton Performance" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section id="about" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 fade-in">
              <div className="rounded-xl overflow-hidden shadow-elegant card-hover">
                <img 
                  src={homeSections.about_preview?.image_url || data.about?.image_url} 
                  alt="Charlotte Clapperton" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="md:w-1/2 fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{homeSections.about_preview?.title || 'About Charlotte'}</h2>
              <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                {homeSections.about_preview?.content || (data.about?.content ? data.about.content.substring(0, 300) + '...' : 'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice and captivating stage presence.')}
              </p>
              <a href={homeSections.about_preview?.button_url || '/about'} className="inline-block bg-primary text-white px-8 py-3 font-bold hover:bg-primary-700 transition-colors btn">{homeSections.about_preview?.button_text || 'Learn More'}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section id="upcoming" className="py-20 px-4 md:px-8 lg:px-16 bg-dark text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center fade-in">{homeSections.upcoming_preview?.title || 'Upcoming Performances'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.performances.length > 0 ? (
              data.performances.map((event, index) => (
                <div key={event.id} className="bg-dark-100 rounded-xl overflow-hidden shadow-elegant card-hover fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={event.image_url} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-400 mb-2">{event.location}</p>
                    <p className="mb-4 text-primary">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <a href="/upcoming" className="inline-block border border-primary text-primary px-6 py-2 font-bold hover:bg-primary hover:text-white transition-colors btn">DETAILS</a>
                  </div>
                </div>
              ))
            ) : (
              defaultData.performances.map((event, index) => (
                <div key={index} className="bg-dark-100 rounded-xl overflow-hidden shadow-elegant card-hover fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={event.image_url} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-400 mb-2">{event.location}</p>
                    <p className="mb-4 text-primary">{event.date}</p>
                    <a href="/upcoming" className="inline-block border border-primary text-primary px-6 py-2 font-bold hover:bg-primary hover:text-white transition-colors btn">DETAILS</a>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-12 fade-in" style={{ animationDelay: '0.5s' }}>
            <a href={homeSections.upcoming_preview?.button_url || '/upcoming'} className="inline-block bg-primary text-white px-8 py-3 font-bold hover:bg-primary-700 transition-colors btn">{homeSections.upcoming_preview?.button_text || 'View All'}</a>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center fade-in">{homeSections.gallery_preview?.title || 'Gallery'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.gallery.length > 0 ? (
              data.gallery.map((item, index) => (
                <div key={item.id || index} className="rounded-xl overflow-hidden shadow-elegant card-hover fade-in" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                  <div className="p-3 bg-white">
                    <h3 className="text-sm font-medium text-gray-700">{item.title || `Performance ${index + 1}`}</h3>
                  </div>
                  <img 
                    src={item.image_url} 
                    alt={item.title || `Gallery Image ${index + 1}`} 
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))
            ) : (
              defaultData.gallery.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-elegant card-hover fade-in" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                  <div className="p-3 bg-white">
                    <h3 className="text-sm font-medium text-gray-700">Performance {index + 1}</h3>
                  </div>
                  <img 
                    src={image} 
                    alt={`Gallery Image ${index + 1}`} 
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-12 fade-in" style={{ animationDelay: '0.5s' }}>
            <a href={homeSections.gallery_preview?.button_url || '/gallery'} className="inline-block bg-primary text-white px-8 py-3 font-bold hover:bg-primary-700 transition-colors btn">{homeSections.gallery_preview?.button_text || 'View Full Gallery'}</a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;