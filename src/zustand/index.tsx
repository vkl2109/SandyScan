import { create } from 'zustand'

interface AuthState {
    name: string
    img: string
    isLogged: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
    name: '',
    img: '',
    isLogged: false,
    setAuth: (newAuth: AuthState) => set(() => ({
        name: newAuth.name,
        img: newAuth.img,
        isLogged: newAuth.isLogged
    }))
}))