import AppAvatar from "@/components/app-avatar"
import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table.type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import IGuest from "@/interface/IGuest"
import ITeam, { ETeamStatus } from "@/interface/ITeam"
import useTeamStore from "@/store/useTeamStore"
import { vilizeTeamStatus } from "@/utils/status"
import React, { useEffect, useState } from "react"

const TeamList = () => {
    const { teams, updateTeamStatus } = useTeamStore()
    const [_teams, _setTeams] = useState<ITeam[]>(teams)
    useEffect(() => {
        _setTeams(teams)
    }, [teams])
    const header = ["STT", "Tên đội bóng", "Logo", "Đội trưởng", "Thành viên", "Trạng thái"]
    const columns: ColumnProps<ITeam>[] = [
        {
            headRef: "STT",
            render: (team, index) => index + 1
        },
        {
            headRef: "Tên đội bóng",
            render: (team) => team.name
        },
        {
            headRef: "Logo",
            render: (team) => (
                <div className='flex justify-center'>
                    <AppAvatar src={team.logo} alt={team.name} />
                </div>
            )
        },
        {
            headRef: "Đội trưởng",
            render: (team) => (team.captain as IGuest).name
        },
        {
            headRef: "Thành viên",
            render: (team) => team.members?.length || 0
        },
        {
            headRef: "Trạng thái",
            render: (team) => (
                <div className='flex justify-center'>
                    <Select
                        onValueChange={(v) => onUpdateStatus(team._id!, v as ETeamStatus)}
                        value={team.status}
                        defaultValue={team.status}
                    >
                        <SelectTrigger className='w-fit'>
                            <SelectValue placeholder='Trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='w-fit'>
                            {Object.values(ETeamStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {vilizeTeamStatus(status)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }
    ]

    function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
        _setTeams(teams.filter((team) => team.name.toLowerCase().includes(e.target.value)))
    }

    function onReset() {
        _setTeams(teams)
    }

    function onChangeStatus(status: ETeamStatus) {
        _setTeams(teams.filter((team) => team.status === status))
    }

    async function onUpdateStatus(id: string, status: ETeamStatus) {
        await updateTeamStatus(id, status)
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
                        {Object.values(ETeamStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                                {vilizeTeamStatus(status)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button variant={"outline"} onClick={onReset}>
                    Đặt lại
                </Button>
            </div>
            <Table headers={header} columns={columns} data={_teams} className='border shadow-sm' />
        </div>
    )
}

export default TeamList
