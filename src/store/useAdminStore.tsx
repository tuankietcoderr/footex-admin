import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type AdminStore = {
    isLogin: boolean
    setIsLogin: (isLogin: boolean) => void

    logout: () => void
}

const useAdminStore = create<AdminStore>()(
    persist(
        (set) => ({
            isLogin: false,
            setIsLogin: (isLogin: boolean) => set({ isLogin }),
            logout: () => set({ isLogin: false })
        }),
        {
            name: "admin-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useAdminStore
