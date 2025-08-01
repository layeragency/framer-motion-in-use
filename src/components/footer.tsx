import Container from "@/components/container";
import Link from "next/link";
import LayerIcon from "@/assets/layer.svg";

const Footer = () => {
  return (
    <Container>
      <footer className="mt-20 px-8 py-4 w-full bg-foreground text-background mx-auto rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div>Powered by</div>
          <Link href={"https://layer.agency/"} target="_blank" className="flex">
            <LayerIcon className="inline-block" width={50} />
          </Link>
        </div>
      </footer>
    </Container>
  );
};
export default Footer;
