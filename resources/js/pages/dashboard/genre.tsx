import SelectFilter from "@/components/custom/select-filter";
import Table from "@/components/custom/table";
 import AppLayout from "@/layouts/app-layout";
import {  genre, genresyn  } from "@/routes";
import { BreadcrumbItem } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button as Btnand, Form, Image, Input, Modal, Select} from 'antd';
import { AlertCircle, Plus, RefreshCw, SquarePen, Trash2 } from "lucide-react"; 
import { toast } from "sonner";
import Th from "@/components/custom/th";
import { useSortable } from "@/components/custom/useSortable";
import useCustom from "@/components/custom/useCustom";
import FormSync from "@/components/custom/form-sync";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: genre().url,
    },
];

export default function User({ data ,filters}) {
    
    const { url, props } = usePage();
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const page = queryParams.get('page') || '1';
    const perPage = queryParams.get('per_page') || '10';
    const [search, setSearch] = useState(filters.search || "");
    const [selected, setSelected] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onSumbit, setonSumbit] = useState(false);
    const [title, setTitle] = useState("Genre")
    const [users, setUsers] = useState(null);
 

    const [methods, setmethods] = useState("POST")
    const [uri, seturi] = useState("POST")
    
    const showModal = () => {
        setmethods("POST")
        seturi(genresyn().url) 
        setUsers(null)
        setonSumbit(false);
        setIsModalOpen(true); 
    };
 
    const { sorts, sortBy , sortParams} = useSortable();
    const { DateID} = useCustom();
  
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }
        let select = selected !== null ? selected.value : 10; 
        const timeout = setTimeout(() => {
            searchTo(select,sortParams); 
        }, 300);

        return () => clearTimeout(timeout);
 
    }, [search, selected,sorts]);

    const searchTo = (select : any, sorts : any) => { 
        router.get(genre(),
            { search, per_page: select,sorts: sorts   },
            { preserveState: true, replace: true }
        );
    }
    return (
        <AppLayout  breadcrumbs={breadcrumbs}>
            <Head title="Genre" />
            <div className="pt-4 px-1 mx-4 flex justify-end">

                <Btnand type="primary" className="!py-5 rounded-2xl" onClick={showModal}><RefreshCw className="w-4 h-4" />Sync Data</Btnand>
            </div>
            <div className="p-4 bg-white rounded-2xl border m-4">
                   <div className="mb-4 flex justify-between">
                    <div>
                        <SelectFilter value={selected} onChange={setSelected} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border px-3 py-2 w-64 rounded-2xl"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    </div>
                    <Table data={data}>
                        <Table.Header>
                            <tr className="text-left border-b">  
                                <Th >ID</Th>
                                <Th
                                    sortable
                                    direction={sorts.name ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("name")}
                                >
                                    Nama Genre
                                </Th>
                                <Th
                                    sortable
                                    direction={sorts.category ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("category")}
                                >
                                    Category
                                </Th> 
                                <Th
                                    sortable
                                    direction={sorts.created_at ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("created_at")}
                                >
                                    Created At
                                </Th> 
                                <Th
                                    sortable
                                    direction={sorts.date_sycn ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("date_sycn")}
                                >
                                    Sycn Date
                                </Th> 
                            </tr>
                        </Table.Header>
                        <Table.Body data={data}>
                            {data.data.map((v,i) => (
                            <tr key={v.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                               
                                <td className="p-2"> {(parseInt(page) - 1) * parseInt(perPage) + (i + 1)}
                                </td>
                                <td className="p-2">{v.name}</td>
                                <td className="p-2">{v.category}</td> 
                                <td className="p-2"> {DateID(v.created_at, null)}</td> 
                                <td className="p-2"> {DateID(v.date_sycn, null)}</td> 
                            </tr>
                            ))}
                        </Table.Body>
                        <Table.Footer>
                            <tr className="text-left border-b">  
                                <Th >ID</Th>
                                <Th
                                    sortable
                                    direction={sorts.name ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("name")}
                                >
                                    Nama Genre
                                </Th>
                                <Th
                                    sortable
                                    direction={sorts.email ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("email")}
                                >
                                    Category
                                </Th> 
                                <Th
                                    sortable
                                    direction={sorts.created_at ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("created_at")}
                                >
                                    Created At
                                </Th> 
                                <Th
                                    sortable
                                    direction={sorts.date_sycn ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("date_sycn")}
                                >
                                    Sycn Date
                                </Th> 
                            </tr>
                        </Table.Footer>
                    </Table>
            </div>

            <FormSync open={isModalOpen} title={title} onChange={setIsModalOpen} url={uri} methods={methods} dataForm={users} onSubmit={setonSumbit} onClear={setUsers}>
            </FormSync>

           

        </AppLayout>
    )
}
