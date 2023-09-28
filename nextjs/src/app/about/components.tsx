"use client";

import axios from "axios";

export function TestAbout() {
  const post = async () => {
    const data = await axios("http://localhost:5237/api/resource/publickey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Date: new Date().toUTCString(),
      },
    });
    console.log(data);
    // 打印 key 的值
    // fetch("http://localhost:5237/api/resource/publickey", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Date: new Date().toUTCString(),
    //   },
    //   mode: "no-cors",
    //   body: JSON.stringify({ name: "test" }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });
  };
  return (
    <div>
      <button onClick={post}>test</button>
    </div>
  );
}
