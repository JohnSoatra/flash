import './globals.css'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast';
import { ReduxProvider } from '@/redux/provider';
import Head from 'next/head';
import Composer from '@/components/template/composer/Composer';

type Prop = { children: React.ReactNode }

export const metadata: Metadata = {
  title: 'Flash',
  description: 'Flash is an commerce website.',
}

const RootLayout = ({ children }: Prop) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <link ref={'icon'} href="/favicon.ico"></link>
      </Head>
      <body className='bg-lightmain'>
          <ReduxProvider>
            <Toaster />
            <Composer>
              {children}
            </Composer>
          </ReduxProvider>
      </body>
    </html>
  )
}


export default RootLayout