let backendHost;
const apiVersion = 'v0';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'yougis.ru') {
  backendHost = 'http://yougis.ru';
} else {
  backendHost = 'http://localhost:3300';
}

export const API_ROOT = `${backendHost}/graphql`;