import AuthController from "@/api/auth"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LOCAL_STORAGE_KEY } from "@/constants/local-storage-key"
import useAdminStore from "@/store/useAdminStore"
import { useState } from "react"
import toast from "react-hot-toast"

const AuthModal = () => {
    const { isLogin } = useAdminStore()
    const [secretKey, setSecretKey] = useState("")

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]
        if (!file) return toast.error("File không hợp lệ")
        // less than 1MB
        if (file.size > 1024 * 1024) return toast.error("File quá lớn")
        const reader = new FileReader()
        reader.readAsText(file, "UTF-8")
        reader.onload = (e) => {
            const result = e.target?.result
            if (!result) return
            setSecretKey(result as string)
        }
    }

    const onLogin = async () => {
        toast.loading("Đang đăng nhập...", {
            duration: Infinity
        })
        const { success, message, accessToken } = await AuthController.login(secretKey)
        toast.dismiss()
        if (!success) return toast.error(message)
        useAdminStore.setState({ isLogin: true })
        sessionStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken!)
        setSecretKey("")
    }

    return (
        <Dialog defaultOpen={!isLogin} open={!isLogin}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bạn chưa đăng nhập</DialogTitle>
                    <DialogDescription>Vui lòng đăng nhập để quản lý</DialogDescription>
                </DialogHeader>
                <div className='space-y-2'>
                    <Label htmlFor='file'>Secret key</Label>
                    <Input type='file' id='file' onChange={onUpload} accept='.txt' />
                </div>
                {secretKey && <Textarea value={secretKey} className='min-h-fit' disabled />}
                {secretKey && <Button onClick={onLogin}>Đăng nhập</Button>}
            </DialogContent>
        </Dialog>
    )
}

export default AuthModal
