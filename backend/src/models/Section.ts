// src/models/Section.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISection extends Document {
  serialNumber: string;
  name: string;
  surname: string;
  balance: number;
  profilePhoto: string;
}

const sectionSchema = new Schema<ISection>({
  serialNumber: String,
  name: String,
  surname: String,
  balance: Number,
  profilePhoto: String,
});

export default mongoose.model<ISection>('Section', sectionSchema);
