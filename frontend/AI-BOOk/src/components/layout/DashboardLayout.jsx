import Navbar from './Navbar';

const DashboardLayout = ({ children, onCreateBookClick }) => {
  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col font-display antialiased">
      <Navbar onCreateBookClick={onCreateBookClick} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
