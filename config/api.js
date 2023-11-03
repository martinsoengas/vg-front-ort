import { Platform } from 'react-native';

// const iosUrl = 'http://192.168.1.117:3500';
const iosUrl = 'http://localhost:3500';
const androidUrl = 'http://10.0.2.2:3500';
const apiUrl = Platform.OS === 'ios' ? iosUrl : androidUrl;

export default apiUrl;
