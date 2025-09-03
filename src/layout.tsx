import { Link } from "react-router-dom"

export const LayoutPage = () => {
    return (
        <>
            <h1>This is homepage</h1>
            <ul>
                <li><Link to={'/browser-extension-manager'} className="hover:text-red-500">1. Browser extension manager</Link></li>
                <li>null</li>
            </ul>
        </>
    )
}