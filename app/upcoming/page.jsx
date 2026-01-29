'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import supabase from '../lib/supabase';
import { useTranslation } from '../lib/i18n';

const UpcomingPage = () => {
  const { t } = useTranslation();
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5; // 每页显示5个演出

  useEffect(() => {
    // 从 Supabase 数据库获取演出信息
    const fetchPerformances = async () => {
      try {
        // 计算偏移量
        const offset = (currentPage - 1) * itemsPerPage;
        
        // 获取分页数据
        const { data, error, count } = await supabase
          .from('performances')
          .select('*', { count: 'exact' })
          .eq('is_active', true)
          .order('date', { ascending: true })
          .range(offset, offset + itemsPerPage - 1);

        if (error) {
          console.error('获取演出信息失败:', error);
        } else {
          setPerformances(data || []);
          setTotalItems(count || 0);
          setTotalPages(Math.ceil((count || 0) / itemsPerPage));
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformances();
  }, [currentPage]);

  // 默认演出信息，当数据库中没有数据时使用
  const defaultPerformances = [
    {
      id: 1,
      title: "Royal Albert Hall",
      location: "London, UK",
      date: "2024-03-15",
      time: "19:30",
      description: "Solo recital featuring works by Bach, Handel, and Purcell",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20stage%20performance%20venue%2C%20elegant%20interior%2C%20concert%20hall%2C%20royal%20albert%20hall&image_size=landscape_16_9"
    },
    {
      id: 2,
      title: "La Scala",
      location: "Milan, Italy",
      date: "2024-04-22",
      time: "20:00",
      description: "Performances in Mozart's Le nozze di Figaro as Cherubino",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20grand%20stage%2C%20luxury%20venue%2C%20la%20scala&image_size=landscape_16_9"
    },
    {
      id: 3,
      title: "Carnegie Hall",
      location: "New York, USA",
      date: "2024-05-10",
      time: "19:30",
      description: "Collaboration with the New York Philharmonic Orchestra",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20hall%20interior%2C%20modern%20design%2C%20orchestra%20stage%2C%20carnegie%20hall&image_size=landscape_16_9"
    },
    {
      id: 4,
      title: "Berlin Philharmonie",
      location: "Berlin, Germany",
      date: "2024-06-05",
      time: "20:00",
      description: "Recital with pianist Daniel Barenboim",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20concert%20hall%20interior%2C%20orchestra%20stage%2C%20berlin%20philharmonie&image_size=landscape_16_9"
    },
    {
      id: 5,
      title: "Sydney Opera House",
      location: "Sydney, Australia",
      date: "2024-07-18",
      time: "19:30",
      description: "Performances in Bizet's Carmen as the title role",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20iconic%20design%2C%20sydney%20opera%20house&image_size=landscape_16_9"
    }
  ];

  // 生成页码数组
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  // 处理页码变化
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // 滚动到页面顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

  const displayData = performances.length > 0 ? performances : defaultPerformances;
  const isDefaultData = performances.length === 0;

  return (
    <Layout>
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center">{t.upcoming.title}</h1>
          
          <div className="space-y-12">
            {displayData.map((event) => (
              <div key={event.id} className="flex flex-col md:flex-row items-center bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-64 object-cover rounded"
                  />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h2>
                  <p className="text-gray-600 mb-4">{event.location}</p>
                  <div className="flex flex-col md:flex-row md:space-x-8 mb-4">
                    <div>
                      <p className="text-sm font-bold uppercase text-gray-500 mb-1">Date</p>
                      <p className="text-lg">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase text-gray-500 mb-1">Time</p>
                      <p className="text-lg">{event.time}</p>
                    </div>
                  </div>
                  <p className="text-lg mb-6">{event.description}</p>
                  <a href="#" className="inline-block bg-black text-white px-8 py-3 font-bold hover:bg-gray-800 transition-colors">{t.upcoming.bookTickets}</a>
                </div>
              </div>
            ))}
          </div>
          
          {/* 分页控件 */}
          {!isDefaultData && totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-4">
                {/* 上一页按钮 */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-sm rounded-md sm:px-4 sm:py-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  Previous
                </button>
                
                {/* 页码 */}
                {generatePageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm rounded-md sm:px-4 sm:py-2 ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                  >
                    {page}
                  </button>
                ))}
                
                {/* 下一页按钮 */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 text-sm rounded-md sm:px-4 sm:py-2 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  Next
                </button>
              </div>
              
              {/* 分页信息 */}
              <div className="text-gray-600 text-sm">
                Page {currentPage} of {totalPages} ({totalItems} items)
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default UpcomingPage;