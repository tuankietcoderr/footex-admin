import OwnerController from "@/api/owner"
import IOwner, { EOwnerStatus } from "@/interface/IOwner"
import toast from "react-hot-toast"
import { create } from "zustand"

type OwnerStore = {
    owners: IOwner[]
    setOwners: (owners: IOwner[]) => void
    loadOwners: () => Promise<void>
    updateOwnerStatus: (id: string, status: EOwnerStatus) => Promise<void>
}

const useOwnerStore = create<OwnerStore>((set, get) => ({
    owners: [],
    setOwners: (owners: IOwner[]) => set({ owners }),
    loadOwners: async () => {
        const { data, success, message } = await OwnerController.getAll()
        if (!success) {
            toast.error(message)
        } else {
            set({ owners: data })
        }
    },
    updateOwnerStatus: async (id: string, status: EOwnerStatus) => {
        const { success, message } = await OwnerController.updateStatus(id, status)
        if (!success) {
            toast.error(message)
        } else {
            const owners = get().owners.map((owner) => (owner._id === id ? { ...owner, status } : owner))
            set({ owners })
            toast.success(message)
        }
    }
}))

export default useOwnerStore
