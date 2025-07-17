import { useState } from 'react';
import { useCreateBookmarkMutation } from '../api/bookmarks';
import { useAuth } from '../hooks/useAuth';

const CreateBookmarkForm = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { mutate: createBookmark, isPending } = useCreateBookmarkMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !user) return;

    createBookmark(
      { title, url, userId: user.userId },
      {
        onSuccess: () => {
          setTitle('');
          setUrl('');
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl shadow-md border border-zinc-800 space-y-5 max-w-2xl mx-auto mt-8"
    >
      <h2 className="text-xl font-bold text-center">Add New Bookmark</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-zinc-300">Title</label>
        <input
          type="text"
          className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="e.g. My Favorite Article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-zinc-300">URL</label>
        <input
          type="url"
          className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
          isPending
            ? 'bg-blue-500/60 text-white cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isPending ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  );
};

export default CreateBookmarkForm;
