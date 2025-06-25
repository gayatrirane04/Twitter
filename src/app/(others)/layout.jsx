import '.././globals.css';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import Loader from '@/components/Loader';
import SessionWrapper from '@/components/SessionWrapper';


export const metadata = {
  title: 'Next Social Media App',
  description: 'A social media app built with Next.js',
};

export default function RootLayout({ children }) {
  return (
   <ClerkProvider>
       <SessionWrapper>
     <html lang="en">
      <body>
       <ClerkLoading>
         <Loader/>
       </ClerkLoading>
      <ClerkLoaded>
       <div className='flex justify-between max-w-6xl mx-auto'>
         <div className='hidden sm:inline border-r h-screen sticky top-0'>
           <LeftSidebar/>
          </div>  
          <div className='w-2xl flex-1'> { children} </div>
          <div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]'>   
           <RightSidebar/>
          </div>
         </div>
      </ClerkLoaded>        
      </body>
     </html>
     </SessionWrapper>
   </ClerkProvider>  
  );
}
