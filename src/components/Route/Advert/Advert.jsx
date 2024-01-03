import React from "react";
import { Link } from "react-router-dom";
import { advertsData } from "../../../static/data";
import styles from "../../../styles/styles";

const Adverts = () => {
  return (
    <>
      <div className={`${styles.section} hidden sm:block container mx-auto`}>
        <div
          className={`branding my-2 flex justify-between w-full shadow-sm bg-[#d1d5db] pt-3 pb-3 pl-14 pr-14`}
        >
          {advertsData &&
            advertsData.map((i, index) => (
              <div className="flex items-center" key={index}>
                {i.icon}
                <div className="px-3">
                <Link to={i.url}>
                  <h4 className="font-bold text-xs md:text-base">{i.title}</h4>
                </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Adverts;
