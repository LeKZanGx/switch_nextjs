import axios from "axios";
import Image from "next/image";

function Home(props) {
  const Users = props.data.data.Users
  const Items = props.data.data.Items
  const Topups = props.data.data.Topup
  const Historys = props.data.data.History
  return (
    <div className="container text-center">
      <div className="grid pt-3 d-flex justify-content-center" data-aos="zoom-in">
        <img className="img-fluid rounded-top-lg" src="/imgs/ultimates.png" alt="ultimate"></img>
      </div>
      <br></br>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
        <div className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" data-aos="fade-right" data-aos-duration="800">
          <div className="d-flex justify-content-center">
            <Image src="/imgs/user.gif" width="60" height="60" alt="user" />
          </div>
          <h1 className="text-2xl">{Users}</h1>
          <h1 className="text-xl">จำนวนสมาชิกทั้งหมด</h1>
        </div>
        <div className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" data-aos="fade-up" data-aos-duration="800">
          <div className="d-flex justify-content-center">
            <Image src="/imgs/shopping-cart.gif" width="50" height="50" alt="shopping-cart" />
          </div>
          <h1 className="text-2xl">{Items}</h1>
          <h1 className="text-xl">สินค้าทั้งหมดในร้านค้า</h1>
        </div>
        <div className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" data-aos="fade-down" data-aos-duration="800">
          <div className="d-flex justify-content-center">
            <Image src="/imgs/dollar.gif" width="50" height="50" alt="dollar" />
          </div>
          <h1 className="text-2xl">{Historys}</h1>
          <h1 className="text-xl">ยอดการทำรายการทั้งหมด</h1>
        </div>
        <div className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" data-aos="fade-left" data-aos-duration="800">
          <div className="d-flex justify-content-center">
            <Image src="/imgs/money-flow.gif" width="50" height="50" alt="money-flow" />
          </div>
          <h1 className="text-2xl">{Topups}</h1>
          <h1 className="text-xl">จำนวนการเติมเงินทั้งหมด</h1>
        </div>
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:8080/apiV1/dataindex');
  const data = res.data;
  return {
    props: {
      data,
    },
  };
}

export default Home