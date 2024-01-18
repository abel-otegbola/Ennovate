// import { storage } from "../../firebase/storage";
import { useEffect, useState } from "react";
import { handleUpload, storage } from "../../firebase/storage";
import { deleteObject, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/storage";

function Upload({ images, setImages, accept, id, i }: any) {
    const [uploadStatus, setUploadStatus] = useState({status: "", percent: 0})

    useEffect(() => {
        if(images[i].url) {
            setUploadStatus({status: "uploaded", percent: 100})
        }
    }, [])

    const uploadImg = () => {
        handleUpload(images[i].file)
        .then(result => {
            const uploadTask = uploadBytesResumable(result, images[i].file);
            uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
    
                // update progress
                setUploadStatus({status: "uploading", percent: percent});
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                    setUploadStatus({status: "finished", percent: 100});
                    let newImg = { id, name: images[i].name, url, type: images[i].type}  
                    // setImg(newImg) 
                    setImages(images.map((image: any) => {
                        if(image.id === id) {
                            return newImg
                        }
                        else {
                            return image
                        }
                    }))       
                    setUploadStatus({status: "uploaded", percent: 100})
                });
            })
        })
    }

    const previewFile = (e: any) => {
        const reader  = new FileReader();

        const file = e.target.files[0];

        reader.onloadend = function () {
            setImages(images.map((image: any) => {
                if(image.id === id) {
                    return {id, name: file.name, url: reader.result, type: file.type, file}
                }
                else {
                    return image
                }
            }))    
        }
        
        if (file) {
            reader.readAsDataURL(file);
        } else {
            
        }
    }

    const deleteImg = () => {
        const desertRef = ref(storage, `files/${images[i].name}`);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // setImg({ id, name: "", type: "", url: "" })
            setImages(images.map((image: any) => {
                if(image.id === id) {
                    return { id, name: "", type: "", url: "" }
                }
                else {
                    return image
                }
            }))
            setUploadStatus({ status: "", percent: 0 })
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="flex flex-1">
                <div className="p-4 rounded">
                    <div className="relative min-h-[150px] w-[200px] rounded">
                        <img src={images[i].url} alt={images[i].name} className={`max-w-[200px] w-full rounded object-cover`} />
                        <div className="absolute top-0 left-0 rounded w-full h-full">
                            {
                                uploadStatus.status !== "not loaded" && uploadStatus.status !== "preview" && uploadStatus.status && uploadStatus.status !== "uploaded" ? 
                                    <div className="flex flex-col justify-center items-center bg-white/[0.8] dark:bg-black/[0.7] backdrop-blur-sm p-4 w-full h-full">
                                        <p className="mb-2">{uploadStatus?.status} : {uploadStatus?.percent}%</p>
                                        <p className="w-full min-h-[10px] rounded-lg bg-slate-200">
                                            <p className={`min-h-[10px] rounded-lg bg-green`} style={{ width: `${uploadStatus?.percent}%` }}></p>
                                        </p>
                                    </div>
                                :
                                ""
                            }
                        </div>
                    </div>
                    
                    <div className="text-[12px]">
                        <div className="flex items-center my-2 gap-2">
                            {
                                uploadStatus.status === "preview" ?
                                <>
                                    <button className="p-[2px] px-4 rounded border border-gray-500/[0.2]" onClick={uploadImg}>Upload</button>
                                    <button className="p-[2px] px-4 rounded border border-red-500/[0.6]" onClick={() => { setImages(images.filter((item: any) => item.id !== id)); setUploadStatus({status: "not loaded", percent: 0}); }}>Delete</button>
                                </>
                                : 
                                uploadStatus.status === "uploaded" || uploadStatus.status === "finished"?
                                    <button className="p-[2px] px-4 rounded border border-red-500/[0.6]" onClick={() => { setUploadStatus({status: "not loaded", percent: 0}); deleteImg() }}>Delete</button>
                                :
                                <label htmlFor={`file${id}`}>
                                    <span tabIndex={1} className="p-[10px] px-4 text-[10px] rounded border border-gray-500/[0.2] cursor-pointer">Choose image</span>
                                    <input className="bg-gray-50 dark:bg-gray-900 hidden" accept={accept} id={`file${id}`} type="file" onChange={(e) => { previewFile(e); setUploadStatus({status:"preview", percent: 0}) }} />
                                </label>
                            }
                        </div>
                    </div>
                    
                </div>
                
        </div>
    )
}

export default Upload;