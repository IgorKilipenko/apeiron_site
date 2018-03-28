let backendHost;
const apiVersion = 'v0';

const hostname = window && window.location && window.location.hostname;

if(hostname.match(/localhost(:[0-9])*/ig)) {
  backendHost = 'localhost:3300';
} else {
  backendHost = hostname;
}

export const API_ROOT = `'http://'${backendHost}/graphql`;