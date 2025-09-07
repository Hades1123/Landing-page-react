import { createContext, useContext, useEffect, useState } from "react"

export type TCart = {
    id: number;
    price: number;
    quantity: number;
}

type ContextType = {
    shoppingCart: TCart[];
    setShoppingCart: (value: TCart[]) => void;
    total: number;
    setTotal: (value: number) => void;
}

const EcommerceContext = createContext<ContextType | null>(null);

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const [shoppingCart, setShoppingCart] = useState<TCart[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storageCart = localStorage.getItem('shoppingCart');
        const storageTotal = localStorage.getItem('totalProducts');
        if (storageCart) {
            const storageCartList = JSON.parse(storageCart);
            setShoppingCart(storageCartList);
        }
        if (storageTotal) {
            setTotal(+storageTotal);
        }
    }, [])

    return (
        <>
            <EcommerceContext.Provider value={{
                shoppingCart, setShoppingCart,
                total, setTotal,
            }}>
                {children}
            </EcommerceContext.Provider>
        </>
    )
}

export const useEcommerceContext = () => {
    const context = useContext(EcommerceContext);
    if (!context) {
        throw new Error('useEcommerceContext must be used within a ContextWrapper');
    }
    return context;
}