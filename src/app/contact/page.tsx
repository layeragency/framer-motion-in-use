import Container from "@/components/container";
import CursorSection from "@/components/cursor-section";
import Contact from "@/assets/contact.svg";

const ContactPage = () => {
  return (
    <>
      <Container>
        <CursorSection>
          <div className="p-20">
            <Contact className="w-full max-w-[400px] mx-auto mb-10" />
            <div className="text-center text-4xl">Contact page</div>
          </div>
        </CursorSection>
      </Container>
    </>
  );
};
export default ContactPage;
