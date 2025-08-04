import { create } from 'zustand'

export const useModalStore = create((set) => ({
  open: false,
  postId: null,
  setOpen: (open) => set({ open }),
  setPostId: (postId) => set({ postId }),
}))