import { useHandleClickOutside } from "../../hooks/useHandleClickOutside.ts";
import { LoaderCircle, X } from "lucide-react";
import { useRef, useState } from "react";
import * as React from "react";

interface ContactFormProps {
    subject?: string;
    message?: string;
    setMessage: (text: string) => void;
    isVisible: boolean;
    setIsVisible: () => void;
}

export function ContactForm({ subject, message, setMessage, isVisible, setIsVisible }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState("");

    const formRef = useRef<HTMLDivElement>(null);
    useHandleClickOutside(formRef, setIsVisible);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setResult("");
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        formData.append("access_key", import.meta.env.VITE_WEB3FORM_KEY as string);
        formData.append("subject", subject as string);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            setResult("✓ Thanks! Your message has been sent successfully.");
            setIsSubmitting(false);
            e.currentTarget.reset();
        } else {
            setResult("⚠️ An error occurred, please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`fixed z-50 h-[100dvh] w-full bg-black/75 ${isVisible ? "block" : "pointer-events-none hidden"}`}>
            <div
                ref={formRef}
                className="animate-fadeInUp absolute top-1/2 left-1/2 z-[1] flex w-[calc(100%-40px)] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 rounded-[16px] border border-zinc-400 bg-gradient-to-br from-white to-zinc-100 p-8 shadow-md md:gap-8"
            >
                <div className="flex w-full items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold md:text-xl">{subject}</h2>

                    <button className="-m-1 cursor-pointer p-1 hover:opacity-90" onClick={setIsVisible}>
                        <X className="size-8" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4">
                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="name" className="text-sm md:text-base">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            className="border-foreground-dim w-full rounded-md border px-3 py-2 text-sm placeholder-zinc-400 md:text-base"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="email" className="text-sm md:text-base">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="johndoe@example.com"
                            required
                            className="border-foreground-dim w-full rounded-md border px-3 py-2 text-sm placeholder-zinc-400 md:text-base"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="message" className="text-sm md:text-base">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="I'm interested in..."
                            value={message}
                            required
                            onChange={e => setMessage(e.target.value)}
                            className="border-foreground-dim min-h-32 w-full rounded-md border px-3 py-2 text-sm placeholder-zinc-400 md:text-base"
                        />
                    </div>

                    <div className="flex w-full flex-col items-center gap-4">
                        <button
                            type="submit"
                            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-2 transition-all duration-300 hover:shadow-lg disabled:opacity-85 md:gap-3 md:px-10 md:py-3"
                            disabled={isSubmitting}
                        >
                            <LoaderCircle
                                className={`size-5 stroke-white md:size-6 ${isSubmitting ? "animate-spin" : "hidden"}`}
                            />
                            <span className={`font-semibold text-white md:text-lg ${isSubmitting ? "animate-pulse" : ""}`}>
                                Send Message
                            </span>
                        </button>

                        {result && (
                            <span
                                className={`text-foreground-dim text-center text-sm font-semibold ${result.toLowerCase().includes("error") ? "text-red-400" : ""}`}
                            >
                                {result}
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
