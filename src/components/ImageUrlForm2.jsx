import React, { useState, useEffect } from "react";
import {
    getImages,
    getImagesByReport,
    createImage,
    updateImage,
    deleteImage,
} from "../services/imageUrl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { getImages, getImagesByReport, createImage, updateImage, deleteImage } from './api';

const ImageUrlForm2 = ({ reportIds }) => {
    const token = localStorage.getItem("token");
    const notifsuccess = () =>
        toast.success(
            `berhasil edit data equipment! name: ${type_of_worker}, qty: ${qty}`,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
    const notifsuccessnew = () =>
        toast.success(`berhasil menambahkan data equipment baru!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const notifsuccessdel = () =>
        toast.success(`berhasil menghapus data equipment !`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const notifyerror = () =>
        toast.error("input cannot be empty", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const [images, setImages] = useState([]);
    const [reportId, setReportId] = useState("");
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchImages();
        console.log("===>", reportIds, token);
    }, []);

    const fetchImages = async () => {
        try {
            const fetchedImages = await getImagesByReport(
                reportIds,
                token
            ).then((result) => {
                setImages(result);
                console.table(result);
            });
            // setImages(fetchedImages);
            console.log(fetchedImages);
        } catch (error) {
            console.error("Error while fetching images:", error);
        }
    };

    const handleReportIdChange = (event) => {
        setReportId(event.target.value);
    };

    const handleImageFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleCreateImage = async () => {
        if (!reportIds || !imageFile) {
            console.error("Report ID or image file is missing.");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("report_id", reportIds);

        try {
            const createdImage = await createImage(formData, token);
            setImages([...images, createdImage]);
            //   setReportId('');
            notifsuccessnew();
            setImageFile(null);
        } catch (error) {
            console.error("Error while creating image:", error);
            notifyerror();
        }
    };

    const handleUpdateImage = async (imageId) => {
        if (!imageFile) {
            console.error("Image file is missing.");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const updatedImage = await updateImage(imageId, formData);
            setImages(
                images.map((image) =>
                    image.id === updatedImage.id ? updatedImage : image
                )
            );
            setImageFile(null);
        } catch (error) {
            console.error("Error while updating image:", error);
        }
    };

    const handleDeleteImage = async (imageId) => {
        try {
            await deleteImage(imageId, token);
            setImages(images.filter((image) => image.id !== imageId));
            notifsuccessdel();
        } catch (error) {
            console.error("Error while deleting image:", error);
            notifyerror;
        }
    };

    return (
        <div className="container mx-auto">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* <div className="mb-4">
                <label htmlFor="imageFile" className="mb-2 block font-bold">
                    Image File:
                </label>
                <input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="border-gray-300 rounded border p-2"
                />
            </div>

            <button
                onClick={handleCreateImage}
                className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 font-bold text-blue1"
            >
                Create Image
            </button> */}

            <h2 className="mt-8 mb-4 text-xl font-bold">Images:</h2>

            <div className="grid grid-cols-1 gap-4 px-4 pt-5 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-3 lg:gap-1">
                {images.map((image) => (
                    <div key={image.id} className="mb-0">
                        <img
                            src={`http://127.0.0.1:8000${image.imageUrl}`}
                            alt={`Image ${image.id}`}
                            className="h-32 w-32 rounded-md object-cover"
                        />
                        {/* <p>{`http://127.0.0.1:8000${image.imageUrl}`}</p> */}
                        {/* <button
                            onClick={() => handleUpdateImage(image.id)}
                            className="bg-green-500 hover:bg-green-700 ml-4 rounded py-2 px-4 font-bold text-blue1"
                        >
                            Update
                        </button> */}
                        {/* <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="bg-red-500 hover:bg-red-700 ml-4 rounded py-2 px-4 font-bold text-blue1"
                        >
                            Delete
                        </button> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUrlForm2;
