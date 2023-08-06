// import { storage } from "../../firebase/storage";
import { useState } from "react";
import { handleUpload, storage } from "../../firebase/storage";
import { deleteObject, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/storage";

function Upload({ images, setImages, accept, id }: any) {
    const [status, setStatus] = useState("not loaded")
    const [uploadStatus, setUploadStatus] = useState({status: "", percent: 0})
    const [img, setImg] = useState<any>({id: "", name: "", type: "", url: "" })

    const uploadImg = () => {
        handleUpload(img.file)
        .then(result => {
            const uploadTask = uploadBytesResumable(result, img.file);
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
                    let newImg = { id, name: img.name, url, type: img.type}  
                    setImg(newImg) 
                    setImages(images.map((image: any) => {
                        if(image.id === id) {
                            return newImg
                        }
                        else {
                            return image
                        }
                    }))       
                    setStatus("uploaded")
                });
            })
        })
    }

    const previewFile = (e: any) => {
        const reader  = new FileReader();

        const file = e.target.files[0];

        reader.onloadend = function () {
            setImg({id, name: file.name, url: reader.result, type: file.type, file})
            
        }
        
        if (file) {
            reader.readAsDataURL(file);
        } else {
            
        }
    }

    const deleteImg = () => {
        const desertRef = ref(storage, `files/${img.name}`);
        // Delete the file
        deleteObject(desertRef).then(() => {
            setImg({ id, name: "", type: "", url: "" })
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
                <div className="p-4 rounded flex">
                    <div>
                        <img src={img.url} alt={img.name} className={`max-w-[200px] w-full rounded object-cover`} />
                    </div>
                    
                    <div className="px-4 text-[12px]">
                        <div className="flex items-center my-2 gap-2">
                            {
                                status === "preview" ?
                                    <div className="flex gap-2">
                                        {
                                            uploadStatus.status === "finished" ? "" :
                                            <div onClick={uploadImg}>
                                                <button className="p-[10px] px-6 rounded border border-gray-200/[0.2]">Upload</button>
                                            </div>
                                        }
                                        <button className="p-[10px] px-6 rounded border border-red-200/[0.2]" onClick={() => { setImg({id , name: "", url: "", type: ""}); setStatus("not loaded"); }}>Delete</button>
                                    </div>
                                : status === "uploaded" ?
                                    <div className="flex gap-2">
                                        <button className="p-[10px] px-6 rounded border border-red-200/[0.2]" onClick={() => { setStatus("not loaded"); deleteImg() }}>Delete</button>
                                    </div>
                                :
                                <label htmlFor={`file${id}`}>
                                    <span className="p-[10px] px-6 rounded border border-gray-200/[0.2]">Choose image</span>
                                    <input className="bg-gray-50 dark:bg-gray-900 hidden" accept={accept} id={`file${id}`} type="file" onChange={(e) => { previewFile(e); setStatus("preview") }} />
                                </label>
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="w-[30%] my-3 gap-2">
                {
                    uploadStatus.status && status !== "not loaded" ? 
                        <div className="m-4 w-[40%]">
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
    )
}

export default Upload;