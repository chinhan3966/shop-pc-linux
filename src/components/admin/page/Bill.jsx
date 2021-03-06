import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiPhone } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Helmet from "../../common/Helmet";
const Bill = () => {
  const [listBill, setListBill] = useState([]);
  console.log(listBill);
  const token = useSelector((state) => state.token.tokenDefault);
  useEffect(async () => {
    let res = await axios.get("http://localhost:8085/api/v1/bill/get-all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res && res.data && res.data.data) {
      setListBill(res.data.data);
    }
    // console.log("check list category", res);
  }, []);

  const totalItem = (arr) => {
    let total = arr.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return total;
  };

  const priceSplitter = (number) =>
    number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <Helmet title="Hóa Đơn">
      <motion.div
        className="px-10"
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        animate={{ clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)" }}
        exit={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          transition: { duration: 0.3 },
        }}
      >
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2 text-right text-xl font-semibold text-blue-700 uppercase">
            QUẢN LÍ hóa đơn
          </div>
          <div
            //   x-data="{ isOpen: false }"
            className="relative w-1/2 flex justify-end"
          >
            <button className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
              <img src="https://genk.mediacdn.vn/2018/11/26/john-cena-fashion-15431990207761255377744.jpg" />
            </button>
            {/* <button className="h-full w-full fixed inset-0 cursor-default"></button> */}
            <div
              // x-show="isOpen"
              className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 hidden"
            >
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Account
              </a>

              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Sign Out
              </a>
            </div>
          </div>
        </header>

        {/* add product */}

        {/* add product */}
        {/* table product */}
        <div className="my-10 bg-slate-50 rounded-md py-5">
          <p className="text-xl pb-3 flex items-center uppercase font-medium ">
            <i className="fas fa-list mr-3"></i> Danh Sách hóa đơn
          </p>
          <div>
            {/* flex container */}
            <div className="flex  flex-wrap justify-center  px-6 gap-6">
              {/* item */}
              {listBill &&
                listBill.length > 0 &&
                listBill.map((item, index) => {
                  return (
                    <div
                      className=" shadow bg-white w-[30%] rounded-md"
                      key={index}
                    >
                      <div className="rounded-lg overflow-hidden p-4">
                        <p className="mb-2 text-black text-3xl font-semibold leading-relaxed block md:text-2xl capitalize">
                          {item.customer.firstName} {item.customer.lastName}
                        </p>
                        <div className="flex items-center mb-2">
                          {" "}
                          <GrHomeRounded size="20px" className="shrink-0" />
                          <span className="ml-3 text-sm line-clamp-2 block">
                            {item.customer.address}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          {" "}
                          <HiPhone size="20px" />{" "}
                          <span className="ml-3 text-sm">
                            {" "}
                            {item.customer.phoneNumber}{" "}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          <FaMoneyBill size="20px" />{" "}
                          <span className="ml-3 text-sm">
                            {priceSplitter(totalItem(item.item))}đ
                          </span>
                        </div>
                        <p className="text-black text-2xl leading-relaxed block md:text-base ">
                          Online
                        </p>
                        {/* <div className="text-black text-2xl leading-relaxed block md:text-base bg-green-600  ">
                          Đang Giao
                        </div> */}

                        <Link
                          to={`/admin/bill/details/${item.id}`}
                          className="block text-[#1435c3] capitalize hover:text-blue-600 font-medium mb-2 text-base mt-1"
                        >
                          chi tiết
                        </Link>
                      </div>
                    </div>
                  );
                })}

              {/* item */}
            </div>
            {/* flex container */}
          </div>
        </div>
        {/* table product */}
      </motion.div>
    </Helmet>
  );
};

export default Bill;
