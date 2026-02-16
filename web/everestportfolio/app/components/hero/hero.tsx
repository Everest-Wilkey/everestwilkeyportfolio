"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  // TODO: Refactor typewriter to use opacity-based approach for better SEO
  const fulltext = "Hello I'm";
  const fullname = " Everest Wilkey";

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [donetyping, setdoneTyping] = useState(false);
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
        setdoneTyping(true);
        clearInterval(timer);
      }
    }, 150);
  }, []);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center ">
      <div className="w-full max-w-5xl mx-auto px-8 text-center md:text-left
">
        <h1 className="md:text-6xl text-3xl text-black ">
          {title}<span className="text-blue-500">{name}<span className="blink bg-linear-45 from-fuchsia-700 to-purple-600 bg-clip-text text-transparent ">|</span></span>
        </h1>

        <p
          className={` md:text-6xl text-2xl bg-linear-45 from-fuchsia-700 to-purple-600 bg-clip-text text-transparent ${donetyping ? "opacity-100 slide-in" : "opacity-0"}`}
        >
         A Fullstack Developer
        </p>
      </div>
    </section>
  );
}
