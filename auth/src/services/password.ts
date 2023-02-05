import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// @ Just same old password hashing

const scryptAsync = promisify(scrypt);      // scrypt returns callback just converting it to promise

// static methods can be called with creating a instance of the class
export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;   // as Buffer is just for typescript, for it to learn what is buffer
        return `${buffer.toString('hex')}.${salt}`;
    }
    
    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPass, salt] = storedPassword.split('.');
        const buffer = (await scryptAsync(hashedPass, salt, 64)) as Buffer;
        return buffer.toString('hex') === hashedPass;
    }
}