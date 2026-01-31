import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../utils/LanguageContext'
import { supabase } from '../../utils/supabase'

export default function BioPage() {
  const { language } = useLanguage()
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const { data, error } = await supabase
          .from('about')
          .select('*')
          .eq('language', language)
          .single()

        if (error) {
          console.error('Error fetching about data:', error)
        } else {
          setAboutData(data)
        }
      } catch (error) {
        console.error('Error fetching about data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
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
  const defaultAbout = {
    title: language === 'en' ? 'Charlotte Clapperton' : '夏洛特·克拉珀顿',
    content: language === 'en' ? 
      'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice, exceptional musicianship, and captivating stage presence. With a repertoire spanning from Baroque to contemporary opera, she has performed in prestigious venues across Europe and North America.\n\nBorn in London, Charlotte began her musical training at the Royal Academy of Music, where she graduated with distinction. She further honed her craft at the Guildhall School of Music & Drama, studying under the renowned mezzo-soprano Sarah Walker.\n\nRecent highlights include her debut at the Royal Opera House, Covent Garden, as Cherubino in Mozart\'s Le nozze di Figaro, and performances with the London Symphony Orchestra, the Metropolitan Opera Orchestra, and the Berlin Philharmonic.\n\nCharlotte\'s unique interpretation of classic roles has earned her critical acclaim and a dedicated following. She is particularly renowned for her portrayals of Carmen, Octavian in Der Rosenkavalier, and Orfeo in Gluck\'s Orfeo ed Euridice.' : 
      '夏洛特·克拉珀顿是一位国际知名的女中音歌唱家，以其 powerful 的嗓音、卓越的音乐才华和迷人的舞台表现力而闻名。她的曲目涵盖从巴洛克到现代歌剧，曾在欧洲和北美的 prestigious venues 演出。\n\n夏洛特出生于伦敦，在皇家音乐学院开始她的音乐训练，并以优异成绩毕业。她在 Guildhall 音乐与戏剧学院进一步磨练技艺，师从著名女中音歌唱家 Sarah Walker。\n\n最近的亮点包括她在伦敦皇家歌剧院首次亮相，在莫扎特的《费加罗的婚礼》中饰演凯鲁比诺，以及与伦敦交响乐团、大都会歌剧院乐团和柏林爱乐乐团的合作演出。\n\n夏洛特对经典角色的独特诠释赢得了评论界的好评和忠实的追随者。她尤其以饰演卡门、《玫瑰骑士》中的奥克塔维安和格鲁克的《奥菲欧与尤丽狄茜》中的奥菲欧而闻名。'
  }

  const currentAbout = aboutData || defaultAbout

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-center mb-12">{language === 'en' ? 'Biography' : '个人简介'}</h1>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image 
                src={aboutData?.image_url || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20elegant%20mezzo-soprano%20singer%2C%20classical%20style%2C%20high%20quality%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3'} 
                alt={currentAbout.title} 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-serif mb-4">{language === 'en' ? `About ${currentAbout.title}` : `关于 ${currentAbout.title}`}</h2>
            {currentAbout.content.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-serif mb-6">{language === 'en' ? 'Artistic Approach' : '艺术理念'}</h2>
          {aboutData?.artistic_approach ? (
            aboutData.artistic_approach.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="mb-4 leading-relaxed">
              {language === 'en' ? 
                'Charlotte is dedicated to bringing depth and authenticity to every role she portrays. She believes in the power of opera to connect with audiences on an emotional level, and her performances are noted for their dramatic intensity and vocal beauty.' : 
                '夏洛特致力于为她所扮演的每个角色带来深度和真实性。她相信歌剧具有与观众情感连接的力量，她的表演以其戏剧性的强度和 vocal beauty 而著称。'
              }
            </p>
          )}
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