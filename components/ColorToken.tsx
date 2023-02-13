import styles from './ColorToken.module.css';

export type Token = {
  id: string;
  color: string;
  name: string;
  description?: string;
  darkModeColor?: string;
};

type Props = {
  token: Token;
  updateToken: (token: Token) => void;
};

function ColorToken({
  token: { color, name, description, darkModeColor },
}: Props) {
  return (
    <div className={styles.colorToken}>
      <div
        className={styles.color}
        style={{
          background: `${color}`,
        }}
      />
      <div className={styles.value}>{color}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.description}>{description}</div>
      {darkModeColor ? (
        <div
          className={styles.color}
          style={{
            background: `${darkModeColor}`,
          }}
        />
      ) : (
        <div className={styles.color}>N/A</div>
      )}
      <div className={styles.darkMode}>{darkModeColor ?? 'N/A'}</div>
    </div>
  );
}

export default ColorToken;
