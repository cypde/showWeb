import './globals.css';
import { LanguageProvider } from './lib/LanguageContext';

const RootLayout = ({ children }) => {
  return (
    <LanguageProvider>
      <html lang="en">
        <head>
          <script charSet="UTF-8" id="LA_COLLECT" src="https://sdk.51.la/js-sdk-pro.min.js"></script>
          <script dangerouslySetInnerHTML={{ __html: 'LA.init({id:"L5QCqpvsBcHlJLek",ck:"L5QCqpvsBcHlJLek",autoTrack:true,hashMode:true,screenRecord:true})' }}></script>
        </head>
        <body>
          {children}
        </body>
      </html>
    </LanguageProvider>
  );
};

export default RootLayout;