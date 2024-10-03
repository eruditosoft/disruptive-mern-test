import {BrowserRouter, Route, Routes as R} from "react-router-dom";
import Home from "@/views/Home/Home.tsx";
import Admin from "@/views/Admin/Admin.tsx";
import PrivateRoute from "@/Routes/PrivateRoutes.tsx";
import AppContainer from "@/components/Container/AppContainer/AppContainer.tsx";
import Category from "@/views/Category/Category.tsx";
import Topic from "@/views/Topic/Topic.tsx";

export const componentsRoutes = [
    {
        element: <Home/>,
        path: "/",
        isProtected: false,
        name: 'Incio'
    },
    {
        element: <Admin/>,
        path: "/admin",
        isProtected: true,
        name: 'Panel de control'
    },
    {
        element: <Category/>,
        path: "/Category",
        isProtected: true,
        name: 'Categorias'
    },
    {
        element: <Topic/>,
        path: "/topic",
        isProtected: true,
        name: 'Topicos'
    }
]

export default function Routes() {
    const RoutesChild = componentsRoutes.map(({element, path, isProtected}) => {
        const child = <AppContainer> {element}</AppContainer>;
        if (isProtected) {
            return <Route key={path} path={path} element={<PrivateRoute path={path}>{child}</PrivateRoute>}/>;
        }
        return <Route key={path} path={path} element={child}/>;
    })
    return (<BrowserRouter>
            <R>
                {RoutesChild}
                <Route path="*" element={<Home/>}/>
            </R>
        </BrowserRouter>
    )
}
