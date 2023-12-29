import ReportController from "@/api/report"
import IReport, { EReportStatus } from "@/interface/IReport"
import toast from "react-hot-toast"
import { create } from "zustand"

type ReportStore = {
    reports: IReport[]
    setReports: (reports: IReport[]) => void
    loadReports: () => Promise<void>
    updateReportStatus: (id: string, status: EReportStatus) => Promise<void>
    removeReport: (id: string) => Promise<void>
}

const useReportStore = create<ReportStore>((set, get) => ({
    reports: [],
    setReports: (reports: IReport[]) => set({ reports }),
    loadReports: async () => {
        const { data, success, message } = await ReportController.getAll()
        if (!success) {
            toast.error(message)
        } else {
            set({ reports: data })
        }
    },
    updateReportStatus: async (id: string, status: EReportStatus) => {
        const { success, message } = await ReportController.updateStatus(id, status)
        if (!success) {
            toast.error(message)
        } else {
            const reports = get().reports.map((report) => (report._id === id ? { ...report, status } : report))
            set({ reports })
            toast.success(message)
        }
    },
    removeReport: async (id: string) => {
        const { success, message } = await ReportController.delete(id)
        if (!success) {
            toast.error(message)
        } else {
            const reports = get().reports.filter((report) => report._id !== id)
            set({ reports })
            toast.success(message)
        }
    }
}))

export default useReportStore
