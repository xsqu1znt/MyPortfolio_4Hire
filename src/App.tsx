import { ContactForm } from "./components/forms/ContactForm.tsx";
import { ImageSlide } from "./components/ui/ImageSlide.tsx";
import { useOrientation } from "./hooks/useOrientation.ts";
import { useUserClient } from "./hooks/useUserClient.ts";
import { useState } from "react";

function App() {
    const { isLandscape } = useOrientation();
    const { isMobile } = useUserClient();

    const [contactFormVisible, setContactFormVisible] = useState(false);
    const [contactFormSubject, setContactFormSubject] = useState("");
    const [contactFormMessage, setContactFormMessage] = useState("");

    const handleToggleContactForm = (subject: string, message: string) => {
        setContactFormSubject(subject);
        setContactFormMessage(message);
        setContactFormVisible(true);
    };

    return (
        <div className="bg-noise relative flex min-h-screen w-full min-w-80 flex-col items-center overflow-x-hidden">
            <ContactForm
                subject={contactFormSubject}
                message={contactFormMessage}
                setMessage={setContactFormMessage}
                isVisible={contactFormVisible}
                setIsVisible={() => setContactFormVisible(false)}
            />

            {/* Hero */}
            <section id="hero" className={`flex h-full w-full flex-col ${!isMobile ? "md:mt-6" : ""}`}>
                {/* Hero content wrapper */}
                <div
                    className={`${isLandscape && isMobile ? "min-h-[65vh]" : "h-[65vh]"} w-full max-w-[1280px] self-center p-8`}
                >
                    {/* Hero content wrapper (colored) */}
                    <div className="conic-rainbow relative h-full w-full rounded-[18px] p-[2px]">
                        {/* Hero content (filled) */}
                        <div className="bg-background flex h-full w-full flex-col items-center justify-center gap-8 rounded-[16px] p-10">
                            <div className="flex flex-col items-center gap-4">
                                <h1 className="text-4xl font-semibold md:text-6xl">Hi, I'm Gunique G.</h1>
                                <p className="text-foreground-dim md:text-lg">
                                    A professional developer and designer from the USA
                                </p>
                            </div>

                            {/* Contact button */}
                            <button
                                className="w-fit cursor-pointer rounded-lg border border-zinc-200 bg-white px-10 py-3 text-lg font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg"
                                onClick={() =>
                                    handleToggleContactForm(
                                        "Custom Work Inquiry",
                                        "Hi, I'm interested in [your brilliant idea].\n\n[Please provide relevant details, your budget, and your expected timeline]"
                                    )
                                }
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Work */}
            <section id="work" className="flex w-full flex-col items-center gap-12 px-10 py-18">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-4xl font-semibold">Top Work</h2>
                    <p className="text-foreground-dim md:text-lg">I have 5+ years of experience in web development</p>
                </div>

                {/* Project card wrapper */}
                <div className="flex w-full grid-cols-2 flex-col items-center gap-8 md:grid md:items-start lg:grid-cols-3">
                    {[
                        {
                            title: "Milestone Logistics (Landing Page)",
                            description:
                                "Landing page design for e-commerce logistics provider. Featured service cards, testimonial sections, and brand partner showcase.",
                            imageSources: ["logistics-1.png", "logistics-2.png", "logistics-3.png", "logistics-4.png"],
                            imageAlts: ["Logistics 1", "Logistics 2", "Logistics 3", "Logistics 4"],
                            links: {
                                preview: "/logistics-full.png"
                            }
                        },
                        {
                            title: "Trustee (Discord Bot Dashboard)",
                            description:
                                "Discord moderation bot and dashboard with multi-guild sync capabilities. Built with Next.js, MongoDB, TailwindCSS, and Discord.js.",
                            imageSources: ["trustee-1.gif"],
                            imageAlts: ["Trustee 1"],
                            links: {
                                preview: "/trustee-1.gif"
                            }
                        },
                        {
                            title: "Adverb (Ad Copy Optimizer)",
                            description:
                                "AI-powered SMS & ad copy optimizer that enhances tone, clarity, and engagement using GPT. Built with Next.js, Supabase, and OpenAI API.",
                            imageSources: ["adverbgg-1.png", "adverbgg-2.png"],
                            imageAlts: ["Adverb 1", "Adverb 2"],
                            links: {
                                demo: "https://adverbgg.vercel.app",
                                github: "https://github.com/xsqu1znt/adverb.tsx",
                                preview: "/adverbgg-1.png"
                            }
                        }
                    ].map(project => (
                        /* Project card */
                        <div
                            key={project.title}
                            className="group flex h-full max-w-[500px] flex-col overflow-hidden rounded-2xl border border-zinc-400 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                        >
                            {/* Project preview */}
                            <div className="h-32 w-full rounded-t-2xl md:h-64">
                                <ImageSlide imageSources={project.imageSources} imageAlts={project.imageAlts} />
                            </div>

                            {/* Project content wrapper */}
                            <div className="flex h-full w-full flex-col items-center bg-gradient-to-br from-white to-zinc-100 md:items-start">
                                {/* Project content */}
                                <div className="relative flex flex-1 flex-col items-center gap-6 p-8 md:items-start md:gap-8">
                                    {/* Project header */}
                                    <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
                                        <h3 className="text-lg font-semibold md:text-xl">{project.title}</h3>
                                        <p className="text-foreground-dim text-sm leading-relaxed tracking-wide md:text-base">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Project links */}
                                {project.links && (
                                    <div className="mt-auto flex gap-2 p-8">
                                        {[
                                            project.links.demo && { href: project.links.demo, label: "Website" },
                                            project.links.github && { href: project.links.github, label: "Github" },
                                            project.links.preview && { href: project.links.preview, label: "Look closer" }
                                        ]
                                            .filter((link): link is { href: string; label: string } => Boolean(link))
                                            .map((link, index, array) => (
                                                <span
                                                    key={link.label}
                                                    className="flex gap-2 text-sm text-nowrap md:text-base"
                                                >
                                                    <a
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="-mx-4 px-4 font-semibold hover:underline"
                                                    >
                                                        {link.label}
                                                    </a>
                                                    {index < array.length - 1 && <span className="font-normal">-</span>}
                                                </span>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section id="services" className="flex w-full flex-col items-center gap-12 bg-zinc-100 px-10 py-18">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-4xl font-semibold">Services I Offer</h2>
                    <p className="text-foreground-dim md:text-lg">
                        I work with React, Next.js, MongoDB, SQL, Discord.js, Figma, and more
                    </p>
                </div>

                {/* Service card wrapper */}
                <div className="flex w-full grid-cols-2 flex-col items-center gap-8 md:grid lg:grid-cols-3">
                    {[
                        {
                            title: "⚡ Quick Fixes",
                            description:
                                "Fast solutions for bugs, updates, and improvements. Quick turnaround when you need it most.",
                            expectedDelivery: "1-2 day",
                            price: 75,
                            subject: "⚡ Quick Fix Inquiry",
                            message:
                                "Hi, I have a problem for you to solve.\n\n[Please provide relevant details, your budget, and your expected timeline]"
                        },
                        {
                            title: "🚀 Landing Page",
                            description:
                                "High-converting single page designed to capture leads and drive sales. Mobile-responsive and SEO-optimized.",
                            expectedDelivery: "1-3 day",
                            price: 250,
                            subject: "🚀 Landing Page Inquiry",
                            message:
                                "Hi, I'm interested in a landing page.\n\n[Please provide relevant details, your budget, and your expected timeline]"
                        },
                        {
                            title: "🤖 Custom Discord Bot",
                            description:
                                "Full-featured Discord bot with custom features, moderation tools, and server integrations written in Typescript. Comes ready to host.",
                            expectedDelivery: "5-10 day",
                            price: 250,
                            subject: "🤖 Custom Discord Bot Inquiry",
                            message:
                                "Hi, I'm interested in a discord bot.\n\n[Please provide relevant details, your budget, and your expected timeline]"
                        },
                        {
                            title: "🌐 Custom Website",
                            description:
                                "Full-featured, multi-page websites built from scratch. Tailored to your brand and built to scale with your business.",
                            expectedDelivery: "7-14 day",
                            price: 800,
                            subject: "🌐 Custom Website Inquiry",
                            message:
                                "Hi, I'm interested in a custom website.\n\n[Please provide relevant details, your budget, and your expected timeline]"
                        },
                        {
                            title: "🎨 UI/UX Design",
                            description:
                                "Polished interfaces designed with your users in mind. Figma files ready to impress and convert.",
                            expectedDelivery: "3-5 day",
                            price: 300,
                            subject: "🎨 UI/UX Design Inquiry",
                            message:
                                "Hi, I'm interested in your UI/UX design service.\n\n[Please provide relevant details, your budget, and your expected timeline]"
                        },
                        {
                            title: "🔌 API Integration",
                            description:
                                "Connect your website to third-party services: payment processors, CRMs, email marketing, or custom APIs.",
                            expectedDelivery: "3-5 day",
                            price: 100,
                            subject: "🔌 API Integration Inquiry",
                            message:
                                "Hi, I'm interested in your API integration service.\n\n[Please provide relevant details, your budget, and your expected timeline]"
                        }
                    ].map(service => (
                        /* Service card */
                        <div
                            key={service.title}
                            className="flex h-full w-full flex-col items-center gap-6 rounded-2xl border border-zinc-400 bg-gradient-to-br from-white to-zinc-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg md:items-start md:gap-8"
                        >
                            {/* Service header */}
                            <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                                <h3 className="text-lg font-semibold md:text-xl">{service.title}</h3>
                                <p className="text-foreground-dim text-sm leading-relaxed tracking-wide md:text-base">
                                    {service.description}
                                </p>
                            </div>

                            {/* Service info */}
                            <div className="flex flex-1 flex-col items-center gap-2 md:flex-row md:gap-4">
                                <span className="text-xl font-semibold md:text-2xl">${service.price}+</span>
                                <span className="text-foreground-dim text-sm md:text-base">
                                    {service.expectedDelivery} delivery
                                </span>
                            </div>

                            {/* Service contact */}
                            <button
                                className="mt-auto w-fit cursor-pointer rounded-lg bg-zinc-900 px-6 py-2 font-semibold text-white transition-all duration-300 hover:shadow-lg md:px-10 md:py-3 md:text-lg"
                                onClick={() => handleToggleContactForm(service.subject, service.message)}
                            >
                                Contact Me
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section
                id="contact"
                className="flex w-full flex-col items-center gap-12 bg-gradient-to-br from-[#667de9] to-[#764ca3] px-10 py-18"
            >
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-4xl font-semibold text-white">Ready to work together?</h2>
                    <p className="text-lg text-white opacity-75">
                        Let's discuss your project and how I can help bring your vision to life
                    </p>
                </div>

                {/* Contacts */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        className="w-fit cursor-pointer rounded-lg bg-white px-6 py-2 font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-lg md:px-10 md:py-3 md:text-lg"
                        onClick={() =>
                            handleToggleContactForm(
                                "Custom Work Inquiry",
                                "Hi, I'm interested in [your brilliant idea].\n\n[Please provide relevant details, your budget, and your expected timeline]"
                            )
                        }
                    >
                        Contact Me
                    </button>

                    {/* Social buttons */}
                    <div className="flex flex-wrap items-center">
                        {[
                            {
                                iconSource: "/linkedin.svg",
                                link: "https://www.linkedin.com/in/guniqueg/"
                            },
                            { iconSource: "/fiverr.svg", link: "https://www.fiverr.com/s/5rL39pz" },
                            { iconSource: "/github.svg", link: "https://github.com/xsqu1znt" }
                        ].map(social => (
                            <a
                                key={social.link}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-fit cursor-pointer rounded-lg border border-transparent p-2 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:bg-zinc-100/10 hover:shadow-lg"
                            >
                                <img
                                    src={social.iconSource}
                                    alt="Social"
                                    className={social.iconSource === "/linkedin.svg" ? "size-10" : "size-8"}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="flex w-full items-center justify-center bg-zinc-900 px-10 py-8 text-center text-sm md:text-base">
                <p className="text-zinc-300">© {new Date().getFullYear()} Gunique G. Available for freelance work.</p>
            </footer>
        </div>
    );
}

export default App;
