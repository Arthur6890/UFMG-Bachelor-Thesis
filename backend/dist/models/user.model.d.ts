import { Model, Document } from 'mongoose';
interface IUser extends Document {
    serialNumber: string;
    name: string;
    surname: string;
    balance: number;
    profilePhoto: string;
}
export declare const User: Model<IUser>;
export {};
