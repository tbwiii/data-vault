import { Russo_One, Squada_One } from "next/font/google";

const russo = Russo_One({ subsets: ["latin"], weight: ["400"] });
const squada = Squada_One({ subsets: ["latin"], weight: ["400"] });

export default {
    russo: russo.className,
    squada: squada.className,
};