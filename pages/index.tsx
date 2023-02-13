import { useState, useEffect } from 'react';
import { kebabCase } from 'lodash';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

import ColorToken, { Token } from '@/components/ColorToken';

const inter = Inter({ subsets: ['latin'] });

function getCssVariableNameFromToken(token: Token): string {
  return kebabCase(token.name);
}

/**
 * Adds a CSS variable to the stylesheet when given a token
 */
function setCssVariable(token: Token) {
  const name = getCssVariableNameFromToken(token);
  let color = token.color;

  // Check if the token has a dark mode color defined. If the user is
  // in dark mode, we'll use that for the variable instead of the default color
  if (
    token.darkModeColor &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    color = token.darkModeColor;
  }

  document.documentElement.style.setProperty(`--${name}`, color);
}

const black: Token = {
  id: '1',
  color: '#333',
  name: 'Black',
  description: 'The base black color',
};

const primary: Token = {
  id: '2',
  color: '#4353ff',
  name: 'Primary FG',
  description: 'The primary foreground color',
  darkModeColor: '#ffc700',
};

/**
 * The shape of the state data
 */
type TokenRecord = Record<Token['id'], Token>;

export default function Home() {
  const [tokens, setTokens] = useState<TokenRecord>({
    [black.id]: black,
    [primary.id]: primary,
  });

  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('light');

  const [selectedTokenId, setSelectedTokenId] = useState<Token['id']>(
    primary.id
  );

  const selectedToken = tokens[selectedTokenId];

  /**
   * Set the color variables in the stylesheet based on the user's
   * color tokens on mount
   */
  useEffect(() => {
    Object.values(tokens).forEach((token) => {
      setCssVariable(token);
    });
  }, [colorScheme]);

  /**
   * Set up an event listener to track the user's color scheme changes.
   * We use it to update the css variables when switching between dark mode
   * and light mode. There may be a better way that we can do this. We could
   * explore insterting a style that just overwrites the variables. But this
   * does the trick for the purposes of the prototype
   */
  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        setColorScheme(event.matches ? 'dark' : 'light');
      });
  }, []);

  function updateToken(token: Token) {
    const nextTokens = {
      ...tokens,
      [token.id]: token,
    };

    setTokens(nextTokens);
  }

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
            <ColorToken
              token={token}
              updateToken={updateToken}
              key={token.id}
            />
          ))}
        </div>

        <div className={styles.element}>
          <select
            value={selectedTokenId}
            onChange={(event) => setSelectedTokenId(event.target.value)}
          >
            {Object.values(tokens).map((token) => (
              <option value={token.id} key={token.id}>
                {token.name}
              </option>
            ))}
          </select>
          <p
            style={{
              color: `var(--${getCssVariableNameFromToken(selectedToken)})`,
            }}
          >
            This is an element that is styled by the selected color token
          </p>
        </div>
      </main>
    </>
  );
}
