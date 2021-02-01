import {getData} from '../Utils/asyncStorage';

const setHeaders = async () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-auth-token': await getData('token'),
});

export default setHeaders;
