import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { setCodeForgot } from "../../redux/actions";

const InputCode = () => {
  const [code, setCode] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.tokenDefault);
  const email = useSelector((state) => state.token.emailForgot);

  useEffect(async () => {
    let emailData = new FormData();
    emailData.append("email", email);
    let res = await axios({
      method: "POST",
      url: "http://localhost:8085/api/v1/reset-password/sendmail",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: emailData,
    });
  }, []);

  const handlePostCode = async () => {
    try {
      let checkCode = new FormData();
      checkCode.append("email", email);
      checkCode.append("code", code);
      let res = await axios({
        method: "POST",
        url: "http://localhost:8085/api/v1/reset-password/check",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: checkCode,
      });

      if (res && res.data && res.data.status === 200) {
        dispatch(setCodeForgot(code));
        navigation("/reset-password");
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    } catch (e) {
      toast.warn("Bạn nhập mã code không hợp lệ");
      navigation("/input-secret-code");
    }
  };
  return (
    <motion.div
      className="flex justify-center items-center bg-slate-50"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div>
        <h1 className="text-[#1435c3] my-5 text-center capitalize font-medium text-xl">
          Enter Code
        </h1>
        <input
          className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[780px]"
          placeholder="Fill your email input..."
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="mt-5 flex justify-center">
          <Link
            to="input-secret-code"
            className="bg-[#1435c3] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded capitalize inline-block "
            onClick={handlePostCode}
          >
            Submit
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default InputCode;
