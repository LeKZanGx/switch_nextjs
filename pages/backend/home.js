import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Button, Container } from "react-bootstrap"
import Swal from "sweetalert2";

function BackendHome(props) {
    const [menu, setMenu] = useState('overview')
    const [countUser, setCountUser] = useState(null);
    const [countItem, setCountItem] = useState(null);
    if (countUser == null) {
        setCountUser(props.store.datauser.data.data.length)
    }
    if (countItem == null) {
        setCountItem(props.store.dataitem.data.data.length)
    }
    const addItem = async function () {
        const showLoading = await Swal.fire({
            icon: "info",
            title: "รอสักครู่...",
            timer: 1000,
            didOpen: function () {
                Swal.showLoading();
            }
        })
        if (showLoading) {
            Swal.fire({
                title: "เพิ่มสินค้า",
                html: `<input type="text" id="name" class="swal2-input" placeholder="ชื่อสินค้า">
                        <input type="text" id="price" class="swal2-input" placeholder="ราคา">
                        <input type="text" id="category" class="swal2-input" placeholder="หมวดหมู่">
                        <input type="text" id="image" class="swal2-input" placeholder="รูปภาพสินค้า">
                        <input type="text" id="description" class="swal2-input" placeholder="รายละเอียดสินค้า">`,
                confirmButtonText: 'โอเค เพิ่มเลย!',
                focusConfirm: false,
                preConfirm: () => {
                    const name = Swal.getPopup().querySelector('#name').value
                    const price = Swal.getPopup().querySelector('#price').value
                    const category = Swal.getPopup().querySelector('#category').value
                    const image = Swal.getPopup().querySelector('#image').value
                    const description = Swal.getPopup().querySelector('#description').value
                    if (!name || !price || !category || !image || !description) {
                        Swal.showValidationMessage(`Please enter data`)
                    }
                    return { name: name, price: price, category: category, image: image, description: description }
                }
            }).then((result) => {
                if (result.isDismissed) {
                    return null
                }

                if (result.isDenied) {
                    return null
                }

                if (result.isConfirmed) {
                    ConfirmAddItem(result.value)
                }
            })
        }
    }
    const ConfirmAddItem = async function (data) {
        const JSONdata = JSON.stringify(data)

        const endpoint = 'http://localhost:8080/apiV1/item/additem'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        const showLoading = await Swal.fire({
            icon: "info",
            title: "รอสักครู่...",
            timer: 1000,
            didOpen: function () {
                Swal.showLoading();
            }
        })
        if (showLoading) {
            if (result.status != "success") {
                Swal.fire({
                    icon: "error",
                    title: "หว้าแย่จัง",
                    text: "เกิดข้อผิดพลาด",
                    showConfirmButton: false,
                    timer: 2000
                })
                return
            } else {
                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ!",
                    text: result.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    const showItemData = async function (itemname) {
        let data = {
            name: itemname
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = 'http://localhost:8080/apiV1/item/fetch'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        if (result.status == "success") {
            Swal.fire({
                title: `ข้อมูล ${result.data.data.name}`,
                html: `<input type="text" id="name" class="swal2-input" placeholder="ชื่อสินค้า" value="${result.data.data.name}">
                        <input type="text" id="price" class="swal2-input" placeholder="ราคา" value="${result.data.data.price}">
                        <input type="text" id="description" class="swal2-input" placeholder="รายละเอียด" value="${result.data.data.description}">
                        <input type="text" id="category" class="swal2-input" placeholder="หมวดหมู่" value="${result.data.data.category}">
                        <input type="text" id="image" class="swal2-input" placeholder="รูปภาพสินค้า" value="${result.data.data.image}">
                        <div class="form-floating">
                            <textarea class="form-control" id="key"></textarea>
                            <label for="key">คีย์ที่ต้องการเพิ่ม</label>
                        </div>
                        <br>`,
                confirmButtonText: 'แก้ไข',
                showDenyButton: true,
                denyButtonText: `ลบคีย์ทั้งหมด`,
                focusConfirm: false,
                preConfirm: () => {
                    const name = result.data.data.name
                    const newname = Swal.getPopup().querySelector('#name').value
                    const price = Swal.getPopup().querySelector('#price').value
                    const description = Swal.getPopup().querySelector('#description').value
                    const category = Swal.getPopup().querySelector('#category').value
                    const image = Swal.getPopup().querySelector('#image').value
                    const keys = Swal.getPopup().querySelector('#key').value;
                    const keyArray = keys.split("\n");
                    if (!newname || !price || !description || !category || !image) {
                        Swal.showValidationMessage(`Please enter data`)
                    }
                    return { name: name, newname: newname, price: price, description: description, category: category, image: image, keys: keyArray }
                },
                preDeny: () => {
                    const name = result.data.data.name
                    return { name: name }
                }
            }).then((resultc) => {
                if (resultc.isDismissed) {
                    return null
                }

                if (resultc.isDenied) {
                    ConfirmDeleteKey(resultc.value)
                }

                if (resultc.isConfirmed) {
                    ConfirmUpdateItem(resultc.value)
                }
            })
        }
    }

    const showUserData = async function (username) {
        let data = {
            username: username
        }
        const JSONdata = JSON.stringify(data)

        const endpoint = 'http://localhost:8080/apiV1/user/fetch'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        if (result.status == "success") {
            Swal.fire({
                title: `ข้อมูล ${result.data.data.username}`,
                html: `<input type="text" id="email" class="swal2-input" placeholder="อีเมล์" value="${result.data.data.email}">
                        <input type="text" id="point" class="swal2-input" placeholder="พ้อยท์" value="${result.data.data.point}">
                        <input type="text" id="stats" class="swal2-input" placeholder="สถานะ" value="${result.data.data.Stats}">`,
                confirmButtonText: 'แก้ไข',
                focusConfirm: false,
                preConfirm: () => {
                    const username = result.data.data.username
                    const point = Swal.getPopup().querySelector('#point').value
                    const stats = Swal.getPopup().querySelector('#stats').value
                    if (!username || !point || !stats) {
                        Swal.showValidationMessage(`Please enter data`)
                    }
                    return { username: username, point: point, stats: stats }
                }
            }).then((result) => {
                if (result.isDismissed) {
                    return null
                }

                if (result.isDenied) {
                    return null
                }

                if (result.isConfirmed) {
                    ConfirmUpdate(result.value)
                }
            })
        }
    }

    const ConfirmDelete = async function () {
        Swal.fire({
            title: `ลบข้อมูล`,
            html: `<input type="text" id="name" class="swal2-input" placeholder="ชื่อสินค้า">`,
            confirmButtonText: 'ลบข้อมูล',
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value
                if (!name) {
                    Swal.showValidationMessage(`Please enter data`)
                }
                return { name: name }
            }
        }).then((result) => {
            let name = result.value?.name
            if (result.isDismissed) {
                return null
            }

            if (result.isDenied) {
                return null
            }

            if (result.isConfirmed) {
                axios.post('http://localhost:8080/apiV1/item/delete', {
                    name: name
                }).then((res) => {
                    if (res.data.status != "success") {
                        Swal.fire({
                            icon: "error",
                            title: "หว้าแย่จัง",
                            text: "เกิดข้อผิดพลาด",
                            showConfirmButton: false,
                            timer: 2000
                        })
                        return
                    }else{
                        Swal.fire({
                            icon: "success",
                            title: "สำเร็จ",
                            text: res.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        })
                        return
                    }
                })
            }
        })
    }

    const ConfirmDeleteKey = async function (data) {
        const JSONdata = JSON.stringify(data)

        const endpoint = 'http://localhost:8080/apiV1/item/deletekey'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        if (result.status != "success") {
            Swal.fire({
                icon: "error",
                title: "หว้าแย่จัง",
                text: "เกิดข้อผิดพลาด",
                showConfirmButton: false,
                timer: 2000
            })
            return
        } else {
            Swal.fire({
                icon: "success",
                title: "สำเร็จ!",
                text: result.message,
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    const ConfirmUpdateItem = async function (data) {
        const JSONdata = JSON.stringify(data)

        const endpoint = 'http://localhost:8080/apiV1/item/edit'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        if (result.status != "success") {
            Swal.fire({
                icon: "error",
                title: "หว้าแย่จัง",
                text: "เกิดข้อผิดพลาด",
                showConfirmButton: false,
                timer: 2000
            })
            return
        } else {
            Swal.fire({
                icon: "success",
                title: "สำเร็จ!",
                text: result.message,
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    const ConfirmUpdate = async function (data) {
        const JSONdata = JSON.stringify(data)

        const endpoint = 'http://localhost:8080/apiV1/user/edit'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        if (result.status != "success") {
            Swal.fire({
                icon: "error",
                title: "หว้าแย่จัง",
                text: "เกิดข้อผิดพลาด",
                showConfirmButton: false,
                timer: 2000
            })
            return
        } else {
            Swal.fire({
                icon: "success",
                title: "สำเร็จ!",
                text: result.message,
                showConfirmButton: false,
                timer: 2000
            })
        }
    }
    if (menu == "overview") {
        return (
            <Container>
                <h1 className="ml-5 text-white text-4xl sm:text-4xl font-extrabold">
                    ภาพรวมข้อมูล <span className="text-main-log">ผู้ใช้งาน</span>
                </h1>
                <h1 className="ml-5 text-base text-white/60">ผู้ใช้งานในเว็ปทั้งหมด {countUser} บัญชี</h1>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('overview')}>ภาพรวมข้อมูล</Button>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('users')}>จัดการผู้ใช้งาน</Button>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('stocks')}>จัดการสินค้า</Button>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
                    {props.store.datauser.data.data.map((userdata, index) => (
                        <div key={index} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" onClick={() => showUserData(userdata.username)}>
                            <h1 className="text-xl">{userdata.username}</h1>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <Image src="/imgs/users.gif" width="50" height="50" alt="key" />
                                </div>
                            </div>
                            <h1 className="text-base">Point: {userdata.point}</h1>
                            <h1 className="text-sm">Status: {userdata.Stats}</h1>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <h1 className="ml-5 text-white text-4xl sm:text-4xl font-extrabold">
                    ภาพรวมข้อมูล <span className="text-main-log">สินค้า</span>
                </h1>
                <h1 className="ml-5 text-base text-white/60">สินค้าในเว็ปทั้งหมด {countItem} ชิ้น</h1>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
                    {props.store.dataitem.data.data.map((itemdata, index) => (
                        <div key={index} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" onClick={() => showItemData(itemdata.name)}>
                            <h1 className="text-xl">{itemdata.name}</h1>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <Image src="/imgs/shopping-cart.gif" width="50" height="50" alt="key" />
                                </div>
                            </div>
                            <h1 className="text-base">Price: {itemdata.price}</h1>
                            <h1 className="text-sm">Amount: {itemdata.Key.length}</h1>

                        </div>
                    ))}
                    <div key={999} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" onClick={() => addItem()}>
                        <h1 className="text-xl">เพิ่มสินค้า</h1>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <Image src="/imgs/add-folder.gif" width="50" height="50" alt="key" />
                            </div>
                        </div>
                        <h1 className="text-base">Custom SHOP ITEM</h1>
                        <h1 className="text-sm">เพิ่มสินค้าเข้าสู่ระบบ</h1>

                    </div>
                </div>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
            </Container>
        )
    } else if (menu == "users") {
        return (
            <Container>
                <h1 className="ml-5 text-white text-4xl sm:text-4xl font-extrabold">
                    ภาพรวมข้อมูล <span className="text-main-log">ผู้ใช้งาน</span>
                </h1>
                <h1 className="ml-5 text-base text-white/60">ผู้ใช้งานในเว็ปทั้งหมด {countUser} บัญชี</h1>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('overview')}>ภาพรวมข้อมูล</Button>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('users')}>จัดการผู้ใช้งาน</Button>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('stocks')}>จัดการสินค้า</Button>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
                    {props.store.datauser.data.data.map((userdata, index) => (
                        <div key={index} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" onClick={() => showUserData(userdata.username)}>
                            <h1 className="text-xl">{userdata.username}</h1>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <Image src="/imgs/users.gif" width="50" height="50" alt="key" />
                                </div>
                            </div>
                            <h1 className="text-base">Point: {userdata.point}</h1>
                            <h1 className="text-sm">Status: {userdata.Stats}</h1>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
            </Container>
        )
    } else if (menu == "stocks") {
        return (
            <Container>
                <h1 className="ml-5 text-white text-4xl sm:text-4xl font-extrabold">
                    ภาพรวมข้อมูล <span className="text-main-log">สินค้า</span>
                </h1>
                <h1 className="ml-5 text-base text-white/60">สินค้าในเว็ปทั้งหมด {countItem} ชิ้น</h1>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('overview')}>ภาพรวมข้อมูล</Button>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('users')}>จัดการผู้ใช้งาน</Button>
                <Button variant="outline-success" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => setMenu('stocks')}>จัดการสินค้า</Button>
                <Button variant="outline-danger" className="ml-5 text-white bg-gradient-to-t from-main-600 to-pink-400 px-2 rounded-2xl" onClick={() => ConfirmDelete()}>ลบสินค้าที่ต้องการ</Button>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-x-4 text-green-500 justify-center text-center pt-7 px-4">
                    {props.store.dataitem.data.data.map((itemdata, index) => (
                        <div key={index} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" onClick={() => showItemData(itemdata.name)}>
                            <h1 className="text-xl">{itemdata.name}</h1>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <Image src="/imgs/shopping-cart.gif" width="50" height="50" alt="key" />
                                </div>
                            </div>
                            <h1 className="text-base">Price: {itemdata.price}</h1>
                            <h1 className="text-sm">Amount: {itemdata.Key.length}</h1>

                        </div>
                    ))}
                    <div key={999} className="rounded-2xl shadow-xl border-8 bg-white border-green-500 p-6 transition ease-in-out delay-50 hover:-translate-y-7 hover:scale-11 duration-300 cursor-pointer" onClick={() => addItem()}>
                        <h1 className="text-xl">เพิ่มสินค้า</h1>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <Image src="/imgs/add-folder.gif" width="50" height="50" alt="key" />
                            </div>
                        </div>
                        <h1 className="text-base">Custom SHOP ITEM</h1>
                        <h1 className="text-sm">เพิ่มสินค้าเข้าสู่ระบบ</h1>
                    </div>
                </div>
                <div className="border-t border-white w-full my-3 opacity-40">
                </div>
            </Container>
        )
    }
}

export async function getServerSideProps() {
    const resitem = await axios.get('https://golang-authapi.onrender.com/apiV1/items');
    const dataitem = resitem.data;
    const resuser = await axios.get('https://golang-authapi.onrender.com/apiV1/users');
    const datauser = resuser.data;
    return {
        props: {
            store: {
                dataitem,
                datauser,
            },
        },
    };
}

export default BackendHome