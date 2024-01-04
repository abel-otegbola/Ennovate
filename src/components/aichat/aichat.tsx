import { useEffect } from "react";

const AIChat = () => {
//   const [data, setData] = useState<any>([]);
//   const [input, setInput] = useState('');

  useEffect(() => {
    fetch(`https://api.brainshop.ai/get?bid=179815&key=TNAXJ9TeAaCCmW0V&uid=15655&msg=Hello`)
    .then(response => {
      const aiResponse = response;
      console.log(aiResponse);
    })
    .catch(error => {
      console.error(error);
    });
  }, [])

  return (
    <div>
      
    </div>
  );
};

export default AIChat;