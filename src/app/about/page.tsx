import Container from "@/components/container";
import Info from "@/assets/info.svg";
import CursorSection from "@/components/cursor-section";

const AboutPage = () => {
  return (
    <Container>
      <CursorSection>
        <div className="p-20">
          <Info className="w-full max-w-[400px] mx-auto mb-10" />
          <div className="text-center text-4xl">About page</div>
        </div>
      </CursorSection>
    </Container>
  );
};
export default AboutPage;
