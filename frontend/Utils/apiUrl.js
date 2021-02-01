import {APP_ENV} from '@env';

const apiUrl = () =>
  APP_ENV === 'development' ? 'http://192.168.0.45:8080' : '/';

export default apiUrl;
