import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table.type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import IGuest, { EGuestStatus } from "@/interface/IGuest"
import { toAddress } from "@/lib/converter"
import useGuestStore from "@/store/useGuestStore"
import { vilizeGuestStatus } from "@/utils/status"
import React, { useEffect, useState } from "react"

const GuestList = () => {
    const { guests, updateGuestStatus } = useGuestStore()
    const [_guests, _setGuests] = useState<IGuest[]>(guests)
    useEffect(() => {
        _setGuests(guests)
    }, [guests])
    const header = ["STT", "Tên chủ sở hữu", "Số điện thoại", "Email", "Địa chỉ", "Trạng thái"]
    const columns: ColumnProps<IGuest>[] = [
        {
            headRef: "STT",
            render: (guest, index) => index + 1
        },
        {
            headRef: "Tên chủ sở hữu",
            render: (guest) => guest.name
        },
        {
            headRef: "Số điện thoại",
            render: (guest) => guest.phoneNumber
        },
        {
            headRef: "Email",
            render: (guest) => guest.email
        },
        {
            headRef: "Địa chỉ",
            render: (guest) => toAddress({ ...guest })
        },
        {
            headRef: "Trạng thái",
            render: (guest) => (
                <div className='flex justify-center'>
                    <Select
                        onValueChange={(v) => onUpdateStatus(guest._id!, v as EGuestStatus)}
                        value={guest.status}
                        defaultValue={guest.status}
                    >
                        <SelectTrigger className='w-fit'>
                            <SelectValue placeholder='Trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='w-fit'>
                            {Object.values(EGuestStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {vilizeGuestStatus(status)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }
    ]

    function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
        _setGuests(guests.filter((guest) => guest.name.toLowerCase().includes(e.target.value)))
    }

    function onReset() {
        _setGuests(guests)
    }

    function onChangeStatus(status: EGuestStatus) {
        _setGuests(guests.filter((guest) => guest.status === status))
    }

    async function onUpdateStatus(id: string, status: EGuestStatus) {
        await updateGuestStatus(id, status)
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
                        {Object.values(EGuestStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                                {vilizeGuestStatus(status)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button variant={"outline"} onClick={onReset}>
                    Đặt lại
                </Button>
            </div>
            <Table headers={header} columns={columns} data={_guests} className='border shadow-sm' />
        </div>
    )
}

export default GuestList
