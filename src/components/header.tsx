"use client";
import Container from "@/components/container";
import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "@/assets/menu.svg";

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
  return (
    <>
      <Container>
        <header className="px-8 py-4 flex justify-between items-center w-full bg-foreground text-background mx-auto rounded-b-2xl">
          <div>Logo</div>
          <LayoutGroup id="underline">
            <nav className="flex gap-4 ">
              {headerData.map((link) => {
                return (
                  <Link
                    href={link.url}
                    key={link.id}
                    className={`block py-4 px-6 rounded-full font-bold relative transition-all duration-300 delay-100 ${
                      pathname === link.url
                        ? "text-foreground"
                        : "text-background"
                    }`}
                  >
                    {pathname === link.url && (
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
        </header>
      </Container>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.x > 100) {
            console.log("close");
          } else if (info.offset.x < -100) {
            console.log("open");
          }
        }}
        className="z-1 fixed bottom-12 -right-[900px] bg-foreground text-background w-[1000px] h-11 rounded-l-lg p-2 cursor-grab active:cursor-grabbing"
      >
        <Menu width={24} />
      </motion.div>
    </>
  );
};

export default Header;
