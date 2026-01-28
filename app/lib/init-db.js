import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yuiugsbbnzjbdygprbih.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_1Jd4DzhQfyonYLHHZNZK8w_rML2SLE3';
const supabase = createClient(supabaseUrl, supabaseKey);

// 初始化数据库表结构和数据
const initDatabase = async () => {
  try {
    console.log('开始初始化数据库...');

    // 1. 创建 performances 表
    console.log('创建 performances 表...');
    const { error: createPerformancesError } = await supabase
      .from('performances')
      .insert([
        {
          id: 1,
          title: 'Royal Albert Hall',
          location: 'London, UK',
          date: '2024-03-15',
          time: '19:30',
          description: 'Solo recital featuring works by Bach, Handel, and Purcell',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20stage%20performance%20venue%2C%20elegant%20interior%2C%20concert%20hall%2C%20royal%20albert%20hall&image_size=landscape_16_9'
        },
        {
          id: 2,
          title: 'La Scala',
          location: 'Milan, Italy',
          date: '2024-04-22',
          time: '20:00',
          description: 'Performances in Mozart\'s Le nozze di Figaro as Cherubino',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20grand%20stage%2C%20luxury%20venue%2C%20la%20scala&image_size=landscape_16_9'
        },
        {
          id: 3,
          title: 'Carnegie Hall',
          location: 'New York, USA',
          date: '2024-05-10',
          time: '19:30',
          description: 'Collaboration with the New York Philharmonic Orchestra',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20hall%20interior%2C%20modern%20design%2C%20orchestra%20stage%2C%20carnegie%20hall&image_size=landscape_16_9'
        },
        {
          id: 4,
          title: 'Berlin Philharmonie',
          location: 'Berlin, Germany',
          date: '2024-06-05',
          time: '20:00',
          description: 'Recital with pianist Daniel Barenboim',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20concert%20hall%20interior%2C%20orchestra%20stage%2C%20berlin%20philharmonie&image_size=landscape_16_9'
        },
        {
          id: 5,
          title: 'Sydney Opera House',
          location: 'Sydney, Australia',
          date: '2024-07-18',
          time: '19:30',
          description: 'Performances in Bizet\'s Carmen as the title role',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20iconic%20design%2C%20sydney%20opera%20house&image_size=landscape_16_9'
        }
      ]);

    if (createPerformancesError) {
      console.error('创建 performances 表失败:', createPerformancesError);
    } else {
      console.log('performances 表创建成功');
    }

    // 2. 创建 gallery 表
    console.log('创建 gallery 表...');
    const { error: createGalleryError } = await supabase
      .from('gallery')
      .insert([
        {
          id: 1,
          title: 'Performance at Royal Albert Hall',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20stage%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=landscape_4_3'
        },
        {
          id: 2,
          title: 'Backstage at La Scala',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20costume%2C%20backstage%20photo%2C%20professional%20lighting%2C%20high%20quality&image_size=landscape_4_3'
        },
        {
          id: 3,
          title: 'With London Symphony Orchestra',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20orchestra%2C%20concert%20performance%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_4_3'
        },
        {
          id: 4,
          title: 'Rehearsal at Metropolitan Opera',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20rehearsing%2C%20professional%20photography%2C%20natural%20lighting%2C%20high%20quality&image_size=landscape_4_3'
        },
        {
          id: 5,
          title: 'Curtain Call at Carnegie Hall',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20taking%20bow%20on%20stage%2C%20audience%20applause%2C%20professional%20photography&image_size=landscape_4_3'
        },
        {
          id: 6,
          title: 'Red Carpet Event',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20elegant%20gown%2C%20red%20carpet%20event%2C%20professional%20photography&image_size=landscape_4_3'
        },
        {
          id: 7,
          title: 'Opera Production',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20performing%20in%20opera%20production%2C%20elaborate%20stage%20set%2C%20professional%20lighting&image_size=landscape_4_3'
        },
        {
          id: 8,
          title: 'Solo Recital',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classical%20singer%20in%20concert%20hall%2C%20solo%20performance%2C%20professional%20photography&image_size=landscape_4_3'
        },
        {
          id: 9,
          title: 'With Conductor',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20conductor%2C%20backstage%20photo%2C%20professional%20photography&image_size=landscape_4_3'
        }
      ]);

    if (createGalleryError) {
      console.error('创建 gallery 表失败:', createGalleryError);
    } else {
      console.log('gallery 表创建成功');
    }

    // 3. 创建 about 表
    console.log('创建 about 表...');
    const { error: createAboutError } = await supabase
      .from('about')
      .insert([
        {
          id: 1,
          title: 'About Charlotte Clapperton',
          content: 'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice, exceptional musicianship, and captivating stage presence. With a repertoire spanning from Baroque to contemporary opera, she has performed in prestigious venues across Europe and North America.\n\nBorn in London, Charlotte began her musical training at the Royal Academy of Music, where she graduated with distinction. She further honed her craft at the Guildhall School of Music & Drama, studying under the renowned mezzo-soprano Sarah Walker.\n\nRecent highlights include her debut at the Royal Opera House, Covent Garden, as Cherubino in Mozart\'s Le nozze di Figaro, and performances with the London Symphony Orchestra, the Metropolitan Opera Orchestra, and the Berlin Philharmonic.\n\nCharlotte\'s unique interpretation of classic roles has earned her critical acclaim and a dedicated following. She is particularly renowned for her portrayals of Carmen, Octavian in Der Rosenkavalier, and Orfeo in Gluck\'s Orfeo ed Euridice.',
          image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20elegant%20mezzo-soprano%20singer%2C%20classical%20style%2C%20high%20quality%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3'
        }
      ]);

    if (createAboutError) {
      console.error('创建 about 表失败:', createAboutError);
    } else {
      console.log('about 表创建成功');
    }

    // 4. 创建 contact 表
    console.log('创建 contact 表...');
    const { error: createContactError } = await supabase
      .from('contact')
      .insert([
        {
          id: 1,
          management_name: 'John Smith',
          management_company: 'Artists Management Ltd.',
          management_email: 'email@example.com',
          management_phone: '+44 (0) 20 1234 5678',
          press_name: 'Jane Doe',
          press_company: 'Media Relations',
          press_email: 'press@example.com',
          press_phone: '+44 (0) 20 8765 4321'
        }
      ]);

    if (createContactError) {
      console.error('创建 contact 表失败:', createContactError);
    } else {
      console.log('contact 表创建成功');
    }

    console.log('数据库初始化完成');
  } catch (error) {
    console.error('初始化数据库时发生错误:', error);
  }
};

// 导出初始化函数
export default initDatabase;

// 如果直接运行此脚本，则执行初始化
if (import.meta.url === `file://${process.argv[1]}`) {
  initDatabase();
}