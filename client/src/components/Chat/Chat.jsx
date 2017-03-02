import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store.js';

import localStyles from './ChatStyles.css';
import styles from '../Styles.css'

const Chat = ({ chat }) => (
  <div>
  <h1>We are in chat room</h1>
   {chat.defaultGroupName}
  </div>
);

export default connect((store) => {
  return {
    chat : store.chat
  };
})(Chat);
