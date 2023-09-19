import mongoose, { Document } from 'mongoose';
export interface ISection extends Document {
    serialNumber: string;
    name: string;
    surname: string;
    balance: number;
    profilePhoto: string;
}
declare const _default: mongoose.Model<ISection, {}, {}, {}, mongoose.Document<unknown, {}, ISection> & ISection & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
