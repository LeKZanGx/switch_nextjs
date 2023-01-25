import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
function Topup() {
    const router = useRouter()
    const handleTopup = async (event) => {
        event.preventDefault();
        const  mobile = "0648041829"
        const data = {
            username: localStorage.getItem("username"),
            mobile: mobile,
            code: event.target.gift_link.value,
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = 'https://golang-authapi.onrender.com/apiV1/topup'

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

        if (result.status != "success") {
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
                    icon: "error",
                    title: "แย่จัง!",
                    text: result.message,
                    timer: 2000,
                    showConfirmButton: false,
                    showClass: {
                        popup: "animate__animated animate__slideInDown animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__lightSpeedOutLeft animate__faster"
                    },
                })
                return
            }
        }else{
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
                    icon: "success",
                    title: "เยี่ยมเลย!",
                    text: result.message,
                    timer: 2000,
                    showConfirmButton: false,
                    showClass: {
                        popup: "animate__animated animate__slideInDown animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__lightSpeedOutLeft animate__faster"
                    },
                    didClose: function() {
                        router.push("/shop", undefined)
                    }
                })
                return
            }
        }
    }
    return (
        <>
            <Container>
                <div className='my-5 mx-auto'>
                    <Row className='justify-content-md-center'>
                        <Col md="12">
                            <Card bg='dark' key='dark' text='light' border='success' data-aos="zoom-in" data-aos-duration="500" >
                                <Card.Body>
                                    <Card.Title className='ml-3'>
                                        <h3 data-aos="fade-left" data-aos-duration="2000"><FontAwesomeIcon icon={faGift} /> TOPUP | อังเปา</h3>
                                    </Card.Title>
                                    <hr></hr>
                                    <h5 className="ml-4">เติมเงินด้วยซองของขวัญ TrueMoney Wallet</h5>
                                    <Card.Body className="mt-5">
                                        <Row>
                                            <Col md={{ span: 5, offset: 1 }}>
                                                <iframe frameBorder="0" width="100%" height="350" src="https://www.youtube.com/embed/F5QWJZKsXB0" title="สอนเติมเงิน เข้าเว็บสุ่มต่างๆ ด้วยระบบเติม แบบ True Wallet ซองของขวัญ (เวอร์ชั่นใหม่)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                                            </Col>
                                            <Col md={{ span: 5, offset: 0 }}>
                                                <Form onSubmit={handleTopup}>
                                                    <Form.Group className="mb-3" controlId="gift_link">
                                                        <h5><FontAwesomeIcon icon={faGift} /> กรอกลิงค์ซองของขวัญที่นี่</h5>
                                                        <Form.Control type="text" placeholder="ใส่ลิงค์ซองของขวัญ" />
                                                    </Form.Group>
                                                    <div className="d-grid gap-2">
                                                        <Button variant="success" size="lg" type='submit'>
                                                            เติมเงิน
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default Topup;