import React from 'react';
import styles from './AuthStyles.css';

export default class Loading extends React.Component {
	render(){
		return (
      <div className={styles.img}>
        <img src='https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif'/>
      </div>
		)
	}
}