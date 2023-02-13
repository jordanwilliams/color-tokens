import styles from './ColorToken.module.css';

type TokenProps = {
  color: string;
  name: string;
  description?: string;
  darkModeColor?: string;
};

type Props = {
  token: TokenProps;
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
      ></div>
      <div className={styles.value}>{color}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.description}>{description}</div>
      <div
        className={styles.color}
        style={{
          background: `${darkModeColor}`,
        }}
      >
        {darkModeColor ?? 'N/A'}
      </div>
      <div className={styles.darkMode}>{darkModeColor ?? 'N/A'}</div>
    </div>
  );
}

export default ColorToken;
