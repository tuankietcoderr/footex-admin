import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table.type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import IOwner, { EOwnerStatus } from "@/interface/IOwner"
import { toAddress } from "@/lib/converter"
import useOwnerStore from "@/store/useOwnerStore"
import { vilizeOwnerStatus } from "@/utils/status"
import React, { useEffect, useState } from "react"

const OwnerList = () => {
    const { owners, updateOwnerStatus } = useOwnerStore()
    const [_owners, _setOwners] = useState<IOwner[]>(owners)
    useEffect(() => {
        _setOwners(owners)
    }, [owners])
    const header = ["STT", "Tên chủ sở hữu", "Số điện thoại", "Email", "Địa chỉ", "Trạng thái"]
    const columns: ColumnProps<IOwner>[] = [
        {
            headRef: "STT",
            render: (owner, index) => index + 1
        },
        {
            headRef: "Tên chủ sở hữu",
            render: (owner) => owner.name
        },
        {
            headRef: "Số điện thoại",
            render: (owner) => owner.phoneNumber
        },
        {
            headRef: "Email",
            render: (owner) => owner.email
        },
        {
            headRef: "Địa chỉ",
            render: (owner) => toAddress({ ...owner })
        },
        {
            headRef: "Trạng thái",
            render: (owner) => (
                <div className='flex justify-center'>
                    <Select
                        onValueChange={(v) => onUpdateStatus(owner._id!, v as EOwnerStatus)}
                        value={owner.status}
                        defaultValue={owner.status}
                    >
                        <SelectTrigger className='w-fit'>
                            <SelectValue placeholder='Trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='w-fit'>
                            {Object.values(EOwnerStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {vilizeOwnerStatus(status)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }
    ]

    function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
        _setOwners(owners.filter((owner) => owner.name.toLowerCase().includes(e.target.value)))
    }

    function onReset() {
        _setOwners(owners)
    }

    function onChangeStatus(status: EOwnerStatus) {
        _setOwners(owners.filter((owner) => owner.status === status))
    }

    async function onUpdateStatus(id: string, status: EOwnerStatus) {
        await updateOwnerStatus(id, status)
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
                        {Object.values(EOwnerStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                                {vilizeOwnerStatus(status)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button variant={"outline"} onClick={onReset}>
                    Đặt lại
                </Button>
            </div>
            <Table headers={header} columns={columns} data={_owners} className='border shadow-sm' />
        </div>
    )
}

export default OwnerList
