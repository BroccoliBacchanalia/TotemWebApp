import React from 'react';
import styles from './AuthStyles.css';
import { Grid } from 'semantic-ui-react'

const Loading = () => (
	<div className={styles.spinner}>
		<div className={styles.img}>
			<img src='img/loading.gif'/>
		</div>
	</div>
);

export default Loading;
