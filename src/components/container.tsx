import { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "className">;

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={`container mx-auto max-w-[1440px] px-4 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
};
export default Container;
