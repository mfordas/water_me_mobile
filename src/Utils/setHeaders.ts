import { getData } from './asyncStorage';

export type Headers = {
  Accept: string;
  'Content-Type': string;
  'x-auth-token': string | void;
};

const setHeaders = async (): Promise<Headers> => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-auth-token': await getData('token'),
});

export default setHeaders;
