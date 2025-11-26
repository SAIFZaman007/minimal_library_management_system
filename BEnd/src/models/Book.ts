import mongoose, { Schema, Document, Model, CallbackWithoutResultAndOptionalError } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema : Schema<IBook> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, 'Copies is required'],
      min: [0, 'Copies cannot be negative'],
      default: 1,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre<IBook>('save', async function () { 

  const doc = this;

  if (doc.copies === 0) {
    doc.available = false;
  } else if (doc.copies > 0 && !doc.available) {
    doc.available = true;
  }

});

export default mongoose.model<IBook>('Book', bookSchema);