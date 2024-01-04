import { useState } from "react";

const AIChat = () => {
  const [data, setData] = useState<any>([]);
//   const [input, setInput] = useState('');

  const getData = () => {
    fetch(`http://api.brainshop.ai/get?bid=179815&key=TNAXJ9TeAaCCmW0V&uid=abel15655@gmail.com&msg=Hello`, {
      mode: "no-cors"
    })
    .then(res => res)
    .then(data => {
      setData(data)
      console.log(data);
    })
    .catch(error => {
      console.error(error);
      console.log(data)
    });
  }

  return (
    <div>
      <button onClick={() => getData()}>get response</button>
    </div>
  );
};

export default AIChat;