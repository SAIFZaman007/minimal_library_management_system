import mongoose, { Schema, Document } from 'mongoose';

export interface IBorrow extends Document {
  bookId: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
  borrowDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book ID is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
      validate: {
        validator: function (value: Date) {
          return value > new Date();
        },
        message: 'Due date must be in the future',
      },
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBorrow>('Borrow', borrowSchema);