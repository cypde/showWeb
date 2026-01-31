import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../utils/LanguageContext'
import { supabase } from '../../utils/supabase'

export default function ContactPage() {
  const { language } = useLanguage()
  const [contactData, setContactData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const { data, error } = await supabase
          .from('contact')
          .select('*')
          .eq('language', language)

        if (error) {
          console.error('Error fetching contact data:', error)
        } else {
          setContactData(data)
        }
      } catch (error) {
        console.error('Error fetching contact data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContactData()
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
  const defaultContact = {
    management_name: language === 'en' ? 'Elite Artists Management' : '精英艺术家管理',
    management_email: 'info@eliteartists.com',
    management_phone: '+1 (555) 123-4567',
    general_email: language === 'en' ? 'contact@musicianname.com' : 'contact@musicianname.com',
    press_email: language === 'en' ? 'press@musicianname.com' : 'press@musicianname.com'
  }

  const currentContact = contactData.length > 0 ? contactData[0] : defaultContact

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-center mb-12">{language === 'en' ? 'Contact' : '联系'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif mb-6">{language === 'en' ? 'Get in Touch' : '联系我们'}</h2>
            <p className="mb-6">
              {language === 'en' ? 'For bookings, inquiries, or general questions, please reach out using the information below. We look forward to hearing from you.' : '预订、咨询或一般问题，请使用以下信息联系我们。我们期待听到您的消息。'}
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{language === 'en' ? 'Management' : '经纪管理'}</h3>
                <p className="text-gray-700">{currentContact.management_name || currentContact.management_company || defaultContact.management_name}</p>
                <p className="text-gray-700">{language === 'en' ? 'Phone:' : '电话:'} {currentContact.management_phone || defaultContact.management_phone}</p>
                <p className="text-gray-700">{language === 'en' ? 'Email:' : '邮箱:'} {currentContact.management_email || defaultContact.management_email}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">{language === 'en' ? 'General Inquiries' : '一般咨询'}</h3>
                <p className="text-gray-700">{language === 'en' ? 'Email:' : '邮箱:'} {defaultContact.general_email}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">{language === 'en' ? 'Press & Media' : '媒体咨询'}</h3>
                <p className="text-gray-700">{language === 'en' ? 'Press Office' : '新闻办公室'}</p>
                <p className="text-gray-700">{language === 'en' ? 'Email:' : '邮箱:'} {defaultContact.press_email}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">{language === 'en' ? 'Follow Me' : '关注我'}</h3>
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
            <h2 className="text-2xl font-serif mb-6">{language === 'en' ? 'Send a Message' : '发送消息'}</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Name' : '姓名'}</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Your name' : '您的姓名'}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Email' : '邮箱'}</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Your email' : '您的邮箱'}
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Subject' : '主题'}</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Subject' : '主题'}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Message' : '消息'}</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Your message' : '您的消息'}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded transition duration-300"
              >
                {language === 'en' ? 'Send Message' : '发送消息'}
              </button>
            </form>
          </div>
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