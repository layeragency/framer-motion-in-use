"use client";
import FrozenRoute from "@/components/frozen-route";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageTransition = ({ children }: Props) => {
  const pathName = usePathname();
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${pathName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default PageTransition;
