import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-4 space-y-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-2">📚 BookMarky</h1>
        <p className="text-lg text-zinc-400">
          Manage your reading list with ease. Save and organize your favorite links in one place.
        </p>

        {user ? (
          <Link
            to="/bookmarks"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            Go to Your Bookmarks
          </Link>
        ) : (
          <Link
            to="/login"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            Login to Continue
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
