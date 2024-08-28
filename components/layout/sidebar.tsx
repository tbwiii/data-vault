"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu } from "@components/layout/menu";
import fonts from "@util/fonts";
import BlurFade from "@components/magicui/blur-fade";

export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`
            bg-neutral-800
            bg-opacity-10
            relative
            z-10
            shrink-0
            ${sidebarOpen ? "w-64" : "w-16"}
            overflow-hidden
            transition-all
            `}
    >
      <div
        className={`flex
                flex-col
                justify-between
                h-screen
                fixed
                ${sidebarOpen ? "w-64" : "w-16"}`}
      >
        <div className={`${sidebarOpen ? "w-64" : "w-16"} w-full pt-4`}>
          <button
            className={`
              mx-auto
              bg-natural-700
              items-center
              gap-8
              text-azure-200
              py-4
              grid
              pointer-hover`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            type="button"
          >
            {sidebarOpen && (
              <>
                <BlurFade yOffset={-20}>
                  <Image
                    src="/data-vault-emblem.png"
                    alt="Data Valut Emblem"
                    width={150}
                    height={150}
                    className="transition-all m-auto mb-8"
                  />
                </BlurFade>
                <BlurFade>
                  <span className={`grow text-2xl ${fonts.cutive}`}>
                    {"Data Vault".toUpperCase()}
                  </span>
                </BlurFade>
              </>
            )}
            {!sidebarOpen && (
              <BlurFade yOffset={-6}>
                <Image
                  src="/data-vault-emblem.png"
                  alt="Data Valut Emblem"
                  width={40}
                  height={40}
                  className="transition-all m-auto mb-4"
                />
              </BlurFade>
            )}
          </button>
          <Menu sidebarOpen={sidebarOpen} />
        </div>
        <div className="pb-2 flex items-center">{children}</div>
      </div>
    </div>
  );
}
