
import Image from "next/image";
import skillsData from "@/data/skills.json";

export function About() {
    // async function getskills(){
    //     const url = "../data/skills.json"
    //     try{
    //         const reponse = await fetch(url);
    //         if (!reponse.ok) {
    //             throw new Error('Response status: ${response.status}');
            
    //         }
    //        const result = await reponse.json() 
    //        return result
    //     }
    //     catch(error){
    //         if (error instanceof Error) {
    //             console.log(error.message);
    //         } else {
    //             console.log(error);
    //         }
    //     }
    // }
    let skills = skillsData.skills
    return(
        <section>
            <div>
                <h3>About Me</h3>
                <Image src="https://placehold.co/600x400" alt="Image with Everest Wilkey a FullStack Devloper sitting in his living room"/>
                <h4>Hi my name is Everest a SoftWare Engineer From Boise Idaho</h4>
                <p>In my recent role at The Church of Jesus Christ of Latter-day Saints, I upgraded enterprise applications, built a user search and data validation tool, and architected and implemented the internationalization (i18n) package used across applications to support a global user base. I also helped build CI/CD pipelines to improve testing processes. I'm a self-starter who takes ownership of complex problems and delivers scalable solutions.</p>
                <button>Download my Resume</button>
            </div>
            <div>
                <h3>Skills</h3>
                
            </div>
            
        </section>
    )
    
}