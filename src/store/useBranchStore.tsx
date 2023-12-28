import BranchController from "@/api/branch"
import IBranch, { EBranchStatus } from "@/interface/IBranch"
import toast from "react-hot-toast"
import { create } from "zustand"

type BranchStore = {
    branches: IBranch[]
    setBranches: (branches: IBranch[]) => void
    loadBranches: () => Promise<void>
    updateBranchStatus: (id: string, status: EBranchStatus) => Promise<void>
}

const useBranchStore = create<BranchStore>((set, get) => ({
    branches: [],
    setBranches: (branches: IBranch[]) => set({ branches }),
    loadBranches: async () => {
        const { data, success, message } = await BranchController.getAll()
        if (!success) {
            toast.error(message)
        } else {
            set({ branches: data })
        }
    },
    updateBranchStatus: async (id: string, status: EBranchStatus) => {
        const { success, message } = await BranchController.updateStatus(id, status)
        if (!success) {
            toast.error(message)
        } else {
            const branches = get().branches.map((branch) => (branch._id === id ? { ...branch, status } : branch))
            set({ branches })
            toast.success(message)
        }
    }
}))

export default useBranchStore
