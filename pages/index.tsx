import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

import ColorToken from '@/components/ColorToken';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Color Tokens</title>
        <meta name="description" content="Color tokens prototype" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.heading}>Color Tokens</h1>
        <div className={styles.tokenList}>
          <ColorToken
            token={{
              color: '#333',
              name: 'Black',
              description: 'The base black color',
            }}
          />
          <ColorToken
            token={{
              color: '#4353ff',
              name: 'Primary FG',
              description: 'The primary foreground color',
            }}
          />
        </div>
      </main>
    </>
  );
}
