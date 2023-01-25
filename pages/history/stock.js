import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

function historyStock() {
    const [history, setHistory] = useState();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    useEffect(() => {
        async function fetch() {
            const data = {
                username: localStorage.getItem("username")
            }
            const JSONdata = JSON.stringify(data)
            const userdata = await axios({
                method: "POST",
                url: "https://golang-authapi.onrender.com/apiV1/history/stock",
                data: JSONdata,
                headers: {
                    'Content-Type': "application/json"
                }
            })
            const resdata = await userdata.data;
            setHistory(resdata.data)
        }
        fetch()
    }, [])
    if (history == undefined) {
        return null;
    }
    function copy(text) {
        var newString = text.replace('Your key: ', '');
        navigator.clipboard.writeText(newString)
        return toast('คัดลอกคีย์สำเร็จ.', {
            icon: ({ theme, type }) => <Image src="/imgs/verified.gif" width="30" height="30" alt="verified" />,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    if (history.data != null) {
        return (
            <Container>
                <h1 className="ml-5 text-white text-4xl sm:text-4xl font-extrabold">
                    ประวัติการ <span className="text-main-log">สั่งซื้อ</span>
                </h1>
                <h1 className="ml-5 text-base text-white/60">สินค้าทั้งหมดที่คุณทำการสั่งซื้อกับทาง SwitchHub</h1>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
                    {history.data.map((log, index) => (
                        <div key={index} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" onClick={() => copy(log.info)}>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <Image src="/imgs/key.gif" width="50" height="50" alt="key" />
                                </div>
                            </div>
                            <h1 className="text-base">{log.info}</h1>
                            <h1 className="text-sm">{log.type}</h1>

                        </div>
                    ))}
                </div>
            </Container>
        )
    } else {
        return (
            <Container>
                <h1 className="ml-5 text-white text-4xl sm:text-4xl font-extrabold">
                    ประวัติการ <span className="text-main-log">สั่งซื้อ</span>
                </h1>
                <h1 className="ml-5 text-base text-white/60">สินค้าทั้งหมดที่คุณทำการสั่งซื้อกับทาง SwitchHub</h1>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
                    <div key={1} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" onClick={() => copy(log.info)}>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <Image src="/imgs/key.gif" width="50" height="50" alt="key" />
                            </div>
                        </div>
                        <h1 className="text-base">ไม่พบประวัติการสั่งซื้อ</h1>
                        <h1 className="text-sm">Error#9999</h1>

                    </div>
                </div>
            </Container>
        )
    }
}

export default historyStock