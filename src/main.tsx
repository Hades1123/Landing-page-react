import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'styles/global.css';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { LayoutPage } from '@/layout';
import BrowserExtension from 'pages/browser-extension-manager';
import CharacterCounterPage from './pages/character-counter';
import { EcommerceProductPage } from './pages/ecommerce-product-page';
import { ContextWrapper } from './components/ecommerce-product-page/context';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
    },
    {
        path: "/browser-extension-manager",
        element: <BrowserExtension />,
    },
    {
        path: "/character-counter",
        element: <CharacterCounterPage />
    },
    {
        path: "/ecommerce-product-page",
        element:
            <ContextWrapper>
                <EcommerceProductPage />
            </ContextWrapper>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
