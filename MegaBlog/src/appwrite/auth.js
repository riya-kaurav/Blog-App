import conf from '../config.js';
import { Client, Account ,ID } from 'appwrite';

export class AuthService{
client = new Client()
account;

constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
        .setProject(conf.appwriteProjectId); // Your Appwrite Project ID
        this.account = new Account(this.client);
}
async createAccount({email, password, name}) {
     try {
 const userAccount = await this.account.create(ID.unique() ,email , password , name);
 if(userAccount){
    return this.login({email , password});
     // call another method 

 }
 else {
    return userAccount;
 }
     }
        catch (error) {
            throw error;

}

}

async login({email ,password}) {
    try {
        await this.account.createEmailPasswordSession(email , password);

    }
    catch(error){
        throw error;
    }
}


async getCurrentUser(){

    try {
        return await this.account.get();
        
    }
 catch (error) {
     throw error;
 }

 return null;
}
async logout() {
    try {
         await this.account.deleteSessions();

    }
    catch (error) {
        throw error;
    }
}






}

const authService = new AuthService();

export default AuthService;