import ROUTE from "@/constants/route"
import { CircleDashed, Dice6, Flag, LandPlot, Users2 } from "lucide-react"
import { TNavigation } from "./navigation.type"

const navigationMocks: TNavigation[] = [
    {
        link: ROUTE.OWNER,
        title: "Danh sách chủ sân",
        icon: CircleDashed
    },
    {
        link: ROUTE.BRANCH,
        title: "Danh sách chi nhánh",
        icon: Dice6
    },
    {
        link: ROUTE.TEAM,
        title: "Danh sách đội bóng",
        icon: LandPlot
    },
    {
        link: ROUTE.GUEST,
        title: "Danh sách khách hàng",
        icon: Users2
    },
    {
        link: ROUTE.REPORT,
        title: "Báo cáo",
        icon: Flag
    }
]

export { navigationMocks }
