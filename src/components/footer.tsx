import Container from "@/components/container";
import Link from "next/link";
import LayerIcon from "@/assets/layer.svg";
import { ThemeToggle } from "@/components/toggle checkbox";

const Footer = () => {
  return (
    <Container>
      <footer className="mt-20 px-8 py-4 w-full bg-foreground text-background mx-auto rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>Powered by</div>
          <Link href={"https://layer.agency/"} target="_blank" className="flex">
            <LayerIcon className="inline-block" width={50} />
          </Link>
        </div>
        <ThemeToggle />
      </footer>
    </Container>
  );
};
export default Footer;
