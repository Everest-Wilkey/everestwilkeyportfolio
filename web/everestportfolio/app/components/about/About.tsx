import Image from "next/image";
import skillsData from "@/data/skills.json";
import { Category, Skill } from "@/lib/types";
import CardIcon from "./cardicon";

export function About() {
  let skills = skillsData.skills;

  return (
    <section className="mx-auto py-8 w-full xl:max-w-[1400px] md:py-12">
      <div className=" grid grid-cols-1 gap-6 text-white md:grid-cols-2 md:gap-12 md:px-6 lg:gap-16 lg:px-12 items-stretch">
        <h3 className="col-span-full p-3 text-center text-4xl font-bold text-slate-100 mb-2 md:mb-4">
          Who am I?
        </h3>
        <div className="mx-4 flex items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 shadow-xl backdrop-blur-sm md:mx-0 lg:p-10">
          <div className="relative aspect-[5/3] w-full max-w-[300px] md:max-w-[500px]">
            <Image
              className="rounded-xl object-cover"
              src="https://placehold.co/500x300"
              alt="Everest Wilkey, FullStack Developer"
              fill
              unoptimized
            />
          </div>
        </div>
        <div className=" mx-4 flex flex-col justify-center rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 shadow-xl backdrop-blur-sm md:mx-0 md:p-10 lg:p-14">
          <h4 className="mb-4 text-2xl font-bold text-blue-400 md:text-3xl lg:mb-6 lg:text-4xl">
            I am Everest a Software Engineer from Boise
          </h4>
          <p className="mb-6 text-lg leading-relaxed text-slate-300 lg:mb-8 lg:text-xl">
            In my recent role at The Church of Jesus Christ of Latter-day
            Saints, I upgraded enterprise applications, built a user search and
            data validation tool, and architected and implemented the
            internationalization (i18n) package used across applications to
            support a global user base. I also helped build CI/CD pipelines to
            improve testing processes. I'm a self-starter who takes ownership of
            complex problems and delivers scalable solutions.
          </p>
          <div>
            <a
              href="/Everest Wilkey Resume.pdf"
              download
              className="w-full rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:bg-blue-500 md:w-auto md:px-10 md:py-4 md:text-xl inline-block text-center"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 lg:p-12">
        <h3 className="col-span-full p-3 text-center text-4xl font-bold text-slate-100 mb-2 md:mb-4">
          Technologies
        </h3>
        <ul className="grid grid-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((skill) => (
            <CardIcon key={skill.name} item={skill} />
          ))}
        </ul>
      </div>
    </section>
  );
}
