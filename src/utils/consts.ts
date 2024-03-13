export const SERVER_URL = import.meta.env.MODE === 'development'?'http://localhost:3000/api':'/api';
export const SOCKET_URL = import.meta.env.MODE === 'development'?'http://localhost:3000':'https://node26.cs.colman.ac.il/';

export const DEFAULT_IMAGE = 'https://media0.giphy.com/media/hryis7A55UXZNCUTNA/giphy.gif';