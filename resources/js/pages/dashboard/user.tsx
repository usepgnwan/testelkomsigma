import SelectFilter from "@/components/custom/select-filter";
import Table from "@/components/custom/table";
 import AppLayout from "@/layouts/app-layout";
import {  userdelete, userget, usergetid, userstore, userupdate } from "@/routes";
import { BreadcrumbItem } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button as Btnand, Form, Image, Input, Modal, Select} from 'antd';
import { AlertCircle, Plus, SquarePen, Trash2 } from "lucide-react";
import FormModal from "@/components/custom/form-modal";
import { toast } from "sonner";
import Th from "@/components/custom/th";
import { useSortable } from "@/components/custom/useSortable";
import useCustom from "@/components/custom/useCustom";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: userget().url,
    },
];

export default function User({ user ,filters}) {
    
    const { url, props } = usePage();
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const page = queryParams.get('page') || '1';
    const perPage = queryParams.get('per_page') || '10';
    const [search, setSearch] = useState(filters.search || "");
    const [selected, setSelected] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onSumbit, setonSumbit] = useState(false);
    const [title, setTitle] = useState("Tambah Data User")
    const [users, setUsers] = useState(null);
 

    const [methods, setmethods] = useState("POST")
    const [uri, seturi] = useState("POST")
    
    const showModal = () => {
        setmethods("POST")
        seturi(userstore().url)
        setTitle("Tambah Data User");
        setUsers(null)
        setonSumbit(false);
        setIsModalOpen(true); 
    };

    
    
    const edit = async (id : number)=>{
        try {
            setmethods("PUT")
            const res = await fetch(usergetid({id:id}).url);
            const data = await res.json(); 
            seturi(userupdate({id:id}).url)
            setTitle("Ubah Data User");

            const initialValues = {
                        ...data.data, 
                    };
           
            setUsers(initialValues);
            setonSumbit(false);
            setIsModalOpen(true);
        } catch (err) {
            console.error(err);
        }
    }

    const searchTo = (select : any, sorts : any) => { 
        router.get(userget(),
            { search, per_page: select,sorts: sorts   },
            { preserveState: true, replace: true }
        );
    }
    const [confirmDel, setconformDel] = useState(false)
    const [deleteID,setdeleteID] = useState(0)
    const showConfirm = (id:number ) => {
        setconformDel(true);
        setdeleteID(id)
    };
    const handleCancel = () => {
        setconformDel(false)
        setdeleteID(0)
    };

    const handleOk = async () =>{
        router.delete(userdelete({id:deleteID}).url, {
            onSuccess: () => {
                toast.success("Data berhasil dihapus");
                handleCancel()
            },
            onError: () => {
                toast.error("Gagal menghapus data");
            },
        });
    }
    const { sorts, sortBy , sortParams} = useSortable();
    const { DateID} = useCustom();
   
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }
        console.log(sortParams)
        let select = selected !== null ? selected.value : 10; 
        const timeout = setTimeout(() => {
            searchTo(select,sortParams); 
        }, 300);

        return () => clearTimeout(timeout);
 
    }, [search, selected,sorts]);

 
    return (
        <AppLayout  breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="pt-4 px-1 mx-4 flex justify-end">

                <Btnand type="primary" className="!py-5 rounded-2xl" onClick={showModal}><Plus className="w-4 h-4" />Tambah Baru</Btnand>
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
                    <Table data={user}>
                        <Table.Header>
                            <tr className="text-left border-b"> 
                                <Th >.::.</Th>
                                <Th >ID</Th>
                                <Th
                                    sortable
                                    direction={sorts.name ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("name")}
                                >
                                    Nama
                                </Th>
                                <Th
                                    sortable
                                    direction={sorts.email ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("email")}
                                >
                                    Email
                                </Th> 
                                <Th
                                    sortable
                                    direction={sorts.created_at ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("created_at")}
                                >
                                    Created At
                                </Th> 
                            </tr>
                        </Table.Header>
                        <Table.Body data={user}>
                            {user.data.map((v,i) => (
                            <tr key={v.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <td className="p-2 flex space-x-1.5 text-sm">
                                        <Btnand type="primary"  onClick={async()=> await edit(v.id)}><SquarePen className="w-3 h-3" /></Btnand>
                                        <Btnand color="danger" onClick={()=>{showConfirm(v.id)}} variant="solid"><Trash2 className="w-3 h-3" /></Btnand>
                                </td>
                                <td className="p-2"> {(parseInt(page) - 1) * parseInt(perPage) + (i + 1)}
                                </td>
                                <td className="p-2">{v.name}</td>
                                <td className="p-2">{v.email}</td> 
                                <td className="p-2"> {DateID(v.created_at,null)}</td> 
                            </tr>
                            ))}
                        </Table.Body>
                        <Table.Footer>
                            <tr className="text-left border-b"> 
                                <Th >.::.</Th>
                                <Th >ID</Th>
                                <Th
                                    sortable
                                    direction={sorts.name ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("name")}
                                >
                                    Nama
                                </Th>
                                <Th
                                    sortable
                                    direction={sorts.email ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("email")}
                                >
                                    Email
                                </Th> 
                                <Th
                                    sortable
                                    direction={sorts.created_at ?? null}
                                    multiColumn 
                                    onClick={() => sortBy("created_at")}
                                >
                                    Created At
                                </Th> 
                            </tr>
                        </Table.Footer>
                    </Table>
            </div>

            <FormModal open={isModalOpen} title={title} onChange={setIsModalOpen} url={uri} methods={methods} dataForm={users} onSubmit={setonSumbit} onClear={setUsers}>
                <Form.Item name="name" style={{ marginBottom: 12 }} label="Nama User" rules={[{ required: true, message: "Nama User wajib diisi" }]}>
                    <Input placeholder="Nama User" />
                </Form.Item>
                <Form.Item name="email" style={{ marginBottom: 12 }} label="Email User" rules={[{ required: true, message: "Email User wajib diisi" }]}>
                    <Input placeholder="Email User" />
                </Form.Item>
              
              
                {users === null &&(
                    <>
                        <Form.Item name="password" style={{ marginBottom: 12 }} label="Password"  rules={[
                            { required: true, message: "Password wajib diisi" },
                            { min: 6, message: "Password minimal 6 karakter" },
                        ]}>
                            <Input type="password" placeholder="Password"  />
                        </Form.Item>
                        <Form.Item name="repeat_password" style={{ marginBottom: 12 }} label="Repeat Password" 
                            dependencies={["password"]}
                            rules={[
                                { required: true, message: "Repeat Password wajib diisi" },
                                ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                    }
                                    return Promise.reject(
                                    new Error("Password dan Repeat Password tidak sama")
                                    );
                                },
                                }),
                            ]}
                        >
                            <Input type="password" placeholder="Repeat Password"  />
                        </Form.Item>
                    </>
                )}
        
              
            </FormModal>

            {/* <MyDatePicker /> */}

            <Modal
                title={
                      <div className="flex items-center gap-2">
                        <AlertCircle style={{ color: '#faad14' }} />
                        <span>Konfirmasi Hapus</span>
                    </div>
                }
                width={400}
                closable={false}
                open={confirmDel}
                onOk={handleOk}
                okText="Hapus"
                okButtonProps={{ danger: true }}
                onCancel={handleCancel}
                cancelText="Batal"

                >
                <div className="p-3">
                    Apakah Anda yakin ingin menghapus data ini?
                </div>
                </Modal>

        </AppLayout>
    )
}
