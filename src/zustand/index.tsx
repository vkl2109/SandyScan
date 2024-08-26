import { create } from 'zustand'

interface AuthState {
    name: string
    img: string
    isLogged: boolean
    setAuth: (newAuth: AuthState) => void
}

interface QRState {
    link: string
    setLink: (newLink: string) => void
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

export const useQRStore = create<QRState>((set) => ({
    link: '',
    setLink: (newLink: string) => set(() => ({
        link: newLink
    }))
}))