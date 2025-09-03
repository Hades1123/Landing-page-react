import logo from 'assets/browser-extension-manager/logo.svg'
import moon from 'assets/browser-extension-manager/icon-moon.svg'
import sun from 'assets/browser-extension-manager/icon-moon.svg'
import { data } from 'assets/browser-extension-manager/data'
import { cn, tw } from '@/libs/cn'
import { useState } from 'react'

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
        primary: cn('rounded-[62.4375rem] border-[1px] border-[#D6E2F5] bg-[#FBFDFE]  pt-2 pr-5 pb-[0.625rem] pl-[1.25rem] text-[1.25rem] font-[500] focus:outline-2 focus:outline-red-600 focus:outline-offset-4', shadowStyle),
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

    return (
        <>
            <div className='pt-5 px-4 pb-4 bg-white bg-gradient-to-b from-[#EBF2FC] to-[#EEFBF9] flex gap-10 flex-col font-NotoSans min-h-screen'>
                {/* header */}
                <div className='flex justify-between rounded-[0.625rem] border-[1px] border-[#D6E2F5] py-[0.5rem] px-[0.75rem]
                bg-[#FBFDFE] shadow-[0_2px_3px_0_#D9E5F4]'>
                    <img src={logo} alt="logo" />
                    <div className='w-[3.125rem] h-[3.125rem] rounded-[0.75rem] bg-[#EEE] flex items-center justify-center hover:bg-[#C6C6C6] hover:cursor-pointer focus:ring-2 focus:ring-red-500'>
                        <img src={moon} alt="moon-icon" />
                    </div>
                </div>

                {/* main title  */}
                <div className='flex flex-col gap-6 md:flex-row md:justify-between'>
                    <h1 className='text-[2.125rem] font-[700] text-center'>Extensions List</h1>
                    <div className='flex gap-3 justify-center'>
                        <Button variant='primary'
                            className={buttonState == 'All' ? 'text-white bg-[#C7231A]' : ''}
                            onClick={() => {
                                setCurrentData(data);
                                setButtonState('All');
                            }}
                        >All</Button>
                        <Button variant='primary'
                            onClick={() => {
                                setCurrentData(data.filter(item => item.isActive == true));
                                setButtonState('Active');
                            }}
                            className={buttonState == 'Active' ? 'text-white bg-[#C7231A]' : ''}
                        >Active</Button>
                        <Button
                            variant='primary'
                            onClick={() => {
                                setCurrentData(data.filter(item => item.isActive == false));
                                setButtonState('Inactive');
                            }}
                            className={buttonState == 'Inactive' ? 'text-white bg-[#C7231A]' : ''}
                        >Inactive</Button>
                    </div>
                </div>

                {/* card list  */}
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        currentData.map((item, index) => {
                            return (
                                <div key={index.toString() + item.name}
                                    className='rounded-[1.25rem] border border-[#D6E2F5] bg-[#FBFDFE] shadow-[0_2px_2px_0_rgba(194,206,225,0.20),0_1px_5px_1px_rgba(194,206,225,0.22)] p-5 flex flex-col justify-between h-[12.5rem]'
                                >
                                    {/* main card  */}
                                    <div className='flex gap-4 items-start'>
                                        <img src={item.logo} alt="item-logo" />
                                        <div className='mb-2'>
                                            <h1 className='text-[1.25rem] font-[700]'>{item.name}</h1>
                                            <p className='text-[#535868] line-clamp-4'>{item.description}</p>
                                        </div>
                                    </div>
                                    {/* button  */}
                                    <div className='flex justify-between items-center'>
                                        <Button
                                            className='hover:bg-[#C7231A] hover:text-white'
                                            variant='remove'
                                            onClick={() => {
                                                setCurrentData(currentData.filter(element => element.name != item.name));
                                            }}>Remove</Button>
                                        {
                                            item.isActive ?
                                                <button
                                                    className='w-[2.25rem] h-[1.25rem] p-[0.125rem] flex justify-end rounded-[624.9375rem] bg-[#C7231A] hover:cursor-pointer hover:bg-[#DE4840] focus:outline-2 focus:outline-red-500 focus:outline-offset-4'
                                                    onClick={() => {
                                                        setCurrentData(currentData.map(element => {
                                                            if (element.name == item.name) {
                                                                element.isActive = false;
                                                            }
                                                            return element;
                                                        }))
                                                    }}
                                                >
                                                    <span className="size-[1rem] rounded-[624.9375rem] bg-[#FBFDFE] shadow-[0_1px_3px_0_rgba(10,13,18,0.30),0_1px_2px_-1px_rgba(10,13,18,0.30)]"></span>
                                                </button>
                                                :
                                                <button
                                                    className='w-[2.25rem] h-[1.25rem] p-[0.125rem] flex justify-start rounded-[624.9375rem] bg-[#C6C6C6] hover:cursor-pointer focus:outline-2 focus:outline-red-500 focus:outline-offset-4'
                                                    onClick={() => {
                                                        setCurrentData(currentData.map(element => {
                                                            if (element.name == item.name) {
                                                                element.isActive = true;
                                                            }
                                                            return element;
                                                        }))
                                                    }}
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