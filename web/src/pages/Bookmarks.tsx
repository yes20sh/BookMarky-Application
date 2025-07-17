import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BookmarkList from '../components/BookmarkList';
import CreateBookmarkForm from '../components/CreateBookmarkForm';
import { logout } from '../redux/slices/authSlice';
import { useAuthReducer } from '../hooks/useAuthReducer'; 

const Bookmarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthReducer(); 
  useEffect(() => {
    if (!user?.userId) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user?.userId) return null;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">Your Bookmarks</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        <CreateBookmarkForm />
        <BookmarkList />
      </div>
    </div>
  );
};

export default Bookmarks;
