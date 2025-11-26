import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { IBook, CreateBorrowDto } from '../../../types';
import { useCreateBorrowMutation } from './../../../redux/api/apiSlice';

interface BorrowBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: IBook | null;
  onSuccess: () => void;
}

export default function BorrowBookModal({ isOpen, onClose, book, onSuccess }: BorrowBookModalProps) {
  const [createBorrow, { isLoading }] = useCreateBorrowMutation();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Omit<CreateBorrowDto, 'bookId'>>({
    defaultValues: {
      quantity: 1,
      dueDate: format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    },
  });

  const quantity = watch('quantity');

  if (!isOpen || !book) return null;

  const onSubmit = async (data: Omit<CreateBorrowDto, 'bookId'>) => {
    try {
      await createBorrow({ ...data, bookId: book._id }).unwrap();
      toast.success('Book borrowed successfully!');
      reset();
      onClose();
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to borrow book');
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-0 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Borrow Book</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-11 h-11 hover:text-red-800" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-400 text-sm">Author: {book.author}</p>
            <p className="text-gray-400 text-sm">Available: {book.copies} copies</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
              <input
                {...register('quantity', {
                  required: 'Quantity is required',
                  min: { value: 1, message: 'Minimum 1' },
                  max: { value: book.copies, message: `Only ${book.copies} available` },
                  valueAsNumber: true
                })}
                type="number"
                min="1"
                max={book.copies}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              {errors.quantity && <p className="text-red-400 text-sm mt-1">{errors.quantity.message}</p>}
              {quantity > book.copies && (
                <p className="text-red-400 text-sm mt-1">Exceeds available copies!</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
              <input
                {...register('dueDate', {
                  required: 'Due date is required',
                  validate: (value) => {
                    const selected = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return selected >= today || 'Cannot be in the past';
                  }
                })}
                type="date"
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              {errors.dueDate && <p className="text-red-400 text-sm mt-1">{errors.dueDate.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || quantity > book.copies}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Borrow Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}