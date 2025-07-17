import type { IBookmark } from '../types/index';
import { useDeleteBookmarkMutation } from '../api/bookmarks';
import { useAuthReducer } from '../hooks/useAuthReducer'; // ✅ Custom hook

const BookmarkItem = ({ bookmark }: { bookmark: IBookmark }) => {
  const { user } = useAuthReducer(); // ✅ Use auth reducer hook
  const userId = user?.userId || '';
  const { mutate: deleteBookmark, isPending } = useDeleteBookmarkMutation(userId);

  const handleDelete = () => {
    if (bookmark._id) {
      deleteBookmark(bookmark._id);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 bg-zinc-800 border border-zinc-700 p-4 rounded-lg shadow-sm">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline truncate max-w-[70%]"
        title={bookmark.title}
      >
        {bookmark.title}
      </a>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 ${
          isPending
            ? 'bg-red-400/60 text-white cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
      >
        {isPending ? '...' : 'Delete'}
      </button>
    </div>
  );
};

export default BookmarkItem;
