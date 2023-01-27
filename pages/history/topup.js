import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function HistoryTopup() {
    const [topuphistory, setTopupHistory] = useState(null);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    useEffect(() => {
        async function fetch() {
            const data = {
                username: localStorage.getItem("username")
            }
            const JSONdata = JSON.stringify(data)
            const userdata = await axios({
                method: "POST",
                url: "http://localhost:8080/apiV1/history/topup",
                data: JSONdata,
                headers: {
                    'Content-Type': "application/json"
                }
            })
            const resdata = await userdata.data;
            setTopupHistory(resdata.data)
        }
        fetch()
    }, [])
    if (topuphistory == null) {
        return null;
    }
    if (topuphistory.data != null) {
        return (
            <Container>
                <h1 className="ml-5 text-white text-4xl sm:text-4xl font-extrabold">
                    ประวัติการ <span className="text-main-log">เติมเงิน</span>
                </h1>
                <h1 className="ml-5 text-base text-white/60">ประวัติการเติมพ้อยท์เข้าเว็ปไซต์</h1>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
                    {topuphistory.data.map((log, index) => (
                        <div key={index} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer">
                            <h1 className="text-xl">{log.username}</h1>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <Image src="/imgs/bank.gif" width="50" height="50" alt="key" />
                                </div>
                            </div>
                            <h1 className="text-base">{log.info}</h1>
                            <h1 className="text-sm">{log.date}</h1>
                        </div>
                    ))}
                </div>
            </Container>
        )
    } else {
        return (
            <Container>
                <h1 className="ml-5 text-white text-4xl sm:text-4xl font-extrabold">
                    ประวัติการ <span className="text-main-log">เติมเงิน</span>
                </h1>
                <h1 className="ml-5 text-base text-white/60">ประวัติการเติมพ้อยท์เข้าเว็ปไซต์</h1>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
                    <div key={1} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer">
                        <h1 className="text-xl">{localStorage.getItem("username")}</h1>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <Image src="/imgs/bank.gif" width="50" height="50" alt="key" />
                            </div>
                        </div>
                        <h1 className="text-base">ไม่พบประวัติการเติมเงิน</h1>
                        <h1 className="text-sm">ข้อมูลล่าสุดเมื่อ: {date}</h1>
                    </div>
                </div>
            </Container>
        )
    }
}

export default HistoryTopup