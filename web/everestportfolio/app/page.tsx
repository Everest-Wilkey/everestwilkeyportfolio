

import { About } from "./components/about/About";
import Hero from "./components/hero/hero";

export default function Home() {
  return(
    <>
    <section className="grid-background min-h-screen flex flex-col  justify-center">
      <Hero></Hero>
    </section>
    <section className="bg-black pt-5 ">
      <About></About>
    </section>
    </>
  )
}