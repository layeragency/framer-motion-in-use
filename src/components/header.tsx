"use client";

import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "@/assets/menu.svg";
import FramerLogo from "@/assets/framer-logo.svg";
import Container from "@/components/container";
import useDisableScroll from "@/utils/use-disable-scroll";
import MenuLink from "@/components/menu-link";

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
          <LayoutGroup id="active-bubble">
            <nav className="gap-4 hidden md:flex">
              {headerData.map((link) => {
                const isActive = pathname === link.url;
                return (
                  <MenuLink
                    key={link.id}
                    href={link.url}
                    isActive={isActive}
                    label={link.label}
                    layoutId="active-bubble"
                  />
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="z-11 fixed bg-black/10 inset-0"
            ></motion.div>
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: "-16px" }}
              exit={{ x: "100%" }}
              className={`fixed right-0 w-[calc(100%-32px)] z-20 shadow-lg overflow-hidden
              ${isHeaderInView ? "top-18" : "top-4"}
              `}
            >
              <div className="relative bg-foreground text-background p-4 rounded-xl w-full">
                {headerData.map((link) => {
                  const isActive = pathname === link.url;
                  return (
                    <MenuLink
                      key={link.id}
                      href={link.url}
                      isActive={isActive}
                      label={link.label}
                      layoutId=""
                      onClick={() => setIsOpen(false)}
                    />
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHeaderInView ? 0 : 1,
          opacity: isHeaderInView ? 0 : 1,
          pointerEvents: isHeaderInView ? "none" : "auto",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onDragEnd={(e, info) => {
          if (info.offset.x > 20) {
            setIsOpen(false);
          } else if (info.offset.x < -20) {
            setIsOpen(true);
          }
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="z-11 fixed bottom-12 right-4 w-11 h-11 p-2 flex items-center justify-center bg-foreground text-background rounded-full cursor-grab active:cursor-grabbing"
      >
        <Menu width={24} />
      </motion.div>
    </>
  );
};

export default Header;
