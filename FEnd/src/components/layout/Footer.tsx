export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-auto">
      <div className="mx-auto px-6 py-6">
        <div className="flex justify-between items-center gap-9">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MLMS. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with React, Redux Toolkit, TS & Solid Dedication.
          </p>
        </div>
      </div>
    </footer>
  );
}

