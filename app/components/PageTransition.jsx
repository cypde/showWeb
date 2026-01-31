'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const PageTransition = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = `${pathname}?${searchParams}`;
  const contentRef = useRef(null);

  useEffect(() => {
    // 开始过渡动画
    setIsTransitioning(true);
    setIsVisible(false);

    // 等待退出动画完成后显示新内容
    const exitTimer = setTimeout(() => {
      setIsVisible(true);
      // 重置过渡状态
      const enterTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // 与进入动画持续时间匹配

      return () => clearTimeout(enterTimer);
    }, 500); // 与退出动画持续时间匹配

    return () => clearTimeout(exitTimer);
  }, [key]);

  return (
    <div className="relative w-full">
      <div
        ref={contentRef}
        key={key}
        className={`transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-10 scale-95'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;