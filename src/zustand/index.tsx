import { create } from 'zustand'

interface AuthState {
    name: string
    img: string
    uid: string
    isLogged: boolean
    setAuth: (newAuth: NewAuthState) => void
}

interface NewAuthState {
    name: string | undefined
    img: string | undefined
    uid: string | undefined
    isLogged: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
    name: '',
    img: '',
    uid: '',
    isLogged: false,
    setAuth: (newAuth: NewAuthState) => set(() => ({
        name: newAuth.name,
        img: newAuth.img,
        uid: newAuth.uid,
        isLogged: newAuth.isLogged
    }))
}))

interface QRState {
    link: string
    setLink: (newLink: string) => void
}

export const useQRStore = create<QRState>((set) => ({
    link: '',
    setLink: (newLink: string) => set(() => ({
        link: newLink
    }))
}))

interface SearchState {
    search: string,
    setSearch: (newSearch: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
    search: '',
    setSearch: (newSearch: string) => set(() => ({
        search: newSearch
    }))
}))

interface OpenScanState {
    openScan: boolean,
    toggle: () => void,
}

export const useOpenScanStore = create<OpenScanState>((set) => ({
    openScan: false,
    toggle: () => set((state) => ({
        openScan: !state.openScan
    }))
}))

interface OpenAuthState {
    openAuth: boolean,
    open: () => void,
    close: () => void,
}

export const useOpenAuthStore = create<OpenAuthState>((set) => ({
    openAuth: false,
    open: () => set(() => ({
        openAuth: true
    })),
    close: () => set(() =>({
        openAuth: false
    }))
}))