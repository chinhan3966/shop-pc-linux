import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineUpdate, MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import Helmet from "../../common/Helmet";
const Customer = () => {
  const [listCustomer, setListCustomer] = useState([]);
  console.log(listCustomer);
  const token = useSelector((state) => state.token.tokenDefault);
  useEffect(async () => {
    let res = await axios.get("http://localhost:8085/api/v1/customer/get-all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res && res.data && res.data.data) {
      setListCustomer(res.data.data);
    }
  }, []);
  return (
    <Helmet title="Khách Hàng">
      <motion.div
        className="px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.3 },
        }}
      >
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2 text-right text-xl font-semibold text-blue-700 uppercase">
            QUẢN LÍ khách hàng
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
            <i className="fas fa-list mr-3"></i> Danh Sách Khách Hàng
          </p>
          <div>
            <table>
              <thead className="bg-gray-800 text-white ">
                <tr>
                  <th className="w-[10%] text-left py-3 px-4 uppercase font-semibold text-sm text-center ">
                    Tên
                  </th>
                  <th className="w-[10%] text-left py-3 px-4 uppercase font-semibold text-sm text-center">
                    Họ
                  </th>
                  <th className="w-[15%] text-left py-3 px-4 uppercase font-semibold text-sm text-center">
                    số điện thoại
                  </th>
                  <th className="w-[53%] text-left py-3 px-4 uppercase font-semibold text-sm text-center">
                    địa chỉ
                  </th>

                  <th className="w-[6%] text-left py-3 px-4 uppercase font-semibold text-sm text-center"></th>
                  <th className="w-[6%] text-left py-3 px-4 uppercase font-semibold text-sm text-center"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {listCustomer &&
                  listCustomer.length > 0 &&
                  listCustomer.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="w-[10%] text-left py-3 px-4 text-center capitalize">
                          {item.firstName}
                        </td>
                        <td className="w-[10%] text-left py-3 px-4 text-center capitalize">
                          {item.lastName}
                        </td>
                        <td className="w-[15%] text-left py-3 px-4 text-center">
                          {item.phoneNumber}
                        </td>
                        <td className="w-[53%] text-center mx-auto py-3 px-4">
                          {item.address}
                        </td>

                        <td className="w-[6%] text-left py-3 px-4 text-center">
                          <MdDeleteForever size="25px" />
                        </td>
                        <td className="w-[6%] text-left py-3 px-4 text-center">
                          <MdOutlineUpdate size="25px" />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* table product */}
      </motion.div>
    </Helmet>
  );
};

export default Customer;
