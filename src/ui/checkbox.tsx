import { cn } from "@/libs/cn";

export type TCheckBox = {
    children?: React.ReactNode;
    checked: boolean;
    onClick?: () => void;
    className?: string;
}

export const CheckBox = (props: TCheckBox) => {
    const { children, checked, onClick, className } = props;
    return (
        <div
            className="flex items-center gap-2 p-2 hover:cursor-pointer"
            onClick={onClick}
        >
            <div
                className={cn("size-4 rounded-[0.25rem] border-[1px] border-[#12131A] flex items-center justify-center",
                    checked ? 'bg-[#D3A0FA] border-none' : '', className)}
                id="Exclude-Spaces-Character-Counter"
            >
                {checked && <span>
                    <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1.5L3.5 7L1 4.5"
                            stroke="#12131A"
                            strokeWidth="1.6666"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </span>}
            </div>
            <span
            >
                {children}
            </span>
        </div>
    )
}