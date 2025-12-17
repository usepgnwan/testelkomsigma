import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 text-white p-6 md:p-10 bg-gray-200">
            <div className="w-full max-w-sm p-5 bg-black/90 backdrop-blur-sm  text-white rounded-2xl">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex  items-center justify-center rounded-md p-4"> 
                                <div className='w-44'>
                                    <img src="/assets/images/plogo.png"
                                        className="object-contain w-full  h-auto"
                                        alt="logo"
                                        />
                                </div>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            {/* <h1 className="text-xl font-medium">{title}</h1> */}
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
