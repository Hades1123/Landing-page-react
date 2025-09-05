import { cn, tw } from "@/libs/cn";

type TCard = {
    children?: React.ReactNode;
    total: number;
    className?: string;
    style?: React.CSSProperties | undefined
}

export const Card = (props: TCard) => {
    const { total, children, className, style } = props;
    const cardStyle = tw("p-[1.25rem] flex flex-col gap-2 rounded-[0.75rem] text-[#12131A]");
    return (
        <>
            <div className={cn(cardStyle, className)} style={style}>
                <div className="font-[700] text-[2.5rem]">{total.toString().padStart(2, "0")}</div>
                <div className="text-[1.25rem] font-[400]">{children}</div>
            </div>
        </>
    )
}