import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const Routes = [
    {
        path: "/",
        page: MainPage
    },
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/reg',
        page: RegisterPage
    }
]