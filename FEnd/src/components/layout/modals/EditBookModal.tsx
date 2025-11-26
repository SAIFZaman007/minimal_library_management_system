import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useUpdateBookMutation } from '../../../redux/api/apiSlice';
import { toast } from 'sonner';
import { useEffect } from 'react';
import type { IBook, UpdateBookDto } from '../../../types';

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: IBook | null;
}

export default function EditBookModal({ isOpen, onClose, book }: EditBookModalProps) {
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateBookDto>();

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || '',
        copies: book.copies,
      });
    }
  }, [book, reset]);

  if (!isOpen || !book) return null;

  const onSubmit = async (data: UpdateBookDto) => {
    try {
      await updateBook({ id: book._id, data }).unwrap();
      toast.success('Book updated successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update book');
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-0 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Edit Book</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-11 h-11 hover:text-red-800" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
            <input
              {...register('author', { required: 'Author is required' })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
            <input
              {...register('genre', { required: 'Genre is required' })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.genre && <p className="text-red-400 text-sm mt-1">{errors.genre.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">ISBN</label>
            <input
              {...register('isbn', { required: 'ISBN is required' })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.isbn && <p className="text-red-400 text-sm mt-1">{errors.isbn.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Copies</label>
            <input
              {...register('copies', { 
                required: 'Copies is required',
                min: { value: 0, message: 'Cannot be negative' },
                valueAsNumber: true
              })}
              type="number"
              min="0"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.copies && <p className="text-red-400 text-sm mt-1">{errors.copies.message}</p>}
            <p className="text-gray-500 text-xs mt-1">If set to 0, book will be unavailable</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Update Book'}
          </button>
        </form>
      </div>
    </div>
  );
}