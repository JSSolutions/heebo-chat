import React from 'react'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-css-effects/genie.css'
import 'react-s-alert/dist/s-alert-default.css'

const ALERT_CONFIG = {
  stack: true,
  effect: 'genie',
};

export const throwError = (error, callback) => {
  if (error) {
    Alert.error(error.reason, ALERT_CONFIG);
  } else {
    typeof callback === 'function' && callback();
  }
};