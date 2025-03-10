import { Platform } from 'react-native';

const getBaseUrl = (): string => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000';
  } else if (Platform.OS === 'ios') {
    return 'http://192.168.31.158:5000';
  } else {
    return 'http://localhost:5000';
  }
};

const getWebSocketUrl = (): string => {
  if (Platform.OS === 'android') {
    return 'ws://10.0.2.2:5000';
  } else if (Platform.OS === 'ios') {
    return 'ws://192.168.31.158:5000';
  } else {
    return 'ws://localhost:5000';
  }
};

const Port = {
  BASE_URL: getBaseUrl(),
  WebSocket_URL: getWebSocketUrl(),
};

export default Port;
