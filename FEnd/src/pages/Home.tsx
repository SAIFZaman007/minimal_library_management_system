import { useState } from 'react';
import { Pencil, Trash2, BookOpen, Loader2, Plus } from 'lucide-react';
import { useGetBooksQuery, useDeleteBookMutation } from '../redux/api/apiSlice';
import { toast } from 'sonner';
import type { IBook } from '../types';
import AddBookModal from './../components/layout/modals/AddBookModal';
import EditBookModal from './../components/layout/modals/EditBookModal';
import BorrowBookModal from './../components/layout/modals/BorrowBookModal';
import BorrowSummaryModal from './../components/layout/modals/BorrowSummaryModal';

export default function Home() {
  const { data: books, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        await deleteBook(id).unwrap();
        toast.success('Book deleted!');
      } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to delete');
      }
    }
  };

  const handleEdit = (book: IBook) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleBorrow = (book: IBook) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gray-950">
      <div className="mx-auto px-6 py-8">

        <div className="flex mx-auto justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">All Books</h1>
            <p className="text-gray-400">{books?.length || 0} books</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-cyan-800 text-white px-6 py-3 w-39 h-10 font-semibold transition flex items-center gap-2"
          >
            <Plus className="w-9 h-10" />
            Create Book
          </button>
        </div>

        <div className="space-y-3 items-center">
          {books?.map((book) => (
            <div
              key={book._id}
              className="bg-gray-900 border border-gray-600 p-6 hover:border-gray-700 transition"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-9 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        book.available && book.copies > 0
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <h3 className="text-xl font-semibold text-white">{book.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-3">{book.description || 'No description'}</p>
                  <div className="flex gap-5 text-sm">
                    <span className="text-gray-500">Author: <span className="text-gray-300">{book.author}</span></span>
                    <span className="text-gray-500">Genre: <span className="text-gray-300">{book.genre}</span></span>
                    <span className="text-gray-500">ISBN: <span className="text-gray-300">{book.isbn}</span></span>
                    <span className="text-gray-500">Copies: <span className="text-gray-300">{book.copies}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-5">
                  <button
                    onClick={() => handleEdit(book)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-800 transition"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(book._id, book.title)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {book.available && book.copies > 0 && (
                    <button
                      onClick={() => handleBorrow(book)}
                      className="p-2 text-green-400 hover:text-green-300 hover:bg-gray-800 rounded-lg transition"
                      title="Borrow"
                    >
                      <BookOpen className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {books?.length === 0 && (
            <div className="text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No books yet. Add your first book!</p>
            </div>
          )}
        </div>
      </div>

      <AddBookModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditBookModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBook(null);
        }} 
        book={selectedBook}
      />
      <BorrowBookModal 
        isOpen={isBorrowModalOpen}
        onClose={() => {
          setIsBorrowModalOpen(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        onSuccess={() => setIsSummaryModalOpen(true)}
      />
      <BorrowSummaryModal 
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
      />
    </div>
  );
}