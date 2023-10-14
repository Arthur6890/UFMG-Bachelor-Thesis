import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
	serialNumber: string;
	name: string;
	surname: string;
	balance: number;
	profilePhoto: string;
}

const userSchema = new Schema<IUser>({
	serialNumber: String,
	name: String,
	surname: String,
	balance: Number,
	profilePhoto: String,

});

export const User: Model<IUser> = mongoose.model('User', userSchema, 'User');
