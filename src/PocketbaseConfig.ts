import PocketBase, { BaseAuthStore, RecordAuthResponse, RecordModel } from 'pocketbase';

export const pocketBase = new PocketBase('http://127.0.0.1:8090/');

export var authRecord: RecordModel;

export interface Connection {
    id: string;
}

export interface UserConnections {
    id: string;
    username: string;
    connections: {
        connections: Connection[];
    };
}

export interface UserConnectionRequest {
    id: string;
    sender_id: string;
    sender_username: string;
    target_id: string;
    target_username: string;
}

function loggedIn(): boolean {
    return pocketBase.authStore.isValid;
}

function logout() {
    pocketBase.authStore.clear();
}

export { loggedIn, logout };