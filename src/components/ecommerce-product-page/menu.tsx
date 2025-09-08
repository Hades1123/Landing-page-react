interface IProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const Menu = (props: IProps) => {
    const { open, setOpen } = props;
    return (
        <>
            <div className={`z-20 absolute top-0 w-[67%] bg-white min-h-screen p-6 text-2xl font-[700] transition-transform duration-300 ease-in-out md:w-[37%] md:px-20 md:py-12 ${open ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <span className="inline-block text-gray-500 text-2xl rotate-45 mb-14" onClick={() => setOpen(false)}>+</span>
                <ul className="text-[1.125rem] font-[700] flex flex-col gap-6">
                    <li>Collections </li>
                    <li>Men </li>
                    <li>Women </li>
                    <li>About </li>
                    <li>Contact</li>
                </ul>
            </div>
            {open && <div className="bg-[#000] opacity-75 absolute inset-0 z-10"></div>}
        </>
    )
}