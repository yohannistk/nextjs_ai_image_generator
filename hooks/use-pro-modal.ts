import { create } from 'zustand'

type Store = {
  isOpen: boolean
  setOpen: (value : boolean) => void
}

export const useProModal = create<Store>()((set) => ({
    isOpen : false,
    setOpen: (value) => set(() => ({ isOpen: value })),
}))

