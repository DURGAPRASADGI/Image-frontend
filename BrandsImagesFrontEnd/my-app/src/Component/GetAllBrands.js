import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const GetAllBrands = () => {
    const navigate = useNavigate()
    const [brand, setBrand] = useState([])

    useEffect(() => {
        fetchBrand()
    })
    const fetchBrand = async () => {
        await axios.get("http://localhost:8080/getAllBrands").then((res) => setBrand(res.data)).catch((error) => console.log(error))

    }

    const addBrand = () => {
        navigate("/addBrand")
    }
    const download = async (fileid, fileName) => {

        try {
            const response = await fetch(`http://localhost:8080/download/${fileid}`);
            const blob = await response.blob();

            const blobURL = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = blobURL;
            anchor.download = fileName;
            anchor.click();
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };













    const upadate = (fileid) => {
        navigate(`/update?fileid=${fileid}`)

    }

    const remove = (fileid) => {
        console.log(fileid)


        axios.delete(`http://localhost:8080/removeBrand/${fileid}`).then(() => {

            toast.success("image has deleted", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


        }).catch((error) => console.log(error))


    }
    return (
        <>

            <button className='bg-blue-800 text-white hover:bg-blue-400 py-3 px-5 border-2 rounded-xl m-4 shadow-lg  ' onClick={addBrand}>Add brand</button>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-left text-sm font-light">
                                <thead class="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">S.No</th>
                                        <th scope="col" class="px-6 py-4">ImageName</th>
                                        <th scope="col" class="px-6 py-4">Image</th>
                                        <th scope="col" class="px-6 py-4">ImageType</th>
                                        <th scope="col" class="px-6 py-4">
                                            Delete
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Update
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Download
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brand.map((image, index) => (

                                        <tr class="border-b dark:border-neutral-500" key={index}>
                                            <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{image.fileName}</td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                <img src={image.downloadUri} alt="..." className='w-24 h-16' />

                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">{image.fileType}</td>
                                            <td>
                                                <button className='bg-slate-800 text-white hover:bg-slate-400 py-3 px-5 border-2 rounded-xl m-4 shadow-lg  ' onClick={() => remove(image.token)}>Delete</button>

                                            </td>

                                            <td>
                                                <button className='bg-slate-800 text-white hover:bg-slate-400 py-3 px-5 border-2 rounded-xl m-4 shadow-lg  ' onClick={() => upadate(image.token)}>Update</button>

                                            </td>
                                            <td>
                                                <button className='bg-slate-800 text-white hover:bg-slate-400 py-3 px-5 border-2 rounded-xl m-4 shadow-lg  ' onClick={() => download(image.token, image.fileName)}>Download</button>

                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />


        </>
    )

}

export default GetAllBrands
