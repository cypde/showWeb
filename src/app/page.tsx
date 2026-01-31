import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '../utils/LanguageContext'
import { supabase } from '../utils/supabase'

export default function Home() {
  const { language } = useLanguage()
  const [heroData, setHeroData] = useState<any>(null)
  const [videoData, setVideoData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // 获取hero部分数据
        const { data: heroResult, error: heroError } = await supabase
          .from('home_sections')
          .select('*')
          .eq('section_name', 'hero')
          .eq('language', language)
          .single()

        if (heroError) {
          console.error('Error fetching hero data:', heroError)
        } else {
          setHeroData(heroResult)
        }

        // 获取video部分数据
        const { data: videoResult, error: videoError } = await supabase
          .from('home_sections')
          .select('*')
          .eq('section_name', 'video')
          .eq('language', language)
          .single()

        if (videoError) {
          console.error('Error fetching video data:', videoError)
        } else {
          setVideoData(videoResult)
        }
      } catch (error) {
        console.error('Error fetching home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [language])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // 默认数据
  const defaultHero = {
    title: language === 'en' ? 'Charlotte Clapperton' : '夏洛特·克拉珀顿',
    subtitle: language === 'en' ? 'Mezzo-Soprano Opera Singer' : '女中音歌剧演唱家',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20mezzo-soprano%20opera%20singer%20on%20stage%2C%20elegant%20pose%2C%20dramatic%20lighting%2C%20high%20quality%20photography&image_size=landscape_16_9'
  }

  const currentHero = heroData || defaultHero

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src={currentHero.image_url} 
            alt={currentHero.title} 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">{currentHero.title}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">{currentHero.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/upcoming" className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded transition duration-300">
              {language === 'en' ? 'Upcoming Performances' : '即将举行的演出'}
            </Link>
            <Link href="/gallery" className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium py-3 px-8 rounded transition duration-300">
              {language === 'en' ? 'View Gallery' : '查看画廊'}
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
              <h3 className="text-xl font-serif group-hover:underline">{language === 'en' ? 'Home' : '首页'}</h3>
            </Link>
            
            <Link href="/bio" className="group text-center">
              <div className="mb-4 h-64 bg-gray-200 border-2 border-dashed rounded-xl w-full" />
              <h3 className="text-xl font-serif group-hover:underline">{language === 'en' ? 'Biography' : '个人简介'}</h3>
            </Link>
            
            <Link href="/gallery" className="group text-center">
              <div className="mb-4 h-64 bg-gray-200 border-2 border-dashed rounded-xl w-full" />
              <h3 className="text-xl font-serif group-hover:underline">{language === 'en' ? 'Gallery' : '画廊'}</h3>
            </Link>
            
            <Link href="/upcoming" className="group text-center">
              <div className="mb-4 h-64 bg-gray-200 border-2 border-dashed rounded-xl w-full" />
              <h3 className="text-xl font-serif group-hover:underline">{language === 'en' ? 'Performances' : '演出'}</h3>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Link href="/contact" className="group text-center flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-xl hover:border-amber-500 transition-colors">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif group-hover:text-amber-600 transition-colors">{language === 'en' ? 'Contact' : '联系'}</h3>
              <p className="text-gray-600 mt-2">{language === 'en' ? 'Get in touch for bookings and inquiries' : '预订和咨询请联系我们'}</p>
            </Link>
            
            <div className="text-center flex items-center justify-center">
              <div className="aspect-video w-full bg-gray-800 flex items-center justify-center">
                <div className="text-white text-center p-4 w-full">
                  <p className="text-lg mb-2">{language === 'en' ? 'Featured Video' : '精彩演出'}</p>
                  {videoData?.video_url ? (
                    <div className="relative pb-[56.25%] h-0 w-full">
                      <iframe
                        src={videoData.video_url}
                        title="Featured Performance"
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-700 h-48 w-full flex items-center justify-center">
                      <span>{language === 'en' ? 'Video Player Placeholder' : '视频播放器占位符'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}