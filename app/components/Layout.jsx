import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;