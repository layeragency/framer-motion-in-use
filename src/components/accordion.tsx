"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ChevronTop from "@/assets/chevron-top.svg";

type Props = {
  header: ReactNode;
  content: ReactNode;
  className?: string;
  initialOpen?: boolean;
};

export const AccordionItem = ({
  content,
  header,
  className,
  initialOpen = false,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(initialOpen);

  return (
    <>
      <div className={`py-5 bg-none px-0 ${className ?? ""}`}>
        <motion.div
          className="flex justify-between items-center gap-4 cursor-pointer bg-foreground text-background p-4 rounded-2xl backdrop-blur-sm"
          onClick={() => setExpanded(expanded ? false : true)}
        >
          <div>{header}</div>
          <div className={`transition-all duration-300 `}>
            <ChevronTop
              className={`transition-all duration-500 shrink-0 ${
                expanded ? "rotate-0" : "rotate-180"
              }`}
              width={24}
            />
          </div>
        </motion.div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.section
              className="overflow-hidden"
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto", marginTop: 16 },
                collapsed: { opacity: 0, height: 0, marginTop: 0 },
              }}
            >
              {content}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
export default AccordionItem;
