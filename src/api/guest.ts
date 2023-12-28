import IGuest, { EGuestStatus } from "@/interface/IGuest"
import apiInstance, { asyncHandler } from "."

class _GuestController {
    async getAll() {
        return await asyncHandler<IGuest[]>(() => apiInstance.get("/admin/guest"))
    }
    async updateStatus(guestId: string, status: EGuestStatus) {
        return await asyncHandler(() => apiInstance.put(`/admin/guest/${guestId}/status`, { status }))
    }
}

const GuestController = new _GuestController()

export default GuestController
