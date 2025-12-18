import { router, usePage } from "@inertiajs/react";
import { Form, Modal } from "antd";
import { AlertCircle, Hand, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { LoadingOutlined } from '@ant-design/icons';
type formModal = {
    children?: React.ReactNode; 
    title: string, 
    url: string, 
    open: boolean, 
    dataForm: Record<string, any> | null , 
    methods: string | "POST" | "PUT", 
    onChange?: (value : any) => void;
    onSubmit?: (value : any) => void;
    onClear?: (value : any) => void;
}
import { Flex, Spin } from 'antd';
export default function FormSync({title,children, open, url, methods,dataForm, onChange, onSubmit,onClear} :formModal){
    
            const { flash } = usePage().props as { flash?: { success?: string; error?: string } }; 
          
            const [form] = Form.useForm();
            const [processing, setprocessing] = useState(false);
            const handleOk = async () => {  
               setprocessing(true)
                try {
                    const values = await form.validateFields();  
                    
                    const options = {
                        onSuccess: (v :any) => {
                             setprocessing(false)
                            toast.success(flash?.success ?? "success")
                            if (onSubmit) onSubmit(values); 
                            handleCancel();
                        },
                        onError: (error: any) => { 
                            setprocessing(false)
                            toast.error('Failed to send, cek form!')
                            
                                const laravelErrors = error ;

                                const fields = Object.keys(laravelErrors).map((key) => ({
                                    name: key,
                                    errors: Array.isArray(laravelErrors[key])
                                    ? laravelErrors[key] // kalau backend kirim array
                                    : [laravelErrors[key]], // kalau backend kirim string
                                }));
                                console.log(fields)
                                form.setFields(fields);
                           
                        },
                    };

                    const formData = new FormData(); 
                    // console.log(values);
                    Object.keys(values).forEach((key) => {
                        const value = values[key]; 
                        if (Array.isArray(value)  ) {
                            if( value[0]?.originFileObj) {
                                value.forEach((file: any) => formData.append(key, file.originFileObj));
                            }else{
                                 
                                value.forEach((file: any) => {
                                    if(file.url !== undefined){
                                        formData.append(key, file.url)
                                    }else{ 
                                        formData.append(`${key}[]`,  file.value ?? file);
                                    }
                                });
                            }
                        } else if (value !== undefined) { 
                           
                            let nval = value == null ? '' : value;
                            formData.append(key, nval);
                        }
                    }); 
                    // console.log(formData);
                    if(methods == "POST"){ 
                        router.post(url, formData, options);
                    }

                    if(methods == "PUT"){  
                        formData.append('_method', 'PUT');  
                        router.post(url, formData, options); // tetap pakai POST
                    }
                } catch (error) {
                    setprocessing(false)
                    toast.warning('Validation Failed')
                  
                }
                
            };
    
        const handleCancel = () => {  
            form.resetFields(); 
             if(dataForm !== null){
                const clearData = Object.fromEntries(
                    Object.keys(dataForm).map(key => [key, null])
                );
                if (onClear) onClear(clearData)
             }
            if (onChange) onChange(false);  
        };
     
       useEffect(() => {
                if(dataForm !== null){ 
                    form.setFieldsValue(dataForm);  
                }
           
        }, [dataForm, form]);

        return (
            <>
             <Toaster richColors position="top-center" />
             <Modal
                    title={
                         <div className="flex items-center gap-2">
                            <AlertCircle style={{ color: '#faad14' }} />
                            <span>Yakin sinc data {title} ?</span>
                        </div>
                    }
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={open}
                    onOk={handleOk}
                    okText={"Sync Disini"}
                    onCancel={handleCancel}
                    destroyOnHidden
                    okButtonProps={{ disabled: processing, loading: processing }}
                >
                <div className="p-3 flex flex-col justify-center items-center space-y-4 text-center py-14">  
                    {processing && (
                        <div>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} /> 
                            <p className="mt-8">Proses Sync</p> 
                        </div>
                    )}
                    <p>  Data akan di sycn dan memerlukan waktu pastikan tidak merefresh page sebelum sync berhasil!</p>
                </div>
            </Modal>
            </>
           
        ) 
}