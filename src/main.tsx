import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'styles/global.css';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { LayoutPage } from '@/layout';
import BrowserExtension from 'pages/browser-extension-manager';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
    },
    {
        path: "/browser-extension-manager",
        element: <BrowserExtension />,
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
