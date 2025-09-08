import { products } from "./data"

interface IProps {
    currentIndex: number;
    setCurrentIndex: (v: number) => void;
}

export const SliderList = (props: IProps) => {
    const { currentIndex, setCurrentIndex } = props;
    return (
        <>
            <div className="flex justify-between">
                {products.map((item, index) => {
                    return (
                        <div
                            onClick={() => setCurrentIndex(index)}
                            className={` hover:cursor-pointer rounded-[0.625rem] overflow-hidden size-[5.5rem] bg-cover bg-no-repeat bg-center ${currentIndex == index ? ' border-2 border-[#FF7E1B]' : ''}`}
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
