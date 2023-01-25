import axios from 'axios';
import Image from 'next/image';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Shops(props) {
    console.log(props)
    const itemsWithCount = props.data.data.data.map((item) => {
        let strlist = [];
        strlist = item.Key
        let datalist = strlist.filter(function (el) { return el !== ""; });
        let itemlist = datalist.length;
        let msg = "";
        let color = ""
        if (itemlist == 0) {
            msg = 'ดูรายละเอียด'
            color = "outline-info btn-block"
        } else {
            msg = 'สั่งซื้อสินค้า'
            color = "outline-success btn-block"
        }
        return {
            ...item,
            itemlist,
            msg,
            color,
        };
    });
    function handleBuy(item) {
        return Swal.fire({
            icon: "info",
            iconColor: "light-blue",
            title: `${item.name}`,
            html: `
            <hr><p class="text-center">รายละเอียดสินค้า</p>
            <div class="justify-content-start text-start ml-4">
                ${item.description}
            </div>
            <hr>
            <div class="justify-content-start text-start ml-4">
                <p class="text-[16px] float-left font-light text-switch">
                    ราคา: ${item.price} บาท
                </p>
            </div>
            <br>
            <hr>
            <div class="justify-content-conter text-center">
                <p class="text-center">ใส่จำนวนที่ต้องการจะซื้อ</p>
                <input type="number" min="1" max="${item.itemlist}" value="1" class="swal2-input" placeholder="0" id="amount">
            </div>`,
            confirmButtonText: `สั่งซื้อ ${item.name}`,
            didClose: function () {

            },
            preConfirm: () => {
                const amount = Swal.getPopup().querySelector('#amount').value
                if (!amount) {
                    Swal.showValidationMessage(`Please enter data`)
                }

                if (amount == 0) {
                    Swal.showValidationMessage(`Please enter data`)
                }
                return { amount: amount}
            }
        }).then(async (result) => {
            let amount = result.value?.amount
            if (result.isConfirmed) {
                const showLoading = await Swal.fire({
                    icon: "info",
                    title: "รอสักครู่...",
                    timer: 1000,
                    didOpen: function () {
                        Swal.showLoading();
                    }
                })
                if (showLoading) {
                    if (item.itemlist < 1) {
                        Swal.fire({
                            icon: "error",
                            title: "แย่จัง",
                            text: "สินค้าในคลังหมด!",
                            timer: 2000,
                            showConfirmButton: false
                        })
                        return
                    }
                }
                const data = {
                    name: item.name,
                    username: localStorage.getItem("username"),
                    amount: parseInt(amount)
                }

                const JSONdata = JSON.stringify(data)

                const endpoint = 'https://golang-authapi.onrender.com/apiV1/item/buykey'

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSONdata,
                }

                const response = await fetch(endpoint, options)
                const result = await response.json()

                console.log(result)

                if (result.status != 'success') {
                    Swal.fire({
                        icon: "error",
                        title: "แย่จัง",
                        text: result.message,
                        timer: 2000,
                        showConfirmButton: false
                    })
                    return
                }else{
                    return Swal.fire({
                        icon: "success",
                        title: "สั่งซื้อสำเร็จ!",
                        text: result.message,
                        timer: 2000,
                        showConfirmButton: false,
                        didClose: function () {
                            window.location.href="/shop"
                        }
                    })
                }
            }
        })
    }
    return (
        <div className='container'>
            <Row>
                {itemsWithCount.map((item, index) => (
                    <Col md="4" key={index} className="mt-5">
                        <Card bg='dark' key='dark' text='light' border='success' data-aos="fade-down" data-aos-duration="1500">
                            <Card.Body>
                                <Card.Title className='text-center'>{item.name}</Card.Title>
                                <hr></hr>
                                <div className="d-flex justify-content-center">
                                    <Image
                                        src={item.image}
                                        width="200"
                                        height="200"
                                        alt="test"
                                    />
                                </div>
                                <hr></hr>
                                <div className="d-flex justify-content-between">
                                    <div className='text-left'>
                                        <h5 className='ml-1'>ราคา</h5>
                                        <h4><Badge pill bg='primary mr-5'>{item.price} บาท</Badge></h4>
                                    </div>
                                    <div className='text-right'>
                                        <h5>เหลือในสต๊อก</h5>
                                        <h4><Badge bg='info'>{item.itemlist} ชิ้น</Badge></h4>
                                    </div>
                                </div>
                                <Card.Footer>
                                    <div className="d-grid gap-2">
                                        <Button variant={item.color} onClick={() => {
                                            handleBuy(item)
                                        }}>{item.msg}</Button>
                                    </div>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('https://golang-authapi.onrender.com/apiV1/items');
    const data = res.data;
    return {
        props: {
            data,
        },
    };
}

export default Shops;