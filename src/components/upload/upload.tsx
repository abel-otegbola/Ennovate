// import { storage } from "../../firebase/storage";
import { useEffect, useState } from "react";
import { handleUpload } from "../../firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Upload({ img, setImg, accept, id }: any) {
    const [show, setShow] = useState(false)
    const [uploadStatus, setUploadStatus] = useState({status: "", percent: 0})

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
                    setImg({ name: img.name, url, type: img.type })
                });
            }
            )
        })
    }

    const previewFile = (e: any) => {
        const reader  = new FileReader();

        const file = e.target.files[0];
      
        reader.onloadend = function () {
          setImg({name: file.name, url: reader.result, type: file.type, file});
        }
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
          
        }
        console.log(file.name, file.type, reader.result)
    }

    useEffect(() => {
        console.log(img)
    }, [img])

    // const deleteImg = (img: any) => {
    //     const desertRef = ref(storage, `files/${img}`);
    //     // Delete the file
    //     deleteObject(desertRef).then(() => {
    //         setImg({ name: "", type: "", url: "" })
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     });
    // }

    return (
        <div className="py-[3%]">
            <div className="">
                <div className="p-4 rounded flex">
                    <div>
                        {
                            show ? 
                            <>
                            {
                                img?.type.indexOf("image") !== -1 ?
                                <img src={img?.url} alt={""} className={`md:max-w-[200px] w-full rounded object-cover`} />
                                : 
                                <video width="300" height="200" controls>
                                    <source src={img?.url} type="video/mp4" />
                                    <source src={img?.url} type="video/ogg" />
                                </video>
                            }
                               
                            </> : ""
                        }
                    </div>
                    
                    <div className="px-4">
                        <div className="flex items-center my-2 gap-2">
                            <label htmlFor={`file${id}`}>
                                <span className="p-[10px] px-6 rounded border border-gray-200/[0.2]">Browse</span>
                                <input className="bg-gray-50 dark:bg-gray-900 hidden" accept={accept} id={`file${id}`} type="file" onChange={(e) => { previewFile(e); setShow(true) }} />
                            </label>
                            {
                                show ?
                                    <div className="flex gap-2">
                                        <div onClick={uploadImg}>
                                            <button className="p-[10px] px-6 rounded border border-gray-200/[0.2]">Upload</button>
                                        </div>
                                        <button className="p-[10px] px-6 rounded border border-red-200/[0.2]" onClick={() => { setImg({ name: "", url: "", type: ""}) }}>Delete</button>
                                    </div>
                                : ""
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="flex justify-center my-3 gap-2">
                </div>
                {
                    uploadStatus.status ? 
                        <div className="m-4">
                            <p className="text-[12px] mb-2">{uploadStatus?.status} : {uploadStatus?.percent}%</p>
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