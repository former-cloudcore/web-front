import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get('/api/messages');
            setMessages(response.data);
        };

        fetchMessages();

        socket.on('chat message', (msg) => {
            setMessages((messages) => [...messages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const submitMessage = (e) => {
        e.preventDefault();
        socket.emit('chat message', message);
        setMessage('');
    };

    return (
        <div className="chat">
            <ul id="messages">
                {messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={submitMessage}>
                <input
                    id="m"
                    autoComplete="off"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button>Send</button>
            </form>
        </div>
    );
};

export default Chat;
