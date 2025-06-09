import { Client, Account, Databases, Storage } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

if (!endpoint) throw new Error('VITE_APPWRITE_ENDPOINT is not defined in your .env file');
if (!projectId) throw new Error('VITE_APPWRITE_PROJECT_ID is not defined in your .env file');
if (!databaseId) throw new Error('VITE_APPWRITE_DATABASE_ID is not defined in your .env file');
if (!collectionId) throw new Error('VITE_APPWRITE_COLLECTION_ID is not defined in your .env file');

const client = new Client();

client
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = databaseId;
export const COLLECTION_ID = collectionId;

// Collection Attributes
export const BLOG_ATTRIBUTES = {
    title: 'string',
    content: 'string',
    authorId: 'string',
    authorName: 'string',
    imageUrl: 'string',
    url: 'string',
    slug: 'string',
    createdAt: 'string'
}; 