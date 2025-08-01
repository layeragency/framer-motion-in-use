type Props = {
  className?: string;
  id?: string;
  full?: boolean;
};

const Separator = ({ className, id, full }: Props) => {
  return (
    <>
      <div
        id={id}
        className={`${
          full ? "" : "container mx-auto mx-auto w-full max-w-[1700px]"
        } border-t-1 border-gray-200 ${className}`}
      ></div>
    </>
  );
};

export default Separator;
