"use client";

import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "@/assets/menu.svg";
import FramerLogo from "@/assets/framer-logo.svg";
import Container from "@/components/container";
import useDisableScroll from "@/utils/use-disable-scroll";
import ArrowRight from "@/assets/arrow-right.svg";

const headerData = [
  {
    id: 1,
    label: "Home",
    url: "/",
  },
  {
    id: 2,
    label: "About",
    url: "/about",
  },
  {
    id: 3,
    label: "Contact",
    url: "/contact",
  },
];

const Header = () => {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef);
  const [isOpen, setIsOpen] = useState(false);
  useDisableScroll(isOpen);

  return (
    <>
      <Container>
        <header
          ref={headerRef}
          className="px-8 py-4 flex justify-between items-center w-full bg-foreground text-background mx-auto rounded-b-2xl"
        >
          <div>
            <FramerLogo width={32} />
          </div>
          <LayoutGroup id="underline">
            <nav className="gap-4 hidden md:flex">
              {headerData.map((link) => {
                const isActive = pathname === link.url;
                return (
                  <Link
                    href={link.url}
                    key={link.id}
                    className={`block py-4 px-6 rounded-full font-bold relative transition-all duration-300 delay-100 ${
                      isActive ? "text-foreground" : "text-background"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute block w-full h-full bg-background top-0 left-0 right-0 bottom-0 rounded-full"
                        layoutId="underline"
                        style={{ originY: "0px" }}
                      />
                    )}
                    <div className="relative z-1">{link.label}</div>
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>
          <div
            className="flex md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu width={24} />
          </div>
        </header>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: "-16px" }}
            exit={{ x: "100%" }}
            className="fixed bottom-28 right-0 z-20 w-64 shadow-lg overflow-hidden"
          >
            <div className="relative bg-foreground text-background p-4 rounded-xl w-full">
              {headerData.map((link) => {
                const isActive = pathname === link.url;
                return (
                  <Link
                    href={link.url}
                    key={link.id}
                    className={`block py-4 px-6 rounded-full font-bold relative transition-all duration-300 delay-100 ${
                      isActive ? "text-foreground" : "text-background"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute block w-full h-full bg-background top-0 left-0 right-0 bottom-0 rounded-full"
                      />
                    )}
                    <div className="relative z-1">{link.label}</div>
                  </Link>
                );
              })}
              <div className="absolute bg-foreground -left-10 bottom-10">
                <ArrowRight width={24} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        initial={{ x: 300, opacity: 0 }}
        animate={{
          x: isHeaderInView ? 300 : 0,
          opacity: isHeaderInView ? 0 : 1,
          pointerEvents: isHeaderInView ? "none" : "auto",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onDragEnd={(e, info) => {
          if (info.offset.x > 20) {
            setIsOpen(false);
          } else if (info.offset.x < -20) {
            console.log("open");
            setIsOpen(true);
          }
        }}
        className="z-10 fixed bottom-12 -right-[900px] bg-foreground text-background w-[1000px] h-11 rounded-l-lg p-2 cursor-grab active:cursor-grabbing"
      >
        <Menu width={24} />
      </motion.div>
    </>
  );
};

export default Header;
