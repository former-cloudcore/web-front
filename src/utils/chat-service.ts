import apiClient from './api-client';

export interface ChatResponse {
    _id: string;
    users: string[];
    messages: string[];
    __v: number;
}

export const getChatsByUser = async (): Promise<ChatResponse[]> => {
    const { data, status } = await apiClient.get(
        `/chat/${localStorage.getItem('userId')}/userChats`
    );
    if (status !== 200) {
        throw new Error('Error getting chats');
    }
    return data;
};

export const getChatMessages = async (id: string): Promise<string[]> => {
    const { data, status } = await apiClient.get(`/chat/${id}/messages`);
    if (status !== 200) {
        throw new Error('Error getting messages');
    }
    return data;
};

export const postMessage = async (
    chatId: string,
    text: string
): Promise<void> => {
    const { status } = await apiClient.post(`/chat/messages`, {
        text,
        chatId,
    });
    if (status !== 200) {
        throw new Error('Error posting message');
    }
};

export const createChat = async (users: string[]): Promise<ChatResponse> => {
    const { data, status } = await apiClient.post('/chat', {
        users,
    });
    if (status !== 200) {
        throw new Error('Error creating chat');
    }
    return data;
};
