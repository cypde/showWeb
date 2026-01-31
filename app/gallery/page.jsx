'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import supabase from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';

const GalleryPage = () => {
  const { language } = useLanguage();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9; // 每页显示9张图片

  useEffect(() => {
    // 从 Supabase 数据库获取画廊图片
    const fetchGallery = async () => {
      try {
        // 计算偏移量
        const offset = (currentPage - 1) * itemsPerPage;
        
        // 获取分页数据
        const { data, error, count } = await supabase
          .from('gallery')
          .select('*', { count: 'exact' })
          .eq('is_active', true)
          .eq('language', language)
          .order('order_position', { ascending: true })
          .range(offset, offset + itemsPerPage - 1);

        if (error) {
          console.error('获取画廊图片失败:', error);
        } else {
          setGallery(data || []);
          setTotalItems(count || 0);
          setTotalPages(Math.ceil((count || 0) / itemsPerPage));
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [currentPage, language]);

  // 默认画廊图片，当数据库中没有数据时使用
  const defaultGallery = [
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20stage%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=landscape_4_3",
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20costume%2C%20backstage%20photo%2C%20professional%20lighting%2C%20high%20quality&image_size=landscape_4_3",
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20orchestra%2C%20concert%20performance%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_4_3",
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20rehearsing%2C%20professional%20photography%2C%20natural%20lighting%2C%20high%20quality&image_size=landscape_4_3",
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20taking%20bow%20on%20stage%2C%20audience%20applause%2C%20professional%20photography&image_size=landscape_4_3",
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20elegant%20gown%2C%20red%20carpet%20event%2C%20professional%20photography&image_size=landscape_4_3",
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20performing%20in%20opera%20production%2C%20elaborate%20stage%20set%2C%20professional%20lighting&image_size=landscape_4_3",
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classical%20singer%20in%20concert%20hall%2C%20solo%20performance%2C%20professional%20photography&image_size=landscape_4_3",
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20conductor%2C%20backstage%20photo%2C%20professional%20photography&image_size=landscape_4_3"
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

  const displayData = gallery.length > 0 ? gallery : defaultGallery;
  const isDefaultData = gallery.length === 0;

  return (
    <Layout>
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center font-handwritten">{language === 'en' ? 'Gallery' : '画廊'}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((item, index) => (
              <div key={isDefaultData ? index : item.id} className="rounded-xl overflow-hidden shadow-elegant card-hover">
                <div className="p-3 bg-white">
                  <h3 className="text-sm font-medium text-gray-700 font-handwritten">{isDefaultData ? `Performance ${index + 1}` : (item.title || `Performance ${index + 1}`)}</h3>
                </div>
                <img 
                  src={isDefaultData ? item : item.image_url} 
                  alt={isDefaultData ? `Gallery Image ${index + 1}` : item.title} 
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
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
                  className={`px-3 py-2 text-sm rounded-md sm:px-4 sm:py-2 font-sans ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  Previous
                </button>
                
                {/* 页码 */}
                {generatePageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm rounded-md sm:px-4 sm:py-2 font-sans ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                  >
                    {page}
                  </button>
                ))}
                
                {/* 下一页按钮 */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 text-sm rounded-md sm:px-4 sm:py-2 font-sans ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  Next
                </button>
              </div>
              
              {/* 分页信息 */}
              <div className="text-gray-600 text-sm font-sans">
                Page {currentPage} of {totalPages} ({totalItems} items)
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;