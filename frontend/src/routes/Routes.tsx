import {BrowserRouter, Link} from "react-router-dom";
import AppRoutes from "@/routes/data.tsx";

export default function Routes() {

    return (
        <BrowserRouter>
            <header>
                <Link style={{color: '#fff'}} to="/">Home</Link>
                <Link style={{color: '#fff'}} to="/category">category</Link>
                <Link style={{color: '#fff'}} to="/topic">topic</Link>
            </header>
            <AppRoutes/>
            <footer>
                <Link to="/">Home</Link>
                <Link to="/about">category</Link>
            </footer>
        </BrowserRouter>
    );
}
