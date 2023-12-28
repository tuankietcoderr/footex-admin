import ITeam, { ETeamStatus } from "@/interface/ITeam"
import apiInstance, { asyncHandler } from "."

class _TeamController {
    async getAll() {
        return await asyncHandler<ITeam[]>(() => apiInstance.get("/admin/team"))
    }
    async updateStatus(teamId: string, status: ETeamStatus) {
        console.log({ teamId, status })
        return await asyncHandler(() => apiInstance.put(`/admin/team/${teamId}/status`, { status }))
    }
}

const TeamController = new _TeamController()

export default TeamController
