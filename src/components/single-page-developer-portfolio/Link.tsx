import { cn } from "@/libs/cn";
import { Link } from "react-router-dom";

type ContactLinkType = {
    children: React.ReactNode;
    className?: string;
    link?: string;
}
export const ContactLink = (props: ContactLinkType) => {
    const { children, className, link = '/' } = props;
    return (
        <Link to={link}>
            <span className={cn("font-[700] inline-block leading-[1.625rem]", className)}>
                {children}
                <div className="h-[0.25rem] bg-[#4EE1A0] mt-[0.63rem]"></div>
            </span>
        </Link>
    )
}