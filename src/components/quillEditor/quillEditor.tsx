import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface content {
    procedures: string,
    setProcedures: any
}

const ContentEditor = ({ procedures, setProcedures }: content) => {
    const modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      }
      
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]
      

    return (
        <ReactQuill
            theme={"snow"}
            value={procedures}
            modules={modules}
            formats={formats}
            placeholder={"Write procedures here"}
            onChange={(html) => setProcedures(html)}
        />
    )
}

export default ContentEditor;