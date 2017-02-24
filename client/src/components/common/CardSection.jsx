import React from 'react';

const CardSection = (props) => {
  return (
    <div style={styles.containerStyle}>
      {props.children}
    </div>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };