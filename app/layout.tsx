import './globals.css'
import { Metadata } from 'next'
import SessionProvider from '@/components/provider/Session';
import { Toaster } from 'react-hot-toast';
import { Provider } from '@/redux/provider';
import Head from 'next/head';
import Compose from '@/components/template/compose/Compose';

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
        <SessionProvider>
          <Provider>
            <Toaster />
            <Compose>
              {children}
            </Compose>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}


export default RootLayout