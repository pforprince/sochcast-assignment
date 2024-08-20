import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

// common layout file
const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className="w-full h-16 items-center flex border-b bg-primary shadow-md">
        <div className="w-[90%] lg:w-[80%] flex items-center justify-between m-auto">
          <h1 className="text-2xl cursor-pointer">
            <Link to={"/"}>Sochcast</Link>
          </h1>
          <ul>
            <li className="cursor-pointer text-lg">Login</li>
          </ul>
        </div>
      </div>
      <div className="w-[90%] lg:w-[80%] py-10 m-auto h-full flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
