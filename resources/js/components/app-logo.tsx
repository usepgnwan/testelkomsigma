import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md  text-sidebar-primary-foreground">
                   <div className='w-44'>
                            <img src="/assets/images/favicon.png"
                                className="object-contain w-full  h-auto"
                                alt="logo"
                                />
                </div>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                  Test Telkom Sigma
                </span>
            </div>
        </>
    );
}
