import ROUTE from "@/constants/route"
import React from "react"
import { Link } from "react-router-dom"
import { navigationMocks } from "./navigation.mock"
import NavigationItem from "./navigation-item"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import useAdminStore from "@/store/useAdminStore"

const NavigationBar = () => {
    const { logout } = useAdminStore()
    return (
        <div className='flex h-full w-full flex-col justify-between p-2 shadow-md'>
            <Link to={ROUTE.BASE} className='mb-8 flex justify-center'>
                <img src={"/vite.svg"} alt={"Next.js"} width={100} height={100} />
            </Link>
            <div className='flex flex-1 flex-col gap-1'>
                {navigationMocks.map((navigation) => (
                    <NavigationItem key={navigation.link} {...navigation} />
                ))}
            </div>
            <Button onClick={logout} variant={"ghost"} className='justify-start space-x-2 text-destructive'>
                <LogOut size={16} /> <span>Logout</span>
            </Button>
        </div>
    )
}

export default NavigationBar
