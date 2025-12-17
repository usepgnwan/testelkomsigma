import { Carousel } from "antd";
 
export function Jumbotron(){
    return (
        <>
            <section className="w-full  relative"> 
                        <Carousel  autoplay  dots  dotPosition="bottom"
                       
                        >
                            {/* Slide 1 */}
                            <div className="h-[440px] w-full relative">
                                <div className="absolute inset-0 h-full">
                                    <img
                                        src="https://image.tmdb.org/t/p/w500/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg"
                                        className="w-full h-full object-cover"
                                        alt="background"
                                    />
                                    <div className="absolute inset-0 bg-black/15"></div>
                                </div>
                            </div>
        
                            {/* Slide 2 */}
                            <div className="h-[440px] w-full relative">
                                <div className="absolute inset-0 h-full">
                                    <img
                                        src="https://image.tmdb.org/t/p/w500/ouB7hwclG7QI3INoYJHaZL4vOaa.jpg"
                                        className="w-full h-full object-cover"
                                        alt="background"
                                    />
                                    <div className="absolute inset-0 bg-black/15"></div>
                                </div>
                            </div>
                            <div className="h-[440px] w-full relative">
                                <div className="absolute inset-0 h-full">
                                    <img
                                        src="https://image.tmdb.org/t/p/w500/gMJngTNfaqCSCqGD4y8lVMZXKDn.jpg"
                                        className="w-full h-full object-cover"
                                        alt="background"
                                    />
                                    <div className="absolute inset-0 bg-black/15"></div>
                                </div>
                            </div>
                        </Carousel> 
            </section>
        </>
    )
}