import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DetailsBill = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  console.log("check data", data);

  const token = useSelector((state) => state.token.tokenDefault);

  useEffect(async () => {
    let res = await axios.get(`http://localhost:8085/api/v1/bill/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("check data details", res.data);

    if (res && res.data) {
      setData(res.data.data);
    }
  }, [id]);
  return (
    <div className="mx-auto p-12 container">
      <p className="text-3xl font-bold text-blue-700 text-center mb-8">
        CHI TIẾT HÓA ĐƠN
      </p>
      <div className="w-full px-20">
        <div className="w-full flex flex-row flex-wrap mt-3">
          <div className="shadow-md flex-auto  p-10 pb-20 bg-white rounded-l-xl rounded-b-xl rounded-r-xl">
            <div className="w-full">
              <p className="text-2xl font-bold text-black text-center mb-5">
                Thông Tin Khách Hàng
              </p>
              <div>
                <div>
                  <p className="font-bold h-6 mt-3 text-black text-xl ">
                    Tên Khách Hàng:{" "}
                    <span className="text-gray-600 ml-3 text-xl">
                      {data && data.customer && data.customer.firstName}{" "}
                      {data && data.customer && data.customer.lastName}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-bold h-6 mt-3 text-black text-xl ">
                    Số Điện Thoại:{" "}
                    <span className="text-gray-600 ml-3 text-xl">
                      {data && data.customer && data.customer.phoneNumber}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-bold h-6 mt-3 text-black text-xl ">
                    Địa Chỉ:{" "}
                    <span className="text-gray-600 ml-3 text-xl">
                      {data && data.customer && data.customer.address}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-2xl font-bold text-blue-500 text-center my-5">
        Danh Sách Sản Phẩm
      </p>
      <div className="flex flex-col w-100 container px-20">
        {data &&
          data.item &&
          data.item.length > 0 &&
          data.item.map((item, i) => {
            return (
              <div className="w-full flex flex-row flex-wrap my-5" key={i}>
                <div className="shadow-md flex-auto p-10 pb-5 bg-white rounded-l-xl rounded-b-xl rounded-r-xl">
                  <div className="w-full">
                    <div className="flex">
                      <div className="w-24 flex-none">
                        <img
                          className="w-full h-24 object-cover"
                          // src={item.product.image[0].urlImage}
                          src={`http://localhost:8085/api/v1/image/files/${item.product.image[0].urlImage}`}
                        />
                      </div>
                      <div className="grow px-5 text-xl">
                        <p>{item.product.title}</p>
                        <p>x{item.quantity}</p>
                      </div>
                      <div className="w-24 flex-none text-blue-700 text-base font-bold">
                        <p>{item.product.price}đ</p>
                      </div>
                    </div>
                    <div className="w-full flex flex-nowrap mt-2 text-xl font-bold">
                      <p className="text-black">Thành Tiền: </p>
                      <span className="mx-5 text-blue-700 italic">
                        {item.product.price * item.quantity}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* <div className="w-full flex flex-row flex-wrap my-5">
          <div className="shadow-md flex-auto p-10 pb-5  bg-white rounded-l-xl rounded-b-xl rounded-r-xl">
            <div className="w-full">
              <div className="flex">
                <div className="w-24 flex-none">
                  <img
                    className="w-full h-24 object-cover"
                    src="https://lh3.googleusercontent.com/kaw0JQb1lGqBmHRg6wuA5Czs7oKOJE1RRr8lM247cIzgSp3ogfDWAyNLWyDyg6EBRNN6ZtOrKg84znqtmHb4PLCQNT59rV4V=rw-w300"
                  />
                </div>
                <div className="grow px-5 text-xl">
                  <p>Lap top hahahahahahaha65656hahahahahahahah</p>
                  <p>x1</p>
                </div>
                <div className="w-24 flex-none text-blue-700 text-base font-bold">
                  <p>90000đ</p>
                </div>
              </div>
              <div className="w-full flex flex-nowrap mt-2 text-xl font-bold">
                <p className="text-black">Thành Tiền: </p>
                <span className="mx-5 text-blue-700 italic">100000đ</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="w-screen left-0 p-5 fixed bottom-0 bg-blue-700 text-white text-xl text-right">
        <p>Tổng: 19009000đ</p>
      </div>
    </div>
  );
};

export default DetailsBill;
