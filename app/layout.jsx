import './globals.css';
import { LanguageProvider } from './lib/LanguageContext';

const RootLayout = ({ children }) => {
  return (
    <LanguageProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </LanguageProvider>
  );
};

export default RootLayout;