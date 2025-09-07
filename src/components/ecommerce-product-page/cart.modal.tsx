import { useEcommerceContext } from "./context";
import { products } from "./data";
import bin from '/ecommerce-product-page/bin.svg'

interface IProp {
    open: boolean;
}

export const CartModal = (props: IProp) => {
    const { open } = props;
    const { shoppingCart, setShoppingCart, total, setTotal } = useEcommerceContext();
    return (
        <>
            {open &&
                <div className="bg-white min-h-[13rem] absolute top-[4.75rem] right-1/2 translate-x-1/2 w-[calc(100%-0.5rem)]
                rounded-[0.625rem] shadow-[0_20px_50px_-20px_rgba(29,32,38,0.10)] overflow-auto max-h-[25rem]">
                    <h3 className="font-[700] py-6 px-[0.75rem] ">Cart</h3>
                    <hr />
                    {/* product list  */}
                    <div className="relative min-h-[11.44rem]">
                        {shoppingCart.length ?
                            <>
                                <div className="px-[1.59rem] pt-[1.56rem] pb-6 text-[#69707D] font-[400]">
                                    {shoppingCart.map((item, index) => {
                                        return (
                                            <div key={index} className="flex items-center justify-between mb-6">
                                                <div className="size-[3.125rem]">
                                                    <img className="w-full h-full rounded-[0.25rem] object-cover" src={products[0]} alt="img" />
                                                </div>
                                                <div>
                                                    <h2>Fall Limited Edition Sneakers</h2>
                                                    <div className="flex gap-2">
                                                        <div>$125 x {item.quantity}</div>
                                                        <span className="font-[700] text-[#1D2026]">${item.quantity * item.price}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        const newShoppingCart = shoppingCart.filter(e => e.id != item.id);
                                                        setShoppingCart(newShoppingCart);
                                                        setTotal(total - item.quantity);
                                                        localStorage.setItem('totalProducts', (total - item.quantity).toString());
                                                        localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
                                                    }}>
                                                    <img src={bin} alt="bin" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <button className="font-[700] text-[#1D2026] py-4 px-[6.5rem] text-center bg-[#FF7E1B] rounded-[0.625rem] w-full">Check out</button>
                                </div>
                            </>
                            :
                            <div className="font-[700] text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                Your cart is empty.
                            </div>
                        }
                    </div>
                </div>}
        </>
    )
}