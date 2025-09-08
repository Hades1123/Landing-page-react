import { useEffect, useState } from "react";
import { products } from "./data";
import { SliderList } from "./sliderList";

interface IProps {
    isDesktop: boolean;
    open: boolean;
    setOpen: (v: boolean) => void;
    buttonPosition?: string;
    index: number;
}

export const ImageGallery = (props: IProps) => {
    const { isDesktop, open, setOpen, index } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
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

    useEffect(() => {
        if (open) {
            setCurrentIndex(index);
        } else {
            setCurrentIndex(0);
        }
    }, [open, index])

    return (
        <>
            {open && isDesktop &&
                <>
                    <div
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20"
                    >
                        <div
                            className="flex justify-end mb-6 hover:cursor-pointer text-white hover:text-orange-600"
                            onClick={() => setOpen(false)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Combined Shape" fillRule="evenodd" clipRule="evenodd" d="M20 2.85714L17.1429 0L10 7.14286L2.85714 0L0 2.85714L7.14286 10L0 17.1429L2.85714 20L10 12.8571L17.1429 20L20 17.1429L12.8571 10L20 2.85714Z" fill="currentcolor" />
                            </svg>
                        </div>
                        <div className="select-none size-[28rem] w-full rounded-[0.9375rem] overflow-hidden mb-10">
                            <img
                                src={products[currentIndex]} alt="img"
                                className="w-full transition-all duration-400 ease-in-out h-full object-cover"
                            />
                            <div
                                className="size-10 bg-white rounded-[1.25rem] flex items-center justify-center absolute left-0 top-[calc(50%-1.6875rem)] -translate-y-1/2 -translate-x-1/2 hover:text-[#FF7E1B] hover:cursor-pointer"
                                onClick={() => onNextProduct(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                    <path d="M7.85718 1.28571L2.14289 6.99999L7.85718 12.7143" stroke="currentColor" strokeWidth="3" />
                                </svg>
                            </div>
                            <div
                                className="size-10 bg-white rounded-[1.25rem] flex items-center justify-center absolute top-[calc(50%-1.6875rem)] -translate-y-1/2 right-0 translate-x-1/2 rotate-180 hover:text-[#FF7E1B] hover:cursor-pointer"
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
                            className="flex justify-around"
                        />
                    </div>
                </>
            }
            {open && isDesktop && <div className="absolute inset-0 z-10 opacity-75 bg-[#000] h-screen" onMouseDown={() => setOpen(false)}></div>}
        </>
    )
}