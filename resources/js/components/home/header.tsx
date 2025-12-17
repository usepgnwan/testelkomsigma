import { dashboard, login } from "@/routes";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Button, Drawer } from "antd";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

export function Header(){

    const { auth } = usePage<SharedData>().props;
    console.log(auth.user)
    const [scrolled, setScrolled] = useState(false);

        useEffect(() => {
            const onScroll = () => {
                setScrolled(window.scrollY > 20); // aktif setelah scroll 20px
            };
            window.addEventListener("scroll", onScroll);
            return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <header className={`fixed top-0 w-full min-h-20 p-4 z-50 flex items-center  text-2xl transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]   bg-black/90 text-white backdrop-blur-sm shadow-md  translate-y-0 opacity-100 `}>
                <div className="mx-auto w-10/12 grid grid-cols-5 gap-3 max-md:flex max-md:justify-between max-md:items-center max-md:w-full">
                    <div className="flex justify-center max-md:w-32">
                        <div className='w-44'>
                            <img src="/assets/images/plogo.png"
                                className="object-contain w-full  h-auto"
                                alt="logo"
                                />
                        </div>
                        
                    </div>
                    <div className="hidden max-md:flex"> 
                        <Button onClick={showDrawer} className={`!bg-transparent ${scrolled ? "!text-red-400" : "!text-white "}`}>
                                <Menu />
                        </Button>
                    </div>
                    <div className=' col-span-3 flex items-center justify-center text-lg max-md:hidden'>
                        <ul className='inline-flex space-x-6'>
                            <li className='hover:text-red-400 cursor-pointer'>Home</li>  
                            <li className='hover:text-red-400 cursor-pointer'>Trending</li>  
                            <li className='hover:text-red-400 cursor-pointer'>Movie List</li>  
                            <li className='hover:text-red-400 cursor-pointer'>Contact Us</li>  
                        </ul>
                    </div>
                    <div className='flex space-x-2 justify-center items-center max-md:hidden'>
                         {auth.user ? (
                                       <>
                                        <Link
                                            href={dashboard()}
                                            className="inline-block rounded-sm border border-white px-5 py-1.5 text-lg leading-normal text-white hover:border-white dark:border-white dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Dashboard
                                        </Link>
                                       </>
                                    ) : (

                                            <Link   href={login()} className="flex-1 items-center justify-center bg-white   text-gray-700 py-3 rounded-lg text-lg font-semibold 
                                                    shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200 text-center">
                                                Login
                                            </Link>
                                    )}
                    </div>
                     
                </div>
            </header>

               <Drawer
                        title="Test TelkomSigma"
                        closable={{ 'aria-label': 'Close Button' }}
                        onClose={onClose}
                        open={open}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
            </Drawer>
               
        </>
    )
}