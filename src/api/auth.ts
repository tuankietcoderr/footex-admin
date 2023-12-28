import apiInstance, { asyncHandler } from "."

class _AuthController {
    async login(secretKey: string) {
        return await asyncHandler(() => apiInstance.post("/admin/login", { secretKey }))
    }
}

const AuthController = new _AuthController()
export default AuthController
