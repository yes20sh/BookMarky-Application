import { useAuth } from '../hooks/useAuth';
import { useBookmarksQuery } from '../api/bookmarks';
import BookmarkItem from './BookmarkItem';

const BookmarkList = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useBookmarksQuery(user?.userId || '');

  return (
    <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl shadow-lg border border-zinc-800 max-w-2xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Bookmarks</h2>

      {isLoading && <p className="text-zinc-400 text-center">Loading bookmarks...</p>}

      {error && (
        <p className="text-red-400 text-center">
          Failed to load bookmarks. Please try again.
        </p>
      )}

      {!isLoading && !error && data?.length === 0 && (
        <p className="text-zinc-400 text-center">No bookmarks yet. Start saving some!</p>
      )}

      {!isLoading &&
        !error &&
        data?.map((bookmark) => (
          <BookmarkItem key={bookmark._id} bookmark={bookmark} />
        ))}
    </div>
  );
};

export default BookmarkList;
