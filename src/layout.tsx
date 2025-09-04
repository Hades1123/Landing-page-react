import { Link } from "react-router-dom"

export const LayoutPage = () => {
    return (
        <>
            <h1>This is homepage</h1>
            <ol type="1">
                <li><Link to={'/browser-extension-manager'} className="hover:text-red-500">1. Browser extension manager</Link></li>
                <li><Link to={'/character-counter'} className="hover:text-red-500">2. Character counterr</Link></li>
                <li>null</li>
            </ol>
        </>
    )
}