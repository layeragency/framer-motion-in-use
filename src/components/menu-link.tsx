import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { motion } from "motion/react";

type Props = {
  layoutId: string;
  href: Url;
  label: string;
  isActive: boolean;
  onClick?: () => void;
};

const MenuLink = ({ href, layoutId, isActive, label, onClick }: Props) => {
  return (
    <>
      <Link
        href={href}
        className={`relative block py-4 px-6 rounded-full font-bold transition duration-300 delay-100 ${
          isActive ? "text-foreground" : "text-background"
        }`}
        onClick={onClick}
      >
        {isActive && (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 w-full h-full bg-background rounded-full"
          />
        )}
        <div className="relative z-1">{label}</div>
      </Link>
    </>
  );
};

export default MenuLink;
