import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../utils/LanguageContext'
import { supabase } from '../../utils/supabase'

export default function GalleryPage() {
  const { language } = useLanguage()
  const [galleryData, setGalleryData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('language', language)
          .order('order_position', { ascending: true })

        if (error) {
          console.error('Error fetching gallery data:', error)
        } else {
          setGalleryData(data)
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryData()
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
  const defaultGallery = [
    { title: language === 'en' ? 'Performance at Royal Albert Hall' : '在皇家阿尔伯特音乐厅的演出', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20stage%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=landscape_4_3' },
    { title: language === 'en' ? 'Backstage at La Scala' : '在斯卡拉歌剧院后台', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20costume%2C%20backstage%20photo%2C%20professional%20lighting%2C%20high%20quality&image_size=landscape_4_3' },
    { title: language === 'en' ? 'With London Symphony Orchestra' : '与伦敦交响乐团合作', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20orchestra%2C%20concert%20performance%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_4_3' },
    { title: language === 'en' ? 'Rehearsal at Metropolitan Opera' : '在大都会歌剧院排练', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20rehearsing%2C%20professional%20photography%2C%20natural%20lighting%2C%20high%20quality&image_size=landscape_4_3' },
    { title: language === 'en' ? 'Curtain Call at Carnegie Hall' : '在卡内基音乐厅谢幕', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20taking%20bow%20on%20stage%2C%20audience%20applause%2C%20professional%20photography&image_size=landscape_4_3' },
    { title: language === 'en' ? 'Performance in Vienna' : '在维也纳的演出', image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20at%20vienna%20state%20opera%2C%20elegant%20costume%2C%20professional%20photography&image_size=landscape_4_3' }
  ]

  const currentGallery = galleryData.length > 0 ? galleryData : defaultGallery

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif text-center mb-12">{language === 'en' ? 'Gallery' : '画廊'}</h1>
        <p className="text-center text-gray-600 mb-8">{language === 'en' ? 'A collection of performance photos and moments' : '演出照片和精彩瞬间合集'}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentGallery.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-80">
                <Image 
                  src={item.image_url} 
                  alt={item.title} 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-700 font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded transition duration-300">
            {language === 'en' ? 'Back to Home' : '返回首页'}
          </Link>
        </div>
      </div>
    </div>
  )
}