import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../utils/LanguageContext'
import { supabase } from '../../utils/supabase'

export default function UpcomingPage() {
  const { language } = useLanguage()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('performances')
          .select('*')
          .eq('language', language)
          .order('date', { ascending: true })

        if (error) {
          console.error('Error fetching events:', error)
        } else {
          setEvents(data)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
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
  const defaultEvents = [
    {
      id: 1,
      date: '2024-03-15',
      title: language === 'en' ? 'Royal Albert Hall' : '皇家阿尔伯特音乐厅',
      location: language === 'en' ? 'London, UK' : '伦敦，英国',
      description: language === 'en' ? 'Solo recital featuring works by Bach, Handel, and Purcell' : '独唱音乐会，曲目包括巴赫、亨德尔和普塞尔的作品'
    },
    {
      id: 2,
      date: '2024-04-22',
      title: language === 'en' ? 'La Scala' : '斯卡拉歌剧院',
      location: language === 'en' ? 'Milan, Italy' : '米兰，意大利',
      description: language === 'en' ? 'Performances in Mozart\'s Le nozze di Figaro as Cherubino' : '在莫扎特的《费加罗的婚礼》中饰演凯鲁比诺'
    },
    {
      id: 3,
      date: '2024-05-10',
      title: language === 'en' ? 'Carnegie Hall' : '卡内基音乐厅',
      location: language === 'en' ? 'New York, USA' : '纽约，美国',
      description: language === 'en' ? 'Collaboration with the New York Philharmonic Orchestra' : '与纽约爱乐乐团合作演出'
    }
  ]

  const currentEvents = events.length > 0 ? events : defaultEvents

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-center mb-12">{language === 'en' ? 'Upcoming Performances' : '演出安排'}</h1>
        <p className="text-center text-gray-600 mb-8">{language === 'en' ? 'Check out the upcoming concert schedule' : '查看即将举行的音乐会安排'}</p>
        
        <div className="space-y-10">
          {currentEvents.map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-serif">{event.title}</h2>
                    <p className="text-gray-600 mt-1">{event.location || event.venue}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-lg font-medium bg-amber-100 text-amber-800 py-2 px-4 rounded inline-block">
                      {new Date(event.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{event.description}</p>
                <div className="mt-4">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded transition duration-300">
                    {language === 'en' ? 'Get Tickets' : '购买门票'}
                  </button>
                </div>
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