import NavigationBar from "@/components/navigation"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import AuthModal from "./components/auth-modal"
import { useEffect } from "react"
import useAdminStore from "@/store/useAdminStore"
import useOwnerStore from "@/store/useOwnerStore"
import useBranchStore from "@/store/useBranchStore"
import useTeamStore from "@/store/useTeamStore"
import useGuestStore from "@/store/useGuestStore"
import useReportStore from "@/store/useReportStore"
import ROUTE from "@/constants/route"

const BasePage = () => {
    const { isLogin } = useAdminStore()
    const { loadOwners, setOwners } = useOwnerStore()
    const { loadBranches, setBranches } = useBranchStore()
    const { loadTeams, setTeams } = useTeamStore()
    const { loadGuests, setGuests } = useGuestStore()
    const { loadReports, setReports } = useReportStore()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {
        if (!isLogin) {
            setOwners([])
            setBranches([])
            setTeams([])
            setGuests([])
            setReports([])
        } else {
            Promise.all([loadOwners(), loadBranches(), loadTeams(), loadGuests(), loadReports()])
        }
    }, [isLogin])

    useEffect(() => {
        if (pathname === "/") {
            navigate(ROUTE.OWNER)
        }
    }, [pathname])

    return (
        <div className='flex max-h-screen min-h-screen'>
            <div className='min-w-[16rem]'>
                <NavigationBar />
            </div>
            <div className='min-h-screen flex-1 overflow-auto p-4'>
                <Outlet />
            </div>
            <AuthModal />
        </div>
    )
}

export default BasePage
