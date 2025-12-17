import { usePage } from "@inertiajs/react";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from "lucide-react";
export function Trending(){
    const {props } = usePage(); 
    const [Data, setData] = useState([]);
    const [loading,setloading] = useState<Boolean>(false)
    const [lengthData, setlengthData] = useState<Number>(6)
    useEffect(() => {
        (async () => {
            setloading(true)
            await getTrending().then(()=>{
                setloading(false)
            });
        })();

       
    }, []);

     useEffect(() => {  
        const updateLength = () => {
            if (window.innerWidth <= 768) {
                setlengthData(3);
            } else {
                setlengthData(6);
            }
        };

        updateLength();  
        window.addEventListener("resize", updateLength);

        return () => window.removeEventListener("resize", updateLength);
    }, [window.innerWidth]);
    const getTrending= async () =>{
    
        try {
            
            const res = await fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${props.tmdb.token}`,
                    "Content-Type": "application/json",
                },
            });
            const d = await res.json();   
            setData(d.results??[])
        } catch (err) { 
            console.error(err);
        }
    }

    return (
        <>

            {loading ? (
                <> 
                    <div className='grid grid-cols-6  max-md:grid-cols-3  gap-3'>  
                        {Array.from({ length: lengthData }).map((_,i)=>(
                            <>
                                <div key={i} className='h-72 w-full border border-gray-200 bg-gray-200'>
                                    <Skeleton.Image active={loading} className="!w-full !h-full"/>
                                </div>
                            </>
                        ))} 
                    </div>
                </>
            ):(
                <> 
                    <div className="relative w-full"> 
                        <button className="cursor-pointer text-2xl w-10 h-10 fac-prev flex items-center justify-center   rounded-full absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-black" >
                            <ChevronLeft className='w-7 h-7 text-white ' />
                        </button>
            
                        <button className="cursor-pointer text-2xl w-10 h-10 fac-next flex items-center justify-center rounded-full absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-black"
                        >
                        <ChevronRight className='w-7 h-7 text-white ' />
                        </button>

                        <div className=' '>
                               <Swiper
                                        autoplay={true}
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: '.fac-prev',
                                            nextEl: '.fac-next',
                                        }}
                                        loop={true}
                                        breakpoints={{
                                            '@0.00': {
                                                slidesPerView: 3,
                                                spaceBetween: 10,
                                            },
                                            '@0.75': {
                                                slidesPerView: 4,
                                                spaceBetween: 20,
                                            },
                                            '@1.00': {
                                                slidesPerView: 5,
                                                spaceBetween: 40,
                                            },
                                            '@1.50': {
                                                slidesPerView: 6,
                                                spaceBetween: 50,
                                            },
                                        }}
                                    >
                                
                                    {Data.map((v)=>(
                                        <>
                                            <SwiperSlide >
                                                <div className='h-72 w-full border border-gray-200'>
                                                    <img  src={`${props.tmdb.uri_img_tmdb}${v.poster_path}`}
                                                        className="w-full h-full object-cover"
                                                        alt="background"
                                                    />      
                                                </div> 
                                            </SwiperSlide>
                                        </>
                                    ))}
                                    
                                        
                            </Swiper>
                        </div>
                    </div>
                 
                </>
            )}
           
            
        </>
    )
}