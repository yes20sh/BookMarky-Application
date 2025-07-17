import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { IBookmark, CreateBookmarkInput } from '../types/index';
import { BookmarkError } from '../constants/errors';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/bookmarks';

const fetchUserBookmarks = async (userId: string): Promise<IBookmark[]> => {
  const res = await fetch(`${API_URL}/user?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`${BookmarkError.FETCH_FAILED}: ${error}`);
  }
  return res.json();
};

const createBookmark = async (bookmark: CreateBookmarkInput): Promise<IBookmark> => {
  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookmark),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`${BookmarkError.CREATE_FAILED}: ${error}`);
  }
  return res.json();
};

const deleteBookmark = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`${BookmarkError.DELETE_FAILED}: ${error}`);
  }
};

export const useBookmarksQuery = (userId: string) =>
  useQuery({
    queryKey: ['bookmarks', userId],
    queryFn: () => fetchUserBookmarks(userId),
    enabled: !!userId,
  });

export const useCreateBookmarkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBookmark,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', variables.userId] });
    },
  });
};

export const useDeleteBookmarkMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', userId] });
    },
  });
};
