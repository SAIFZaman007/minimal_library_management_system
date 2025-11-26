import { X, Loader2 } from 'lucide-react';
import { useGetBorrowSummaryQuery } from '../../../redux/api/apiSlice';

interface BorrowSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BorrowSummaryModal({ isOpen, onClose }: BorrowSummaryModalProps) {
  const { data: summary, isLoading } = useGetBorrowSummaryQuery(undefined, {
    skip: !isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-0 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800  max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-800">
          <h2 className="text-xl font-bold text-white">Borrow Summary</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-11 h-11 hover:text-red-800" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : summary && summary.length > 0 ? (
            <div className="space-y-3">
              {summary.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.bookTitle}</h3>
                      <p className="text-gray-400 text-sm">ISBN: {item.isbn}</p>
                    </div>
                    <div className=" text-white px-4 py-2 font-bold">
                      {item.totalQuantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No borrows recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}