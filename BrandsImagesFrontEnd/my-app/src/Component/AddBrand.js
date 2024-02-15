import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddBrand = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const fileChanges = (e) => {
    setFile(e.target.files[0])
  }

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("file", file)
    try {
      axios.post("http://localhost:8080/upload", formData)
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

      navigate("/")


    } catch (error) {
      toast.success("please enter correct iamge", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      <h1 className="text-center text-3xl my-10 font-semibold">Add Brand</h1>


      <div className="flex w-full  items-center justify-center bg-grey-lighter gap-5 h-40">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue ">
          <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input type='file' onChange={fileChanges} className="hidden" />
        </label>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={submit}>
          Button
        </button>
      </div>

      <ToastContainer />
    </>
  )
}

export default AddBrand
