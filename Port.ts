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

const Port = {
  BASE_URL: getBaseUrl(),
};

export default Port;
