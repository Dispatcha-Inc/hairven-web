import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  

  return (
    <>
      <div className={`${styles.section} container mx-auto`}>
        <div className="flex flex-col bg-gradient-to-t from-[#F875AA] to-[#FFDFDF] mb-12 border-0 pt-6 px-6">
          <div className={`${styles.heading} flex justify-between !important text-white`}>
            <h1 className="text-start text-[26px] cursor-pointer">Best selling</h1>
            <h3 className="text-end text-[22px] cursor-pointer">See more</h3>
          </div>
                
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[25px]">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i, index) => <ProductCard data={i} key={index} source="best selling" />)}
              </>
            )
           }
        </div>
        </div>
      </div>
    </>
  );
};

export default BestDeals;
