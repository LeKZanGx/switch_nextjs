import Swal from "sweetalert2";
import { useRouter } from 'next/router'
import { useEffect } from "react";
function Backends() {
    useEffect(() => {
        async function checkUsername() {
            let data;
            const username = localStorage.getItem("username");
            if (username != "Admin" && username != "LeKZanGx" && username != "Anonymous_ATM") {
                return Swal.fire({
                    icon: "warning",
                    title: "หว้า...",
                    text: "สังสัยมาผิดหน้า กลับหน้าหลักเลยน่ะ",
                    timer: 2000,
                    showConfirmButton: false,
                    didClose: function () {
                        window.location.href="/"
                    }
                })
            }else{
                return Swal.fire({
                    icon: "success",
                    title: "สำเร็จ!",
                    text: "ระบบกำลังพาท่านไปหน้า Backend",
                    timer: 2000,
                    showConfirmButton: false,
                    didClose: function () {
                        window.location.href="/backend/home"
                    }
                })
            }
        }
        checkUsername()
    })
    return (
        <>

        </>
    )
}

export default Backends;