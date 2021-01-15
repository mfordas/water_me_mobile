import {APP_ENV, DEV_URL, PUBLIC_URL} from '@env';

const apiUrl = () => (APP_ENV === 'development' ? DEV_URL : PUBLIC_URL);

export default apiUrl;
