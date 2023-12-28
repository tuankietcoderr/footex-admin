import IReport, { EReportStatus } from "@/interface/IReport"
import apiInstance, { asyncHandler } from "."

class _ReportController {
    async getAll() {
        return await asyncHandler<IReport[]>(() => apiInstance.get("/admin/report"))
    }
    async updateStatus(reportId: string, status: EReportStatus) {
        return await asyncHandler(() => apiInstance.put(`/admin/report/${reportId}/status`, { status }))
    }
}

const ReportController = new _ReportController()

export default ReportController
