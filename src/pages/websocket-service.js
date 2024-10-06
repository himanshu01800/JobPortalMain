import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;
let currentSubscription = null;

export const connectWebSocket = (onConnected, onMessageReceived) => {
    const socket = new SockJS('http://localhost:8080/ws');  // Your backend WebSocket URL
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        onConnected();
        console.log('Connected to WebSocket');
    });
};

export const subscribeToRoom = (roomId, onMessageReceived) => {
    if (currentSubscription) {
        currentSubscription.unsubscribe();
    }

    // Subscribe to the room based on roomId
    currentSubscription = stompClient.subscribe(`/queue/messages/${roomId}`, (message) => {
        onMessageReceived(JSON.parse(message.body));
    });
};

export const sendMessage = (roomId, chatMessage) => {
    // Send the message to the specific room
    stompClient.send(`/app/chat`, {}, JSON.stringify(chatMessage));
};
