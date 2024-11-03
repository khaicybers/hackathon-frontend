import { useState } from "react";

function useOpenAI() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (content) => {
    setIsLoading(true);
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_CHATGPT_APIKEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Tìm hiểu về ${content}, trả lời dưới 20 từ`,
          },
        ],
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setData(data.choices[0].message.content);
        setIsLoading(false);
      });
  };

  return { data, isLoading, handleRequest };
}

export default useOpenAI;
