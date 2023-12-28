import { RouterProvider } from "react-router-dom"
import router from "./route"
import { Toaster } from "react-hot-toast"

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster
                toastOptions={{
                    duration: 3000,
                    position: "bottom-center"
                }}
            />
        </>
    )
}

export default App
