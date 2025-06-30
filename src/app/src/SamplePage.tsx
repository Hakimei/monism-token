import React from 'react';
import styles from './SamplePage.module.scss';

const SamplePage: React.FC = () => {
  return (
    <div style={{ padding: 32 }}>
      <div className={styles.rectangle}>
        Primary Rectangle
      </div>
    </div>
  );
};

export default SamplePage; 