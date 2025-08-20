import AccordionItem from "@/components/accordion";
import Container from "@/components/container";
import Separator from "@/components/separator";
import Slider, { Slide } from "@/components/slider";

const content = (
  <div className="space-y-4 ml-4">
    <ul className="list-disc list-inside space-y-2">
      <li>
        Clickable header with a chevron icon that rotates to indicate
        expanded/collapsed state.
      </li>
      <li>
        Smooth open and close animations using Framer Motion`s AnimatePresence
        and motion components.
      </li>
      <li>
        Supports initial open state through the{" "}
        <code className="bg-foreground text-background px-1 rounded">
          initialOpen
        </code>{" "}
        prop.
      </li>
      <li>Fully customizable header and content via ReactNode props.</li>
      <li>
        Responsive to user interaction with animated height and opacity
        transitions.
      </li>
    </ul>
    <p>
      This makes AccordionItem a versatile and user-friendly UI element, perfect
      for organizing content in a clean, interactive way.
    </p>
  </div>
);
const slides: Slide[] = [
  {
    title: "Slide title",
    description: "Slide description",
    image: "/slide-1.jpg",
  },
  {
    title: "Slide title",
    description: "Slide description",
    image: "/slide-2.jpg",
  },
  {
    title: "Slide title",
    description: "Slide description",
    image: "/slide-3.jpg",
  },
];

const Home = () => {
  return (
    <Container>
      <h1 className="text-4xl font-bold mt-10">Welcome aboard!!</h1>
      <p className="mt-4 max-w-[720px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam ad quas
        asperiores repellat eaque voluptas ullam, voluptates ipsa iste modi et
        magni cum laboriosam facere tempora culpa! Eum, voluptatem vitae.
      </p>
      <Separator className="my-10" />
      <div>
        <h2 className="text-2xl font-medium mb-4">Accordion item</h2>
        <p className="text-foreground max-w-[720px]">
          AccordionItem is a collapsible panel component that toggles the
          visibility of its content when the header is clicked.
        </p>
        <AccordionItem
          header={<h2 className="text-2xl font-bold">Accordion item</h2>}
          content={content}
        />
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-medium mb-4">Simple slider</h2>
        <p className="text-foreground max-w-[720px] mb-6">
          The Slider component is a responsive image carousel built with Framer
          Motion and Next.js. It displays an image with a title and description,
          supports smooth transitions, and allows navigation via buttons or drag
          gestures.
        </p>
        <Slider slides={slides} />
      </div>
    </Container>
  );
};
export default Home;
