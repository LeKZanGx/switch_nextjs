$("#send_login").on("click", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    let _data = {
        "username": username,
        "password": password
    }
    return $.ajax({
        url: "http://localhost:8080/apiV1/user/login",
        method: "POST",
        data: JSON.stringify(_data)
    }).then(async (res) => {
        if (res.status == "success") {
            return Swal.fire({
                icon: 'success',
                title: 'สำเร็จ!',
                text: res.message,
                timer: 2000,
                buttonsStyling: false,
                confirmButtonText: "กลับหน้าหลัก...",
                customClass: {
                    confirmButton: "btn button-62-success"
                },
                showClass: {
                    popup: "animate__animated animate__slideInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__lightSpeedOutLeft animate__faster"
                },
                didClose: () => {
                    localStorage.setItem("token", res.data.data)
                    window.location.href="/home"
                }
            }).then((response) => {
                if (response.isConfirmed) {
                    localStorage.setItem("token", res.data.data)
                    window.location.href="/home"
                }
            })
        }else{
            return Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: res.data.data,
                buttonsStyling: false,
                confirmButtonText: "เข้าใจแล้ว",
                customClass: {
                    confirmButton: "btn button-62"
                },
                showClass: {
                    popup: "animate__animated animate__slideInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__lightSpeedOutLeft animate__faster"
                }
            })
        }
    }).catch(async (err) => {
        console.log(err.responseText)
    })
})