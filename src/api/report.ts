import IReport, { EReportStatus } from "@/interface/IReport"
import apiInstance, { asyncHandler } from "."

class _ReportController {
    async getAll() {
        return await asyncHandler<IReport[]>(() => apiInstance.get("/admin/report"))
    }
    async updateStatus(reportId: string, status: EReportStatus) {
        return await asyncHandler(() => apiInstance.put(`/admin/report/${reportId}/status`, { status }))
    }

    async delete(reportId: string) {
        return await asyncHandler(() => apiInstance.delete(`/admin/report/${reportId}`))
    }
}

const ReportController = new _ReportController()

export default ReportController
