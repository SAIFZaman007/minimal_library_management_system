import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { CreateBookDto } from '../../../types';
import { useCreateBookMutation } from './../../../redux/api/apiSlice';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateBookDto>();

  if (!isOpen) return null;

  const onSubmit = async (data: CreateBookDto) => {
    try {
      await createBook(data).unwrap();
      toast.success('Book added successfully!');
      reset();
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to add book');
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-0 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-600">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Add Book</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-11 h-11 hover:text-red-800" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter book title"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
            <input
              {...register('author', { required: 'Author is required' })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter author name"
            />
            {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
            <input
              {...register('genre', { required: 'Genre is required' })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g., Fiction, Science"
            />
            {errors.genre && <p className="text-red-400 text-sm mt-1">{errors.genre.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">ISBN</label>
            <input
              {...register('isbn', { required: 'ISBN is required' })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="978-3-16-148410-0"
            />
            {errors.isbn && <p className="text-red-400 text-sm mt-1">{errors.isbn.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Brief description (optional)"
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
              defaultValue={1}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.copies && <p className="text-red-400 text-sm mt-1">{errors.copies.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
}