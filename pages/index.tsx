import { useState } from 'react';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

import ColorToken, { TokenProps } from '@/components/ColorToken';

const inter = Inter({ subsets: ['latin'] });

const black = {
  id: '1',
  color: '#333',
  name: 'Black',
  description: 'The base black color',
};
const blue = {
  id: '2',
  color: '#4353ff',
  name: 'Primary FG',
  description: 'The primary foreground color',
};

type TokenRecord = Record<TokenProps['id'], TokenProps>;

export default function Home() {
  const [tokens, setTokens] = useState<TokenRecord>({
    [black.id]: black,
    [blue.id]: blue,
  });

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
          {Object.values(tokens).map((token) => (
            <ColorToken token={token} key={token.id} />
          ))}
        </div>
      </main>
    </>
  );
}
