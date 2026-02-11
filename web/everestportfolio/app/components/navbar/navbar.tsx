"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-transparent h-screen md:pl-30 md:pr-30">
      <div className="flex justify-between p-10">
        <Link href={"/"} className=" text-2xl"><span className="text-blue-500">&lt;</span>EW<span className="text-blue-500">/&gt;</span></Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <Image className="invert"
            src="/menu.svg"
            alt="Menu button"
            width={24}
            height={24}
          ></Image>
        </button>
        <ul className="hidden md:flex gap-10 text-lg" >
            <li>
                <Link href={"/projects"}>Projects</Link>
            </li>
            <li>
                <Link href={"/contact"}>Contact</Link>
            </li>
        </ul>
        <button className="text-lg bg-blue-500 rounded-3xl p-2 hidden md:block ">Lets Chat</button>
      </div>
        <ul className={`transition-transform duration-300 ease-in-out shadow-lg flex flex-col md:hidden justify-evenly p-4 gap-4 rounded-tl-lg rounded-bl-lg text-2xl bg-black/50 text-white items-end ml-auto w-2/4 h-1/3  ${menuOpen ? "translate-x-0" : "translate-x-full" }`} >
          <li className="self-center">
            <Link href={"/projects"} className="color">Projects</Link>
          </li>
          <li className="self-center">
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li className="self-center">
            <button className="text-lg bg-blue-500 rounded-3xl p-2">Lets Chat</button>
          </li>
        </ul>
    </nav>
  );
}
