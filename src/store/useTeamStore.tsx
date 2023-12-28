import TeamController from "@/api/team"
import ITeam, { ETeamStatus } from "@/interface/ITeam"
import toast from "react-hot-toast"
import { create } from "zustand"

type TeamStore = {
    teams: ITeam[]
    setTeams: (teams: ITeam[]) => void
    loadTeams: () => Promise<void>
    updateTeamStatus: (id: string, status: ETeamStatus) => Promise<void>
}

const useTeamStore = create<TeamStore>((set, get) => ({
    teams: [],
    setTeams: (teams: ITeam[]) => set({ teams }),
    loadTeams: async () => {
        const { data, success, message } = await TeamController.getAll()
        if (!success) {
            toast.error(message)
        } else {
            set({ teams: data })
        }
    },
    updateTeamStatus: async (id: string, status: ETeamStatus) => {
        const { success, message } = await TeamController.updateStatus(id, status)
        if (!success) {
            toast.error(message)
        } else {
            const teams = get().teams.map((team) => (team._id === id ? { ...team, status } : team))
            set({ teams })
            toast.success(message)
        }
    }
}))

export default useTeamStore
