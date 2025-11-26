import { useState } from 'react';
import { Toaster } from 'sonner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BorrowSummaryModal from './components/layout/modals/BorrowSummaryModal';

function App() {
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar onBorrowSummaryClick={() => setIsSummaryModalOpen(true)} />
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
      <BorrowSummaryModal 
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
      />
      <Toaster position="top-right" richColors closeButton duration={3000} />
    </div>
  );
}

export default App;