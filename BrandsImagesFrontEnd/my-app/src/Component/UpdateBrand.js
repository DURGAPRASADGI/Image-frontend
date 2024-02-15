import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBrand = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const fileid = searchParams.get('fileid');
    const navigate = useNavigate();
    const [Img, setImg] = useState(null);

    const changeImage = (e) => {
        setImg(e.target.files[0]);
    };

    const updateImage = async (e) => {
        e.preventDefault();

        if (!Img) {
            toast.error('Please select a file to update.');
            return;
        }

        const formData = new FormData();
        formData.append('file', Img);

        try {
            await axios.put(`http://localhost:8080/update/${fileid}`, formData);
            toast.success("image add sucess", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating image:', error);
            toast.error('An error occurred while updating the image.');
        }
    };

    return (
        <>



            <h1 className="text-center text-3xl my-10 font-semibold">Update Brand</h1>


            <div className="flex w-full  items-center justify-center bg-grey-lighter gap-5 h-40">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue ">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a file</span>
                    <input type='file' onChange={changeImage} className="hidden" />
                </label>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={updateImage}>
                    Button
                </button>
            </div>



            <ToastContainer />
        </>
    );
};

export default UpdateBrand;
