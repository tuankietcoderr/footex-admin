import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table.type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import IGuest from "@/interface/IGuest"
import IReport, { EReportStatus } from "@/interface/IReport"
import useReportStore from "@/store/useReportStore"
import { vilizeReportStatus } from "@/utils/status"
import React, { useEffect, useState } from "react"

const ReportPage = () => {
    const { reports, updateReportStatus } = useReportStore()
    const [_reports, _setReports] = useState<IReport[]>(reports)
    useEffect(() => {
        _setReports(reports)
    }, [reports])
    const header = ["STT", "Tiêu đề", "Lí do", "Người tố cáo", "Đối tượng bị tố cáo", "Trạng thái"]
    const columns: ColumnProps<IReport>[] = [
        {
            headRef: "STT",
            render: (report, index) => index + 1
        },
        {
            headRef: "Tiêu đề",
            render: (report) => report.title ?? "Không xác định"
        },
        {
            headRef: "Lí do",
            render: (report) => report.reason
        },
        {
            headRef: "Người tố cáo",
            render: (report) => (report.reporter as IGuest)?.name ?? "Không xác định"
        },
        {
            headRef: "Đối tượng bị tố cáo",
            render: (report) => (report.reported as IGuest)?.name
        },
        {
            headRef: "Trạng thái",
            render: (report) => (
                <div className='flex justify-center'>
                    <Select
                        onValueChange={(v) => onUpdateStatus(report._id!, v as EReportStatus)}
                        value={report.status}
                        defaultValue={report.status}
                    >
                        <SelectTrigger className='w-fit'>
                            <SelectValue placeholder='Trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='w-fit'>
                            {Object.values(EReportStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {vilizeReportStatus(status)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }
    ]

    function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
        _setReports(reports.filter((report) => report.title.toLowerCase().includes(e.target.value)))
    }

    function onReset() {
        _setReports(reports)
    }

    function onChangeStatus(status: EReportStatus) {
        _setReports(reports.filter((report) => report.status === status))
    }

    async function onUpdateStatus(id: string, status: EReportStatus) {
        await updateReportStatus(id, status)
    }

    return (
        <div className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
                <Input className='flex-1' placeholder='Tìm kiếm...' onChange={onSearch} />
                <Select onValueChange={onChangeStatus}>
                    <SelectTrigger className='w-fit'>
                        <SelectValue placeholder='Trạng thái' />
                    </SelectTrigger>
                    <SelectContent className='w-fit'>
                        {Object.values(EReportStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                                {vilizeReportStatus(status)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button variant={"outline"} onClick={onReset}>
                    Đặt lại
                </Button>
            </div>
            <Table headers={header} columns={columns} data={_reports} className='border shadow-sm' />
        </div>
    )
}

export default ReportPage
