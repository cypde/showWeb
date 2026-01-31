'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import supabase from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';

const AboutPage = () => {
  const { language } = useLanguage();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从 Supabase 数据库获取个人信息
    const fetchAbout = async () => {
      try {
        const { data, error } = await supabase
          .from('about')
          .select('*')
          .eq('language', language)
          .limit(1);

        if (error) {
          console.error('获取个人信息失败:', error);
        } else {
          setAbout(data?.[0] || null);
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [language]);

  // 默认个人信息，当数据库中没有数据时使用
  const defaultAbout = {
    title: 'Charlotte Clapperton',
    content: 'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice, exceptional musicianship, and captivating stage presence. With a repertoire spanning from Baroque to contemporary opera, she has performed in prestigious venues across Europe and North America.\n\nBorn in London, Charlotte began her musical training at the Royal Academy of Music, where she graduated with distinction. She further honed her craft at the Guildhall School of Music & Drama, studying under the renowned mezzo-soprano Sarah Walker.\n\nRecent highlights include her debut at the Royal Opera House, Covent Garden, as Cherubino in Mozart\'s Le nozze di Figaro, and performances with the London Symphony Orchestra, the Metropolitan Opera Orchestra, and the Berlin Philharmonic.\n\nCharlotte\'s unique interpretation of classic roles has earned her critical acclaim and a dedicated following. She is particularly renowned for her portrayals of Carmen, Octavian in Der Rosenkavalier, and Orfeo in Gluck\'s Orfeo ed Euridice.',
    artisticApproach: 'Charlotte is dedicated to bringing depth and authenticity to every role she portrays. She believes in the power of opera to connect with audiences on an emotional level, and her performances are noted for their dramatic intensity and vocal beauty.\n\nIn addition to her operatic work, Charlotte is a passionate recitalist, specializing in French mélodies and German lieder. She has recorded several critically acclaimed albums, including French Connections and Songs of Love and Loss.\n\nCharlotte is also committed to music education and outreach. She regularly conducts masterclasses and workshops for young singers, and she is a patron of several music charities that support emerging artists.\n\nWhen not performing, Charlotte enjoys spending time with her family, reading literature, and exploring new cuisines. She is fluent in English, French, German, and Italian, which allows her to bring authentic nuance to her performances in these languages.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20elegant%20mezzo-soprano%20singer%2C%20classical%20style%2C%20high%20quality%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3',
    performing_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20grand%20stage%2C%20opera%20house%20setting%2C%20professional%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3'
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

  const aboutData = about || defaultAbout;

  return (
    <Layout>
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center font-handwritten">{language === 'en' ? 'About' : '关于'}</h1>
          
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <img 
                src={aboutData.image_url} 
                alt="Charlotte Clapperton" 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-handwritten">{aboutData.title}</h2>
              <div className="prose prose-lg font-handwritten">
                {aboutData.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pl-12">
              <img 
                src={aboutData.performing_image_url || aboutData.image_url} 
                alt="Charlotte Clapperton Performing" 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-handwritten">{language === 'en' ? 'Artistic Approach' : '艺术理念'}</h2>
              <div className="prose prose-lg font-handwritten">
                {(aboutData.artisticApproach || aboutData.content).split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;