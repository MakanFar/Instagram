import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center flex-col items-center">
      <div className="text-center">
        <b className="text-xl mb-5">Sorry, this page isn't available.</b>
        <p>
          This page is available! Please try again.
          <Link to="/" className="text-blue-500">
            Go back to Instagram.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
