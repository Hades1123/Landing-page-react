import logo from 'assets/browser-extension-manager/logo.svg'
import moon from 'assets/browser-extension-manager/icon-moon.svg'
import sun from 'assets/browser-extension-manager/icon-sun.svg'
import { data } from 'assets/browser-extension-manager/data'
import { cn, tw } from '@/libs/cn'
import { useEffect, useState } from 'react'

type Variant = 'primary' | 'remove';

type ButtonProps = {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    variant: Variant,
}

const Button = (props: ButtonProps) => {
    const { children, onClick, className = "", variant } = props;
    const shadowStyle = tw("shadow-[0_1px_2px_0_rgba(184,196,215,0.40)]");
    const variantStyles: Record<Variant, string> = {
        primary: cn('rounded-[62.4375rem] border-[1px] border-[#D6E2F5] bg-[#FBFDFE]  pt-2 pr-5 pb-[0.625rem] pl-[1.25rem] text-[1.25rem] font-[500] focus:outline-2 focus:outline-red-600 focus:outline-offset-4 dark:bg-[#2F364B] dark:border-[#535868] dark:text-[#FBFDFE]', shadowStyle),
        remove: tw('rounded-[62.4375rem] border-[1px] border-[#C6C6C6] bg-[#FBFDFE py-2 px-4 text-[1.25rem] font-[500] focus:outline-2 focus:outline-red-500 focus:outline-offset-4'),
    }
    return (
        <button onClick={onClick} className={cn(variantStyles[variant], className)}>
            {children}
        </button>
    )
}

const BrowserExtension = () => {
    const [currentData, setCurrentData] = useState(data);
    const [buttonState, setButtonState] = useState('All');
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, [])

    // Dark mode toggle handler
    const toggleDarkMode = () => {
        const newDarkMode = !isDark;
        localStorage.theme = newDarkMode ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newDarkMode);
        setIsDark(newDarkMode);
    };

    // Filter handler
    const handleFilterChange = (filterType: string) => {
        setButtonState(filterType);
        switch (filterType) {
            case 'All':
                setCurrentData(data);
                break;
            case 'Active':
                setCurrentData(data.filter(item => item.isActive === true));
                break;
            case 'Inactive':
                setCurrentData(data.filter(item => item.isActive === false));
                break;
        }
    };

    // Remove extension handler
    const handleRemoveExtension = (extensionName: string) => {
        setCurrentData(currentData.filter(element => element.name !== extensionName));
    };

    // Toggle active status handler
    const handleToggleActive = (extensionName: string, newStatus: boolean) => {
        setCurrentData(currentData.map(element => {
            if (element.name === extensionName) {
                element.isActive = newStatus;
            }
            return element;
        }));
    };

    return (
        <>
            <div
                className='pt-5 px-4 pb-4 bg-white bg-gradient-to-b from-[#EBF2FC] to-[#EEFBF9] flex gap-10 flex-col font-NotoSans min-h-screen dark:bg-transparent dark:bg-gradient-to-b dark:from-[#04091B] dark:to-[#091540]'
            >
                {/* header */}
                <div className='flex justify-between rounded-[0.625rem] border-[1px] border-[#D6E2F5] py-[0.5rem] px-[0.75rem]
                bg-[#FBFDFE] shadow-[0_2px_3px_0_#D9E5F4]'>
                    <img src={logo} alt="logo" />
                    <div
                        className='w-[3.125rem] h-[3.125rem] rounded-[0.75rem] bg-[#EEE] flex items-center justify-center hover:bg-[#C6C6C6] hover:cursor-pointer focus:ring-2 focus:ring-red-500'
                        onClick={toggleDarkMode}
                    >
                        <img src={isDark ? sun : moon} alt="moon/soon-icon" />
                    </div>
                </div>

                {/* main title  */}
                <div className='flex flex-col gap-6 md:flex-row md:justify-between'>
                    <h1 className='text-[2.125rem] font-[700] text-center dark:text-[#FBFDFE]'>Extensions List</h1>
                    <div className='flex gap-3 justify-center'>
                        <Button variant='primary'
                            className={buttonState == 'All' ? 'text-white bg-[#C7231A] dark:text-[#091540] dark:bg-[#F25C54]' : ''}
                            onClick={() => handleFilterChange('All')}
                        >All</Button>
                        <Button variant='primary'
                            onClick={() => handleFilterChange('Active')}
                            className={buttonState == 'Active' ? 'text-white bg-[#C7231A] dark:text-[#091540] dark:bg-[#F25C54]' : ''}
                        >Active</Button>
                        <Button
                            variant='primary'
                            onClick={() => handleFilterChange('Inactive')}
                            className={buttonState == 'Inactive' ? 'text-white bg-[#C7231A] dark:text-[#091540] dark:bg-[#F25C54]' : ''}
                        >Inactive</Button>
                    </div>
                </div>

                {/* card list  */}
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        currentData.map((item, index) => {
                            return (
                                <div key={index.toString() + item.name}
                                    className='rounded-[1.25rem] border border-[#D6E2F5] bg-[#FBFDFE] shadow-[0_2px_2px_0_rgba(194,206,225,0.20),0_1px_5px_1px_rgba(194,206,225,0.22)] p-5 flex flex-col justify-between h-[12.5rem] dark:bg-[#202535] dark:border-[#535868]'
                                >
                                    {/* main card  */}
                                    <div className='flex gap-4 items-start'>
                                        <img src={item.logo} alt="item-logo" />
                                        <div className='mb-2'>
                                            <h1 className='text-[1.25rem] font-[700] dark:text-[#FBFDFE]'>{item.name}</h1>
                                            <p className='text-[#535868] line-clamp-4 dark:text-[#C6C6C6]'>{item.description}</p>
                                        </div>
                                    </div>
                                    {/* button  */}
                                    <div className='flex justify-between items-center'>
                                        <Button
                                            className='hover:bg-[#C7231A] hover:text-white dark:text-[#FBFDFE]'
                                            variant='remove'
                                            onClick={() => handleRemoveExtension(item.name)}
                                        >Remove</Button>
                                        {
                                            item.isActive ?
                                                <button
                                                    className='w-[2.25rem] h-[1.25rem] p-[0.125rem] flex justify-end rounded-[624.9375rem] bg-[#C7231A] hover:cursor-pointer hover:bg-[#DE4840] focus:outline-2 focus:outline-red-500 focus:outline-offset-4
                                                    dark:bg-[#F25C54]'
                                                    onClick={() => handleToggleActive(item.name, false)}
                                                >
                                                    <span className="size-[1rem] rounded-[624.9375rem] bg-[#FBFDFE] shadow-[0_1px_3px_0_rgba(10,13,18,0.30),0_1px_2px_-1px_rgba(10,13,18,0.30)]"></span>
                                                </button>
                                                :
                                                <button
                                                    className='w-[2.25rem] h-[1.25rem] p-[0.125rem] flex justify-start rounded-[624.9375rem] bg-[#C6C6C6] hover:cursor-pointer focus:outline-2 focus:outline-red-500 focus:outline-offset-4 dark:bg-[#535868]'
                                                    onClick={() => handleToggleActive(item.name, true)}
                                                >
                                                    <span className="size-[1rem] rounded-[624.9375rem] bg-[#FBFDFE] shadow-[0_1px_3px_0_rgba(10,13,18,0.30),0_1px_2px_-1px_rgba(10,13,18,0.30)]"></span>
                                                </button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default BrowserExtension;