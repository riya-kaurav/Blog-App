import config from '../config.js';
import { Client, ID , Database , Storage , Query } from 'appwrite';


export class Service{

client = new Client();
databases;
bucket;

constructor() {
    this.client
        .setEndpoint(config.appwriteUrl) // Your Appwrite Endpoint
        .setProject(config.appwriteProjectId); // Your Appwrite Project ID

        this.databases = new Database(this.client);
        this.bucket = new Storage(this.client);// Your Appwrite Bucket ID

    
}

async createdPost({title, slug , content , featuredImage , status , userId}) {
    try {
 
return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
            userId,
        }
)

    }
    catch (error) {
        throw error;
    }



}

async updatePost( slug, {title,   content , featuredImage , status }){
    try{


return await this.databases.updateDocument(
    config.appwriteDatabaseId,
    config.appwriteCollectionId,
    slug,
    {
        title,
        content,
        featuredImage,
        status,

    }
)

    }
    catch(error){
        throw error;
    }

}

async deletePost(slug ){
    try {
         await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
            
        )
        return true;

    }
    catch (error){
        throw error;
        return false;

    }
}
async getPost(slug){
    try{
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
        )
    }
    catch (error){
        throw(error);
    }
}
async getPosts(queries = [Query.equal("status", "active")]) {
    try {
        return await this.databases.listDocuments(
            config.appwrite.DatabaseId,
            config.appwriteCollectionId,
            queries,
            

        )
    }
    catch (error) {
        throw(error);
    }
}

// file upload service

async uploadFile(file) {
    
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
            
        )

    }
    catch (error) {
 throw error;       
    }

}

async deleteFile(fileId) {
    try {
        return await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        return true;
    }
    catch (error) {
        throw error;
    }
}
getFilePreview(fileId) {
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )

        
}
}


const service = new Service();
export default service