import { usePage } from "@inertiajs/react";
import { Modal, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { movieslist } from "@/routes";
import { CardMovie } from "./card-movie";
import DetailCard from "@/pages/partials/detailcard";

export function NewMovieList() {
    const { url } = usePage();
    const queryParams = new URLSearchParams(url.split("?")[1]);

    const perPage = queryParams.get("per_page") || "3";

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [lengthData, setLengthData] = useState(3);
 
   

    useEffect(() => {
        const updateLength = () => {
            setLengthData(window.innerWidth <= 768 ? 3 : 3);
        };

        updateLength();
        window.addEventListener("resize", updateLength);

        return () => window.removeEventListener("resize", updateLength);
    }, []);

   
    const getTrending = async (pageNum = 1) => {
        try {
            setLoading(true);

            const res = await fetch(
                `${movieslist().url}?per_page=${perPage}&page=${pageNum}&sorts[created_at]=desc`,
                { method: "GET" }
            );

            const d = await res.json();

            if (pageNum === 1) {
                setData(d.data.data);
            } else {
                setData(prev => [...prev, ...d.data.data]);
            }
 
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

 
    useEffect(() => {
        getTrending(1);
    }, []);

     

    
    const [showdetail, setshowdetail] = useState(false)
    const [detailData, setdetailData] = useState({});
    const Detail = async (data:any) => {
        setshowdetail(true);  
        setdetailData(data) 
    };
    const handleCancel = () => {
        setshowdetail(false) 
    };
        
    return (
        <>
        <div className=" ">
              
            </div>
            {loading && data.length === 0 ? (
                <div className="grid grid-cols-1 gap-3">
                    {Array.from({ length: lengthData }).map((_, i) => (
                        <div key={i} className="flex space-x-2">
                            <div className="h-28  w-20">
                                <Skeleton.Image active className="!w-full !h-full" />
                            </div>
                            <div className=" w-3/4 h-28 space-y-0 "> 
                                <Skeleton.Input active={true} size="small" style={{height:10  }} />
                                <Skeleton.Input active={true} size="small" style={{height:10  }} className="!w-full"/>
                                <Skeleton.Input active={true} size="small" style={{height:10  }} className="!w-full"/> 
                                <Skeleton.Input active={true} size="small" style={{height:10  }} className="!w-full"/> 
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-3">
                        {data.map((item, i) => (
                            <div key={i} onClick={async()=> await Detail(item)}>
                                <CardMovie key={item.id ?? i} detailData={item} isnew={true} />
                            </div>
                        ))}
                    </div>

               
                   
                </>
            )}


            <Modal
                title="Detail Movies"
                closable={false}
                open={showdetail}
                width={800}  
                okButtonProps={{ style: { display: "none" } }}
                onCancel={handleCancel}
                cancelText="Tutup"

                >
                <div className='space-y-8'>  

                    {showdetail && ( 
                        <DetailCard detailData={detailData} />
                    )}
                </div>
            </Modal>
        </>
    );
}
