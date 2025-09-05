import { Link } from "react-router-dom"
import { ContactLink } from "@/components/single-page-developer-portfolio/Link"
import { technology } from '@/components/single-page-developer-portfolio/data'
import { project } from '@/components/single-page-developer-portfolio/data'
import { TechnologyList } from "@/components/single-page-developer-portfolio/TechnologyList"


export const LayoutPage = () => {
    return (
        <>
            <div className="bg-[#151515] min-h-screen text-[#FFF] font-SpaceGrotesk md:p-4 lg:p-40 lg:pt-[4.69rem]">
                <header className="flex flex-col gap-[1.25rem] items-center pt-[1.25rem] px-[7rem]">
                    <span>Hades</span>
                    <ul className="flex justify-between gap-8">
                        <li>
                            <Link to={'/character-counter'}>
                                <img src="/single-page-developer-portfolio/github.svg" alt="github" />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/character-counter'}>
                                <img src="/single-page-developer-portfolio/twitter.svg" alt="github" />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/character-counter'}>
                                <img src="/single-page-developer-portfolio/LinkedIn.svg" alt="github" />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/character-counter'}>
                                <img src="/single-page-developer-portfolio/fuck.svg" alt="github" />
                            </Link>
                        </li>
                    </ul>
                </header>
                <main className="px-4">
                    {/* title  */}
                    <div className="text-center flex flex-col gap-6">
                        <div className="text-center text-[2.5rem] font-[700]">
                            <h1>Nice to meet you!</h1>
                            <h1>I’m{" "}
                                <span className="inline-block"> Hades
                                    <div className="h-[0.25rem] bg-[#4EE1A0]"></div>
                                </span>
                                <span>.</span>
                            </h1>
                        </div>
                        <p className="text-[#D9D9D9] font-[500]">I’m a front-end developer passionate about building accessible web apps that users love. I always try my best to improve coding skills.</p>
                        <div>
                            <ContactLink>CONTACT ME</ContactLink>
                        </div>
                    </div>

                    <hr className="mt-[5rem] mb-[2.5rem]" />
                    {/* technology */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {technology.map(item => {
                            return (
                                <div key={item.label + item.year} className="text-center">
                                    <h2 className="text-[2rem] font-[700]">{item.label}</h2>
                                    <p className="text-[#D9D9D9] font-[500]">{item.year} Years Experience</p>
                                </div>
                            )
                        })}
                    </div>

                    <hr className="mb-[5rem] mt-[2.5rem]" />

                    {/* project  */}
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-[2.5rem] font-[700]">Projects</h1>
                        <ContactLink>CONTACT ME</ContactLink>
                    </div>
                    {/* project list  */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        {project.map((item, index) => {
                            return (
                                <div key={item.link + index} className="flex flex-col gap-[1.25rem]">
                                    <div
                                        className="w-full aspect-[7/5] overflow-hidden rounded-lg border-2 border-gray-400 relative hover:cursor-pointer">
                                        <img
                                            src={item.background}
                                            alt="background"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-[#000] bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                                            <ContactLink link={item.link}>VIEW PROJECT</ContactLink>
                                            <ContactLink link={item.code}>VIEW CODE</ContactLink>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-[1.5rem] font-[700] overflow-hidden">{item.title}</div>
                                        <TechnologyList technologies={item.technology} maxVisible={3} />
                                    </div>

                                    <div className="flex gap-4 lg:hidden">
                                        <ContactLink link={item.link}>VIEW PROJECT</ContactLink>
                                        <ContactLink link={item.code}>VIEW CODE</ContactLink>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* contact  */}
                    <div>
                        <h2>Contact</h2>
                        <p>I would love to hear about your project and how I could help. Please fill in the form, and I’ll get back to you as soon as possible.</p>
                    </div>
                </main>
                <footer>
                    <span>Hades</span>
                    <ul>
                        <li><img src="/single-page-developer-portfolio/github.svg" alt="github" /></li>
                        <li><img src="/single-page-developer-portfolio/LinkedIn.svg" alt="github" /></li>
                        <li><img src="/single-page-developer-portfolio/twitter.svg" alt="github" /></li>
                        <li><img src="/single-page-developer-portfolio/fuck.svg" alt="github" /></li>
                    </ul>
                </footer>
            </div>
        </>
    )
}