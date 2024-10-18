import React, {useState} from 'react';
import {StatusBar} from 'react-native';

const StatusBarNew = () => {
  return (
    <StatusBar
      animated={true}
      backgroundColor={'#2ab7a8'}
      barStyle={'dark-content'} // 'default', 'dark-content', 'light-content'
      hidden={false}
      // showHideTransition={'dark-content'} // 'fade', 'slide', 'none'
    />
  );
};

export default StatusBarNew;
