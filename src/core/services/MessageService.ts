
import { authInstance } from "../api/apiInstances";

export interface Conversation {
    user_id: number;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        role: string;
        organization?: {
            id: number;
            name: string;
            logo_url?: string;
        } | null;
    };
    last_message?: {
        id: number;
        from_user_id: number;
        to_user_id: number;
        body: string;
        is_read: boolean;
        created_at: string;
    };
    unread_count: number;
}

export interface Message {
    id: number;
    from_user_id: number;
    to_user_id: number;
    body: string;
    is_read: boolean;
    created_at: string;
    sender?: {
        id: number;
        first_name: string;
        last_name: string;
        profile_picture_url?: string;
    };
}

export interface ChatResponse {
    data: Message[];
    other_user: {
        id: number;
        first_name: string;
        last_name: string;
        role: string;
        organization?: {
            id: number;
            name: string;
            logo_url?: string;
        } | null;
    };
}

export class MessageAPI {
    static async getConversations() {
        return authInstance.get<{ data: Conversation[] }>("/messages/conversations");
    }

    static async getChat(otherUserId: number | string) {
        return authInstance.get<ChatResponse>(`/messages/chat/${otherUserId}`);
    }

    static async sendMessage(otherUserId: number | string, body: string) {
        return authInstance.post(`/messages/send/${otherUserId}`, { body });
    }

    static async markAsRead(messageId: number) {
        return authInstance.post(`/messages/${messageId}/mark-read`); // Note: Backend implementation for single message mark read not shown in plan, assume generic update or use existing mark-all-read
    }

    static async markAllRead() {
        return authInstance.post('/messages/mark-all-read');
    }

    static async getUnreadCount() {
        return authInstance.get("/messages/unread-count");
    }

    static async searchUsers(query: string) {
        return authInstance.get<{ data: any[] }>(`/messages/search-users`, { params: { query } });
    }
}
