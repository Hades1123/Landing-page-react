import { cn } from "@/libs/cn";
import { products } from "./data"

interface IProps {
    currentIndex: number;
    setCurrentIndex: (v: number) => void;
    className?: string;
}

export const SliderList = (props: IProps) => {
    const { currentIndex, setCurrentIndex, className } = props;
    return (
        <>
            <div className={cn("flex justify-between", className)}>
                {products.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`hover:cursor-pointer rounded-[0.625rem] overflow-hidden size-[3.5rem] bg-cover bg-no-repeat bg-center ${currentIndex == index ? ' border-2 border-[#FF7E1B]' : ''}`}
                            style={{
                                backgroundImage: currentIndex == index ? `linear-gradient(0deg, rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url("${item}")` : `url("${item}")`,
                            }}
                        ></div>
                    )
                })}
            </div>
        </>
    )
}
