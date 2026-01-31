import './globals.css';
import { LanguageProvider } from './lib/LanguageContext';

const RootLayout = ({ children }) => {
  return (
    <LanguageProvider>
      <html lang="en">
        <head>
          <script charSet="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js?id=L5QCqpvsBcHlJLek&ck=L5QCqpvsBcHlJLek"></script>
        </head>
        <body>
          {children}
        </body>
      </html>
    </LanguageProvider>
  );
};

export default RootLayout;