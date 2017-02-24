import React from 'react';
import styles from '../../styles';

const ButtonFull = ({ onPress, title }) => (
  <div onPress={onPress}>
    <div style={styles.buttonFull}>
      <div style={styles.textMed}>{title}</div>
    </div>
  </div>
);

export default ButtonFull;