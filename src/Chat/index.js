// src/Chat.js
import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [input, setInput] = useState('');

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    // Effect to handle initial visibility based on screen size
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth <= 900) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        };
        // Add event listener
        window.addEventListener('resize', handleResize);

        // Check initial screen size
        handleResize();

        // Clean up event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, timestamp: new Date() }]);
            setInput('');
        }
    };

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };


    return (
        <div>
            {/* Toggle button */}
            <div className="chat-toggle" onClick={handleToggle}>
                {isVisible ? '✖ Close Chat' : '💬 Open Chat'}
            </div>
            
            {/* Conditionally render the chat */}
            <div className={`chat-container ${!isVisible ? 'hidden' : ''}`}>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            <span>{new Date(message.timestamp).toLocaleTimeString()}:</span> {message.text}
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
