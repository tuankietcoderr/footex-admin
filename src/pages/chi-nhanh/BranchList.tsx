import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table.type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import IBranch, { EBranchStatus } from "@/interface/IBranch"
import IOwner from "@/interface/IOwner"
import { toAddress } from "@/lib/converter"
import useBranchStore from "@/store/useBranchStore"
import { vilizeBranchStatus } from "@/utils/status"
import React, { useEffect, useState } from "react"

const BranchList = () => {
    const { branches, updateBranchStatus } = useBranchStore()
    const [_branches, _setBranches] = useState<IBranch[]>(branches)
    useEffect(() => {
        _setBranches(branches)
    }, [branches])
    const header = ["STT", "Tên chi nhánh", "Địa chỉ", "Chủ", "Trạng thái"]
    const columns: ColumnProps<IBranch>[] = [
        {
            headRef: "STT",
            render: (branch, index) => index + 1
        },
        {
            headRef: "Tên chi nhánh",
            render: (branch) => branch.name
        },
        {
            headRef: "Địa chỉ",
            render: (branch) => toAddress(branch)
        },
        {
            headRef: "Chủ",
            render: (branch) => (branch.owner as IOwner).name
        },
        {
            headRef: "Trạng thái",
            render: (branch) => (
                <div className='flex justify-center'>
                    <Select
                        onValueChange={(v) => onUpdateStatus(branch._id!, v as EBranchStatus)}
                        value={branch.status}
                        defaultValue={branch.status}
                    >
                        <SelectTrigger className='w-fit'>
                            <SelectValue placeholder='Trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='w-fit'>
                            {Object.values(EBranchStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {vilizeBranchStatus(status)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }
    ]

    function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
        _setBranches(branches.filter((branch) => branch.name.toLowerCase().includes(e.target.value)))
    }

    function onReset() {
        _setBranches(branches)
    }

    function onChangeStatus(status: EBranchStatus) {
        _setBranches(branches.filter((branch) => branch.status === status))
    }

    async function onUpdateStatus(id: string, status: EBranchStatus) {
        await updateBranchStatus(id, status)
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
                        {Object.values(EBranchStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                                {vilizeBranchStatus(status)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button variant={"outline"} onClick={onReset}>
                    Đặt lại
                </Button>
            </div>
            <Table headers={header} columns={columns} data={_branches} className='border shadow-sm' />
        </div>
    )
}

export default BranchList
