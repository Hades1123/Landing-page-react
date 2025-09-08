import { useState } from "react";
import { products } from "./data";
import { SliderList } from "./sliderList";
import close from '/ecommerce-product-page/close.svg'

interface IProps {
    isDesktop: boolean;
    open: boolean;
    setOpen: (v: boolean) => void;
    buttonPosition?: string;
}

export const ImageGallery = (props: IProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isDesktop, open, setOpen } = props;
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
    return (
        <>
            {open && isDesktop &&
                <>
                    <div
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20"
                    >
                        <div className="flex justify-end mb-6 hover:cursor-pointer">
                            <img src={close} alt="close-btn" onClick={() => setOpen(false)} className="text-current" />
                        </div>
                        <div className="select-none size-[20rem] w-full rounded-[0.9375rem] overflow-hidden mb-10">
                            <img
                                src={products[currentIndex]} alt="img"
                                className="w-full transition-all duration-400 ease-in-out h-full object-cover"
                            />
                            <div
                                className="size-10 bg-white rounded-[1.25rem] flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2
                                -translate-x-1/2 hover:text-[#FF7E1B] hover:cursor-pointer"
                                onClick={() => onNextProduct(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                    <path d="M7.85718 1.28571L2.14289 6.99999L7.85718 12.7143" stroke="currentColor" strokeWidth="3" />
                                </svg>
                            </div>
                            <div
                                className="size-10 bg-white rounded-[1.25rem] flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 rotate-180 hover:text-[#FF7E1B] hover:cursor-pointer"
                                onClick={() => onNextProduct(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                    <path d="M7.85718 1.28571L2.14289 6.99999L7.85718 12.7143" stroke="currentColor" strokeWidth="3" />
                                </svg>
                            </div>
                        </div>
                        <SliderList
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                        />
                    </div>
                </>
            }
            {open && <div className="absolute inset-0 z-10 opacity-75 bg-[#000]"></div>}
        </>
    )
}