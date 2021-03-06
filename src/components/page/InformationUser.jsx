import React, { useEffect, useState } from "react";
import { MdUpdate } from "react-icons/md";
import { AiFillFolderAdd } from "react-icons/ai";
import Helmet from "../common/Helmet";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import axios from "axios";

const InformationUser = () => {
  const token = useSelector((state) => state.token.tokenDefault);

  const [readOnly, setReadOnly] = useState(true);
  const [email, setEmail] = useState("chinhan3966");
  const [firstName, setFirstName] = useState("Nhan");
  const [lastName, setLastName] = useState("Chi");

  const handleEmail = () => {
    setReadOnly(!readOnly);
  };

  const informationUser = JSON.parse(sessionStorage.getItem("informationUser"));

  useEffect(async () => {
    var decoded = jwt_decode(informationUser);
    const { sub } = decoded;
    let res = await axios({
      method: "GET",
      url: `http://localhost:8085/api/v1/user/${sub}`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res && res.data && res.data.data) {
      setEmail(res.data.data.email);
      setFirstName(res.data.data.userProfile.firstName);
      setLastName(res.data.data.userProfile.lastName);
    }
  }, [informationUser]);

  return (
    <Helmet title="Thông Tin Cá Nhân">
      <div className="container mx-auto bg-slate-50">
        <div className="px-32">
          <h1 className="text-center capitalize py-5 mt-5 text-xl">
            thông tin người dùng
          </h1>
          <form>
            <div className="flex items-center mb-10">
              <div className="form-field grow">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder=" "
                  className="form-input"
                  readOnly={readOnly}
                />
                <label className="form-label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="ml-5 cursor-pointer" onClick={handleEmail}>
                <MdUpdate size={"35px"} />
              </div>
            </div>
            <div className="form-field grow mb-10">
              <input
                id="email"
                name="email"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                placeholder=" "
                className="form-input"
                readOnly={readOnly}
              />
              <label className="form-label" htmlFor="email">
                FirstName
              </label>
            </div>
            <div className="form-field grow">
              <input
                id="email"
                name="email"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                placeholder=" "
                className="form-input"
                readOnly={readOnly}
              />
              <label className="form-label" htmlFor="email">
                LastName
              </label>
            </div>
          </form>
          <button className="flex items-center mt-5 text-white bg-[#1435c3] px-5 py-2 rounded-md hover:bg-slate-300 hover:text-[#1435c3] transition-all">
            <AiFillFolderAdd size={"30px"} />
            <div className="ml-2">Cập nhật</div>
          </button>
        </div>
      </div>
    </Helmet>
  );
};

export default InformationUser;
