import Row from './Row';
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
};

function ColorToken({
  token: { color, name, description, darkModeColor },
}: Props) {
  return (
    <Row>
      <div className={styles.color}>
        <div
          className={styles.colorPreview}
          style={{
            background: `${color}`,
          }}
        />
        <div className={styles.colorValue}>{color}</div>
      </div>
      {darkModeColor ? (
        <div className={styles.color}>
          <div
            className={styles.colorPreview}
            style={{
              background: `${darkModeColor}`,
            }}
          />
          <div className={styles.colorValue}>{darkModeColor}</div>
        </div>
      ) : (
        <div className={styles.color}>N/A</div>
      )}
      <div className={styles.name}>{name}</div>
      <div className={styles.description}>{description}</div>
    </Row>
  );
}

export default ColorToken;
