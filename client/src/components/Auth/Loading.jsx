import React from 'react';
import styles from './AuthStyles.css';
import { Grid } from 'semantic-ui-react'

const Loading = () => (
	<div className={styles.outer}>
		<div className={styles.inner}>
			<img src='img/loading.gif'/>
		</div>
	</div>
);

export default Loading;
