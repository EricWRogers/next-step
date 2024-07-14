import PocketBase, { BaseAuthStore, RecordAuthResponse, RecordModel } from 'pocketbase';

export const pocketBase = new PocketBase('http://127.0.0.1:8090/');

export var authRecord : RecordModel;

function loggedIn(): boolean
{
    return pocketBase.authStore.isValid;
}

function logout ()
{
    pocketBase.authStore.clear();
}

export {loggedIn, logout};