import { CartModal } from "@/components/ecommerce-product-page/cart.modal";
import { useEcommerceContext } from "@/components/ecommerce-product-page/context";
import { products } from "@/components/ecommerce-product-page/data"
import { Menu } from "@/components/ecommerce-product-page/menu";
import { useState } from "react"
import { useMediaQuery } from "react-responsive";

export const EcommerceProductPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpenCartModal, setIsOpenCartModal] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const { shoppingCart, setShoppingCart, total, setTotal } = useEcommerceContext();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const isMobile = useMediaQuery({ minWidth: 767 });

    const onNextProduct = (next: boolean) => {
        if (next) {
            const index = currentIndex + 1 > products.length - 1 ? 0 : currentIndex + 1;
            setCurrentIndex(index);
        }
        else {
            const index = currentIndex - 1 < 0 ? products.length - 1 : currentIndex - 1;
            setCurrentIndex(index);
        }
    }

    const onAddProductToCart = () => {
        if (quantity == 0) {
            return;
        }
        const currentProduct = { id: 1111, price: 125, quantity: quantity };
        setTotal(total + quantity);
        const newShoppingCart = shoppingCart.find(item => item.id == currentProduct.id) === undefined
            ? [...shoppingCart, currentProduct]
            : shoppingCart.map(item => {
                if (item.id == currentProduct.id) {
                    item.quantity += quantity;
                }
                return item;
            });
        setShoppingCart(newShoppingCart);
        localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
        localStorage.setItem('totalProducts', (total + quantity).toString());
    }

    return (
        <>
            <div className="font-KumbhSans min-h-screen relative z-0 md:px-20 md:py-[1.75rem] w-screen">
                <header className="pt-[1.31rem] px-[1.48rem] pb-6 flex justify-between md:px-0">
                    <div className="flex gap-4">
                        <img src="/ecommerce-product-page/menu.svg" alt="menu" onClick={() => setIsOpenMenu(true)} />
                        <img src="/ecommerce-product-page/logo.svg" alt="logo" />
                    </div>
                    <div className="flex gap-6">
                        <span className="relative">
                            <img
                                src="/ecommerce-product-page/cart.svg" alt="cart"
                                onClick={() => setIsOpenCartModal(!isOpenCartModal)}
                            />
                            <div className="min-w-[1.1875rem] min-h-[0.8125rem] bg-[#FF7E1B] rounded-[0.40625rem] text-[0.625rem] text-white font-[700] flex items-center justify-center absolute -top-2 -right-2">
                                <span>{total}</span>
                            </div>
                        </span>
                        <img src="/ecommerce-product-page/avatar.svg" alt="avatar" />
                    </div>
                </header>
                {isMobile && <div className="bg-[#E4E9F2] h-[0.0625rem] mt-8 mb-12"></div>}
                <main>
                    <div className="relative overflow-hidden w-full max-h-[18.75rem] md:max-h-[18.125rem] md:rounded-[0.9375rem] md:mb-12">
                        <img
                            src={products[currentIndex]} alt="img"
                            className="w-full transition-all duration-400 ease-in-out h-full md:aspect-video"
                        />
                        <div
                            className="size-10 bg-white rounded-[1.25rem] flex items-center justify-center absolute left-4
                        top-1/2 -translate-y-1/2 hover:text-[#FF7E1B] hover:cursor-pointer"
                            onClick={() => onNextProduct(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                <path d="M7.85718 1.28571L2.14289 6.99999L7.85718 12.7143" stroke="currentColor" strokeWidth="3" />
                            </svg>
                        </div>
                        <div
                            className="size-10 bg-white rounded-[1.25rem] flex items-center justify-center absolute right-4
                        top-1/2 -translate-y-1/2 rotate-180 hover:text-[#FF7E1B] hover:cursor-pointer"
                            onClick={() => onNextProduct(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                <path d="M7.85718 1.28571L2.14289 6.99999L7.85718 12.7143" stroke="currentColor" strokeWidth="3" />
                            </svg>
                        </div>
                    </div>
                    {/* main content  */}
                    <div className="px-6 pt-6 flex flex-col gap-4 md:px-0 md:gap-6">
                        <div className="text-[#69707D] text-[0.75rem] font-[700] md:text-[0.8125rem]">SNEAKER COMPANY</div>
                        <h1 className="text-[1.75rem] font-[700] md:text-[2.75rem]">Fall Limited Edition Sneakers</h1>
                        <p className="text-[0.9375rem] font-[400] text-[#69707D] md:text-[1rem]">These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
                        <div>
                            {/* price  */}
                            <div className="flex justify-between mb-4 md:flex-col md:gap-2 md:mb-6">
                                <div className="flex items-start gap-4">
                                    <span className="text-[#1D2026] text-[1.75rem] font-[700] leading-[2rem]">$125.00</span>
                                    <span className="rounded-[0.375rem] bg-[#1D2026] font-[700] text-white p-[1px] md:p-1">50%</span>
                                </div>
                                <div className="text-[#69707D] line-through font-[700]">$250.00</div>
                            </div>
                            {/* button + quantity  */}
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="flex justify-between rounded-[0.625rem] bg-[#F6F8FD] p-4 items-center w-full md:w-1/2">
                                    <img
                                        src="/ecommerce-product-page/minus.svg" alt="minus"
                                        onClick={() => setQuantity(Math.max(0, quantity - 1))}
                                    />
                                    <span className="font-[700] text-[#1D2026]">{quantity}</span>
                                    <img
                                        src="/ecommerce-product-page/plus.svg" alt="plus"
                                        onClick={() => setQuantity(quantity + 1)}
                                    />
                                </div>
                                <button
                                    className="rounded-[0.625rem] bg-[#FF7E1B] py-4 px-[6.5rem] w-full md:w-1/2 md:py-[0.94rem] md:px-2"
                                    style={{ boxShadow: '0 20px 50px -20px rgba(255, 126, 27, 0.25)' }}
                                    onClick={onAddProductToCart}
                                >
                                    <span
                                        className="flex items-center gap-4 justify-center text-[#1D2026] font-[700]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="19"
                                            height="16"
                                            viewBox="0 0 19 16"
                                            fill="none"
                                        >
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.86199 2.91311H17.5112C17.9777 2.91311 18.3197 3.35211 18.2067 3.80391L16.75 9.63048C16.674 9.93446 16.4093 10.1539 16.0965 10.1723L4.6391 10.8456C4.84394 11.3243 5.31851 11.6529 5.8631 11.6529H13.8697C15.0682 11.6529 16.0432 12.628 16.0432 13.8264C16.0432 15.0249 15.0682 16 13.8697 16C12.3679 16 11.3121 14.502 11.8259 13.0868H7.90204C8.41649 14.5038 7.3584 16 5.85825 16C4.05081 16 3.03557 13.9081 4.14671 12.4891C3.53042 12.0009 3.17268 11.2825 3.11416 10.6204C2.20568 0.498541 2.24592 0.946953 2.33101 1.89506L2.33156 1.9012C2.38862 2.53699 2.46489 3.38676 2.28959 1.43385H1.48841C1.09246 1.43385 0.771484 1.11288 0.771484 0.716927C0.771484 0.320978 1.09246 0 1.48841 0H2.94504C3.31613 0 3.62591 0.28322 3.6591 0.652847L3.86199 2.91311ZM5.11859 13.8264C5.11859 14.2343 5.45042 14.5661 5.85825 14.5661C6.26611 14.5661 6.59795 14.2343 6.59795 13.8264C6.59795 13.4186 6.26611 13.0868 5.85825 13.0868C5.45042 13.0868 5.11859 13.4186 5.11859 13.8264ZM13.8696 14.5661C13.4618 14.5661 13.1299 14.2343 13.1299 13.8264C13.1299 13.4186 13.4618 13.0868 13.8696 13.0868C14.2775 13.0868 14.6093 13.4186 14.6093 13.8264C14.6093 14.2343 14.2775 14.5661 13.8696 14.5661ZM4.44611 9.42062L15.4867 8.77181L16.593 4.34693H3.99069L4.44611 9.42062Z" fill="#1D2026" />
                                        </svg>
                                        Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Menu
                open={isOpenMenu}
                setOpen={setIsOpenMenu}
            />
            <CartModal
                open={isOpenCartModal}
                setOpen={setIsOpenCartModal}
            />
        </>
    )
}