import IBranch, { EBranchStatus } from "@/interface/IBranch"
import apiInstance, { asyncHandler } from "."

class _BranchController {
    async getAll() {
        return await asyncHandler<IBranch[]>(() => apiInstance.get("/admin/branch"))
    }
    async updateStatus(branchId: string, status: EBranchStatus) {
        console.log({ branchId, status })
        return await asyncHandler(() => apiInstance.put(`/admin/branch/${branchId}/status`, { status }))
    }
}

const BranchController = new _BranchController()

export default BranchController
