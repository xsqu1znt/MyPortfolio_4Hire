import * as React from "react";
import { useState } from "react";
import { Pause } from "lucide-react";

interface ImageSlideProps {
    imageSources: string[];
    imageAlts: string[];
    interval?: number;
}

export function ImageSlide({
    imageSources,
    imageAlts,
    interval = 3000,
    ...props
}: React.ComponentProps<"div"> & ImageSlideProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    React.useEffect(() => {
        if (imageSources.length <= 1 || isPaused) return;

        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % imageSources.length);
                setIsTransitioning(false);
            }, 750);
        }, interval);
        return () => clearInterval(timer);
    }, [imageSources, interval, isPaused]);

    if (imageSources.length === 0) return null;

    const nextIndex = (currentIndex + 1) % imageSources.length;

    return (
        <div
            {...props}
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "inherit" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Next Image (fades in during transition) */}
            {isTransitioning && imageSources.length > 1 && (
                <img
                    key={`img-${nextIndex}`}
                    src={imageSources[nextIndex]}
                    alt={imageAlts[nextIndex] || `Slide ${nextIndex + 1}`}
                    className="absolute inset-0 h-full w-full object-cover object-top opacity-100 transition-all duration-750 group-hover:object-bottom"
                />
            )}

            {/* Current Image */}
            <img
                key={`img-${currentIndex}`}
                src={imageSources[currentIndex]}
                alt={imageAlts[currentIndex] || `Slide ${currentIndex + 1}`}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-750 group-hover:object-bottom ${
                    isTransitioning ? "-translate-x-4 opacity-0" : "translate-x-0 opacity-100"
                }`}
            />

            <Pause
                size={32}
                className={`absolute top-4 right-4 fill-white stroke-black/50 stroke-1 ${isPaused && imageSources.length > 1 && !imageSources[currentIndex].endsWith(".gif") ? "opacity-75" : "opacity-0"} transition-opacity duration-300`}
            />
        </div>
    );
}
