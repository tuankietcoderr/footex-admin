import GuestController from "@/api/guest"
import IGuest, { EGuestStatus } from "@/interface/IGuest"
import toast from "react-hot-toast"
import { create } from "zustand"

type GuestStore = {
    guests: IGuest[]
    setGuests: (guests: IGuest[]) => void
    loadGuests: () => Promise<void>
    updateGuestStatus: (id: string, status: EGuestStatus) => Promise<void>
}

const useGuestStore = create<GuestStore>((set, get) => ({
    guests: [],
    setGuests: (guests: IGuest[]) => set({ guests }),
    loadGuests: async () => {
        const { data, success, message } = await GuestController.getAll()
        if (!success) {
            toast.error(message)
        } else {
            set({ guests: data })
        }
    },
    updateGuestStatus: async (id: string, status: EGuestStatus) => {
        const { success, message } = await GuestController.updateStatus(id, status)
        if (!success) {
            toast.error(message)
        } else {
            const guests = get().guests.map((guest) => (guest._id === id ? { ...guest, status } : guest))
            set({ guests })
            toast.success(message)
        }
    }
}))

export default useGuestStore
