import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import classNames from 'classnames';
import {
    getChatsByUser,
    getChatMessages,
    createChat,
} from '../../utils/chat-service.ts';
import { getUsers } from '../../utils/user-service.ts';
import styles from './Chat.module.css';
import { SOCKET_URL } from '../../utils/consts.ts';
import usePostCheckingUserHook from '../CreatePost/usePostsCheckingUserHook.tsx';
import { ChatResponse } from '../../utils/chat-service.ts';
import { UserResponse } from '../../utils/user-service.ts';
import { formatImage } from '../../utils/utils.ts';

const Chat = () => {
    const [chatIdState, setChatIdState] = useState('');
    const [messageState, setMessageState] = useState('');
    const [errorState, setErrorState] = useState('');
    const [chatsState, setChatsState] = useState<ChatResponse[]>([]);
    const [usersState, setUsersState] = useState<UserResponse[]>([]);
    const [newChatUserState, setNewChatUserState] = useState('');
    const [messagesState, setMessagesState] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isNewChat, setIsNewChat] = useState(false);

    const { loggedIn, loading, notLoggedInRender } = usePostCheckingUserHook({
        middleText: 'Please log in to use the chat',
    });

    useEffect(() => {
        const fetchChatsAndUsers = async () => {
            const chats = await getChatsByUser();
            const users = (await getUsers()).filter(
                (user) => user._id !== localStorage.getItem('userId')
            );
            setChatsState(chats);
            setUsersState(users);
        };
        fetchChatsAndUsers();
    }, []);

    useEffect(() => {
        const newSocket = socketIOClient(SOCKET_URL, {rejectUnauthorized: false});
        setSocket(newSocket);
        newSocket.on('message', (convo) => {
            try {
                setMessagesState(convo);
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        });
        return () => newSocket.disconnect();
    }, []);

    const handleOpenChat = async (chatId) => {
        if (chatIdState) {
            socket?.emit('leaveRoom', chatIdState);
        }

        const messages = chatId.length ? await getChatMessages(chatId) : [];
        setMessagesState(messages);
        setChatIdState(chatId);
        socket?.emit('joinRoom', chatId);
        setIsNewChat(false);
    };

    const handleSendMessage = async () => {
        try {
            socket?.emit('sendMessage', {
                chatId: chatIdState,
                message: messageState,
                token: localStorage.getItem('accessToken'),
            });
            setMessageState('');
        } catch (error) {
            setErrorState(
                'An error occurred while sending the message. Please try again later.'
            );
        }
    };

    const handleNewChat = async () => {
        try {
            const existingChat = chatsState.find(
                (chat) =>
                    chat.users.includes(newChatUserState) &&
                    chat.users.includes(localStorage.getItem('userId'))
            );

            if (existingChat) {
                setErrorState('Chat already exists with this user');
            } else {
                const chat = await createChat([
                    newChatUserState,
                    localStorage.getItem('userId'),
                ]);
                setChatsState([...chatsState, chat]);
                setNewChatUserState('');
                setChatIdState(chat._id);
                setMessagesState([]);
                socket?.emit('joinRoom', chat._id);
                setIsNewChat(false);
            }
        } catch (error) {
            setErrorState(
                'An error occurred while creating chat. Please try again later.'
            );
        }
    };

    const selectedChat = chatsState.find((chat) => chat._id === chatIdState);
    const otherUserId =
        selectedChat &&
        selectedChat.users.find(
            (userId) => userId !== localStorage.getItem('userId')
        );
    const selectedUser = usersState.find((user) => user._id === otherUserId);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return notLoggedInRender;
    }
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatSidebar}>
                <div className={styles.headerText}>Chat</div>
                {errorState && <div className={styles.alert}>{errorState}</div>}
                <select
                    name="chatId"
                    value={chatIdState}
                    className={classNames(styles.input, styles.chatId)}
                    onChange={(e) => handleOpenChat(e.target.value)}
                >
                    <option value="">Select</option>
                    {chatsState.map((chat) => {
                        const otherUserId = chat.users.find(
                            (userId) =>
                                userId !== localStorage.getItem('userId')
                        );
                        const otherUser = usersState.find(
                            (user) => user._id === otherUserId
                        );
                        return (
                            <option key={chat._id} value={chat._id}>
                                {otherUser?.name || 'Unknown'}
                            </option>
                        );
                    })}
                </select>
                <select
                    name="newChatUser"
                    value={newChatUserState}
                    className={classNames(styles.input, styles.newChatUser)}
                    onChange={(e) => setNewChatUserState(e.target.value)}
                >
                    <option value="">Select a user</option>
                    {usersState
                        .filter(
                            (user) =>
                                !chatsState.find((chat) =>
                                    chat.users.includes(user._id)
                                )
                        )
                        .map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name || 'Unknown'}
                            </option>
                        ))}
                </select>
                <button
                    className={styles.generalButton}
                    onClick={handleNewChat}
                    disabled={!newChatUserState}
                >
                    New Chat
                </button>
            </div>
            {chatIdState && (
                <div className={styles.chatContent}>
                    {selectedUser && (
                        <div className={styles.chatHeader}>
                            <img
                                src={formatImage(selectedUser.image)}
                                alt={selectedUser.name}
                            />
                            <div className={styles.username}>
                                {selectedUser.name}
                            </div>
                        </div>
                    )}
                    <div className={styles.chat}>
                        {messagesState.map((message, index) => (
                            <div
                                key={index}
                                className={classNames(styles.message, {
                                    [styles.sentByCurrentUser]:
                                        message.user ===
                                        localStorage.getItem('userId'),
                                    [styles.sentByOtherUser]:
                                        message.user !==
                                        localStorage.getItem('userId'),
                                })}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    {!isNewChat && (
                        <div className={styles.sendMessage}>
                            <input
                                name="message"
                                placeholder="Type here..."
                                type="text"
                                value={messageState}
                                className={classNames(
                                    styles.input,
                                    styles.messageInput
                                )}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && messageState.trim()) {
                                        handleSendMessage();
                                    }
                                }}
                                onChange={(e) => {
                                    setMessageState(e.target.value);
                                }}
                            />
                            <button
                                className={styles.generalButton}
                                onClick={handleSendMessage}
                                disabled={!messageState.trim()}
                            >
                                Send
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chat;
