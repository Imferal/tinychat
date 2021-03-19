import { io } from 'socket.io-client';

const socket = io('https://tinychatserver.herokuapp.com');

export default socket