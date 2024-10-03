import {Category, Home, Topic} from "@/views";
import {RootContainer} from "@/components";
import {Navigate, Route, Routes} from "react-router-dom";
import {ReactNode} from "react";

const data = [
    {
        element: <Home/>,
        path: "/",
        isProtected: "public",
        key: "home",
    },
    {
        element: <Category/>,
        path: "/category",
        isProtected: "private",
        key: "category",
    },
    {
        element: <Topic/>,
        path: "/topic",
        isProtected: "protected",
        key: "topic",
    },
];

function ProtectedRoute({
                            children,
                            isProtected,
                        }: {
    children: ReactNode;
    isProtected: string;
}) {
    const levelProtected = ["public", "protected"];
    if (levelProtected.includes(isProtected))
        return <RootContainer>{children}</RootContainer>;
    return <Navigate to="/"/>;
}

export default function AppRoutes() {
    return (
        <Routes>
            {data.map(({element, path, isProtected, key}) => (
                <Route
                    key={key}
                    path={path}
                    element={
                        <ProtectedRoute isProtected={isProtected}>{element}</ProtectedRoute>
                    }
                />
            ))}
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}
