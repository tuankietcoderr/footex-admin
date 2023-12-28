import { createBrowserRouter } from "react-router-dom"
import ROUTE from "./constants/route"
import BasePage from "./pages/base/BasePage"
import ReportPage from "./pages/bao-cao/ReportPage"
import OwnerList from "./pages/chu-san/OwnerList"
import BranchList from "./pages/chi-nhanh/BranchList"
import TeamList from "./pages/doi-bong/TeamList"
import GuestList from "./pages/khach-hang/GuestList"

const router = createBrowserRouter([
    {
        path: ROUTE.BASE,
        element: <BasePage />,
        errorElement: <div>404</div>,
        children: [
            {
                path: ROUTE.OWNER,
                element: <OwnerList />
            },
            {
                path: ROUTE.REPORT,
                element: <ReportPage />
            },
            {
                path: ROUTE.BRANCH,
                element: <BranchList />
            },
            {
                path: ROUTE.TEAM,
                element: <TeamList />
            },
            { path: ROUTE.GUEST, element: <GuestList /> }
        ]
    }
])

export default router
