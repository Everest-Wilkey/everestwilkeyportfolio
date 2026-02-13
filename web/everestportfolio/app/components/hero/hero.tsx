"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  // TODO: Refactor typewriter to use opacity-based approach for better SEO
  const fulltext = "Hello I'm";
  const fullname = "Everest Wilkey";

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [donetyping, setdoneTyping]= useState(false);
  useEffect(() => {
    let index = 0;
    let count = 0;
    const timer = setInterval(() => {
      if (index <= fulltext.length) {
        setTitle(fulltext.substring(0, index));
        index++;
      } else if (count <= fullname.length) {
        setName(fullname.substring(0, count));
        count++;
      } else {
        setdoneTyping(true)
        clearInterval(timer);
      }
    }, 100);
  }, []);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="md:text-8xl text-3xl text-black">
        {title} <span className="text-blue-500">{name}</span>
      </h1>
      {donetyping && <p className=" slidein md:text-6xl ease-intext-2xl bg-linear-to-bl from-orange-500 to-yellow-300 bg-clip-text text-transparent">
        I'm a Fullstack Developer
      </p>}
    </section>
  );
}
