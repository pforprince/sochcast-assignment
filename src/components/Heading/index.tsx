import { FC } from "react";

type HeadingProps = {
  title: string;
};

// common heading component
const Heading: FC<HeadingProps> = ({ title }) => {
  return (
    <div className="flex my-4 items-center gap-4">
      <p className="text-2xl lg:text-3xl">{title}</p>
      <div className="bg-primary w-full h-[3px]"></div>
    </div>
  );
};

export default Heading;
