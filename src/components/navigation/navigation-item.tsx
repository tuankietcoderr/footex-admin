import { TNavigation } from "./navigation.type"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const NavigationItem = ({ link, title, icon: Icon }: TNavigation) => {
    const { pathname } = useLocation()
    const isNavActive = () => {
        if (pathname === "/" && link === "/") return true
        if (pathname.includes(link) && link !== "/") return true
        return false
    }
    return (
        <Link to={link} className='px-2 py-1'>
            <Button
                variant={"ghost"}
                className={cn("flex w-full items-center justify-start gap-2", isNavActive() && "bg-accent")}
            >
                <Icon size={16} />
                <span>{title}</span>
            </Button>
        </Link>
    )
}

export default NavigationItem
