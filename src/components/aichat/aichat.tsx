import axios from "axios";
import { useEffect } from "react";

const AIChat = () => {
//   const [data, setData] = useState<any>([]);
//   const [input, setInput] = useState('');

  useEffect(() => {
        axios.get(import.meta.env.VITE_OPENEI_URL + "topic:solar", { headers: { "API_KEY" : import.meta.env.VITE_OPENEI_KEY, "Access-Control-Allow-Origin": true } })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
  }, [])

  return (
    <div>
      
    </div>
  );
};

export default AIChat;