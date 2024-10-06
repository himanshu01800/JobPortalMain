

import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { jwtDecode } from 'jwt-decode';

const Chat = ({ jobseeker, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const stompClientRef = useRef(null);
  const [currUser, setCurrUser] = useState("");

  // Decode JWT to get current user email
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrUser(decoded.sub); // Assuming the email is stored in 'sub'
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch previous messages between currUser and jobseeker
  useEffect(() => {
    const fetchMessages = async () => {
      if (currUser && jobseeker.email) {
        try {
          const response = await fetch(`http://localhost:8080/api/messages?sender=${currUser}&receiver=${jobseeker.email}`);
          if (!response.ok) throw new Error('Failed to fetch messages');
          const data = await response.json();
          const sortedMessages = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          setMessages(sortedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [currUser, jobseeker]);

  // WebSocket connection setup
  useEffect(() => {
    const connect = () => {
      const socket = new SockJS('http://localhost:8080/ws');
      const stompClient = Stomp.over(socket);
      stompClientRef.current = stompClient;

      stompClient.connect({}, () => {
        console.log('Connected to WebSocket');

        // Subscribe to messages for the current user
        stompClient.subscribe(`/topic/messages/${currUser}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log('Received message:', receivedMessage);

          // Check if the message is between the current user and the jobseeker
          const isValidMessage =
            (receivedMessage.receiver === currUser && receivedMessage.sender === jobseeker.email) ||
            (receivedMessage.sender === currUser && receivedMessage.receiver === jobseeker.email);

          if (isValidMessage) {
            setMessages(prevMessages => {
              const exists = prevMessages.some(msg => msg.id === receivedMessage.id);
              return exists ? prevMessages : [...prevMessages, receivedMessage]; // Avoid duplicates
            });
          }
        });
      }, (error) => {
        console.error('WebSocket connection error:', error);
      });
    };

    if (currUser && jobseeker) {
      connect();
    }

    // Cleanup on component unmount
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log('Disconnected from WebSocket');
        });
      }
    };
  }, [currUser, jobseeker]);

  // Handle sending messages
  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const messageObject = {
      id: Date.now(), // Generate a temporary ID based on timestamp
      sender: currUser,
      receiver: jobseeker.email,
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send('/app/chat', {}, JSON.stringify(messageObject));
      console.log('Sent message:', messageObject);
      setMessages(prevMessages => {
        const exists = prevMessages.some(msg => msg.timestamp === messageObject.timestamp);
        return exists ? prevMessages : [...prevMessages, messageObject]; // Avoid duplicates
      });
      setNewMessage(""); // Clear input field
    } else {
      console.error('STOMP client is not connected');
    }
  };

  return (
    <div className="chat-screen">
      <button onClick={onBack} className="back-button">Back</button>
      <h2>Chat with {jobseeker.email}</h2>
      <div className="chat-messages" style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === currUser ? "me" : "them"}`}>
            <strong>{message.sender}: </strong> {message.message}
            <div style={{ fontSize: 'small', color: 'gray' }}>{new Date(message.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className="chat-input" style={{ display: 'flex' }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px' }}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
