import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import CountDown from "../../Events/CountDown";

const ProductCard = ({ data, isEvent, source }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [showAddToCart, setShowAddToCart] = useState(false);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  function calculatePercentageDiscount(originalPrice, discountedPrice) {
    const percentageDiscount = Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
    return percentageDiscount;
  }

  return (
    <div className="flex flex-col">
      <div
        onMouseEnter={() => setShowAddToCart(true)}
        onMouseLeave={() => setShowAddToCart(false)}
        className={` ${
          source === "events" ? "border-solid border-4 border-white" : ""
        } w-[255] h-[336px] shadow-sm relative cursor-pointer`}
      >
        <div className="flex justify-end"></div>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>

        {source === "events" ? (
          <div className="bg-[#ffbb38] absolute px-2 py-5 top-0 left-0">
            <h4 className="font-[500]">
              -
              {calculatePercentageDiscount(
                data.originalPrice,
                data.discountPrice
              )}
              %
            </h4>
          </div>
        ) : null}
        {source === "events" ? (
          <div className="bg-white absolute top-[75%] left-[50%] transform -translate-x-[50%] -translate-y-[-50%] px-4 py-1">
            <CountDown data={data} />
          </div>
        ) : (
          showAddToCart && (
            <div className="bg-white absolute top-[75%] left-[50%] transform -translate-x-[50%] -translate-y-[-50%] px-5 py-2">
              <h4
                className="font-[400]"
                onClick={() => addToCartHandler(data._id)}
              >
                ADD TO CART
              </h4>
            </div>
          )
        )}
      </div>
      <Link
      // to={`${
      //   isEvent === true
      //     ? `/product/${data._id}?isEvent=true`
      //     : `/product/${data._id}`
      // }`}
      >
        <div className="pt-2 flex items-center justify-between">
          <h4 className="font-[400]">
            {data.name.length > 30 ? data.name.slice(0, 30) + "..." : data.name}
          </h4>
          {click ? (
            <AiFillHeart
              size={16}
              className="cursor-pointer"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={16}
              className="cursor-pointer"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5
              className={`${styles.shop_name}`}
            >{`Sold by: ${data.shop.name}`}</h5>
          </Link>
          <AiOutlineEye
            size={16}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>

        <div className="flex">
          <Ratings rating={data?.ratings} />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              $
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </h5>
            {source !== "events" && (
              <div className="border-solid border-[1px] items-center border-[#d55b45] pl-2 pr-2 ml-4">
                <h4 className={`${styles.price}`}>
                  {data.originalPrice ? "$" + data.originalPrice : null}
                </h4>
              </div>
            )}
          </div>
          <span className="font-[400] text-[15px] text-[#68d284]">
            {data?.sold_out} sold
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
