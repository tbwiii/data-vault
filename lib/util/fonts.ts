import { Cutive_Mono } from "next/font/google";

const cutive = Cutive_Mono({ subsets: ["latin"], weight: ["400"] });

export default {
  cutive: cutive.className,
};
