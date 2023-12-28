import IOwner, { EOwnerStatus } from "@/interface/IOwner"
import apiInstance, { asyncHandler } from "."

class _OwnerController {
    async getAll() {
        return await asyncHandler<IOwner[]>(() => apiInstance.get("/admin/owner"))
    }
    async updateStatus(ownerId: string, status: EOwnerStatus) {
        return await asyncHandler(() => apiInstance.put(`/admin/owner/${ownerId}/status`, { status }))
    }
}

const OwnerController = new _OwnerController()

export default OwnerController
