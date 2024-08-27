"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import fonts from "@util/fonts";

import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  flipCards?: boolean;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function HyperText({
  text,
  duration = 800,
  flipCards = false,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!animateOnLoad && isFirstRender.current) {
          clearInterval(interval);
          isFirstRender.current = false;
          return;
        }
        if (interations.current < text.length) {
          setDisplayText((t) =>
            t.map((l, i) =>
              l === " "
                ? l
                : i <= interations.current
                  ? text[i]
                  : alphabets[getRandomInt(26)],
            ),
          );
          interations.current = interations.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 10),
    );
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <div
      className="overflow-hidden py-2 flex flex-wrap cursor-default scale-100"
      onMouseEnter={triggerAnimation}
    >
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.h1
            key={i}
            className={cn(
              "font-mono relative",
              letter === " " ? "w-3" : "",
              flipCards
                ? `
                ${fonts.cutive}
                text-5xl
                w-12
                font-bold
                text-azure-400
                text-center
                py-2
                mx-[2px]
                bg-gradient-to-br
                from-stone-800
                to-stone-900
                rounded`
                : "",
              className,
            )}
            {...framerProps}
          >
            <span
              className="absolute
            bg-stone-900
            w-full
            h-0.5
            shadow-md
            left-0
            top-1/2
            translate-y-[-50%]
            "
            ></span>
            <span className="relative z-10">{letter.toUpperCase()}</span>
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
