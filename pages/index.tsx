import { useState, useEffect } from 'react';
import { kebabCase } from 'lodash';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

import ColorToken, { Token } from '@/components/ColorToken';
import Row from '@/components/Row';
import SetTokenModal from '@/components/SetTokenModal';

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

  const [isAddingToken, setIsAddingToken] = useState(false);

  /**
   * Set the color variables in the stylesheet based on the user's
   * color tokens on mount. Also update the variables when the color
   * scheme changes
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

  /**
   * Adds a new color token
   */
  function addToken(token: Token) {
    const nextTokens = {
      ...tokens,
      [token.id]: token,
    };

    // Add the new token to local state
    setTokens(nextTokens);

    // Create a css variable for the token
    setCssVariable(token);
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
        <div className={styles.container}>
          <div className={styles.tokenList}>
            <Row>
              <span style={{ fontWeight: 700 }}>Color</span>
              <span style={{ fontWeight: 700 }}>Dark Mode (optional)</span>
              <span style={{ fontWeight: 700 }}>Name</span>
              <span style={{ fontWeight: 700 }}>Description</span>
            </Row>
            {Object.values(tokens).map((token) => (
              <ColorToken token={token} key={token.id} />
            ))}
          </div>
          <div className={styles.addTokenContainer}>
            <button
              className={styles.addTokenButton}
              onClick={() => setIsAddingToken(true)}
            >
              <svg
                className={styles.addTokenButtonIcon}
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {isAddingToken && (
            <SetTokenModal
              addToken={addToken}
              closeAddTokenModal={() => setIsAddingToken(false)}
              className={inter.className}
            />
          )}
        </div>

        <div className={styles.styledElement}>
          <select
            className={styles.select}
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
            The color of this element is styled by the selected color token. Try
            changing the color scheme.
          </p>
        </div>
      </main>
    </>
  );
}
