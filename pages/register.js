import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

export default function Register() {
    const router = useRouter()
    const handleRegister = async (event) => {
        event.preventDefault();

        const password = event.target.password1.value;
        const confirmpassword = event.target.password2.value;

        if (password != confirmpassword) {
            Swal.fire({
                icon: "info",
                title: "แย่จัง!",
                text: "รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านใหม่อีกครั้ง",
                timer: 2000,
            })
            return
        }

        const data = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password1.value,
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = 'https://golang-authapi.onrender.com/apiV1/user/register'

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
                    text: result.data.data,
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
        } else {
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
                        router.push("/login", undefined)
                    }
                })
            }
        }
    }
    return (
        <Container>
            <div className='my-5 mx-auto'>
                <Row className='justify-content-md-center'>
                    <Col md="4">
                        <Card data-aos="fade-right" data-aos-duration="1000">
                            <Card.Body>
                                <Card.Title className='text-center'>
                                    สร้างบัญชีผู้ใช้
                                </Card.Title>
                                <Card.Body>
                                    <Form onSubmit={handleRegister}>
                                        <Form.Group className="mb-3" controlId="username">
                                            <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                                            <Form.Control type="username" placeholder="Enter Username" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>อีเมล</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="password1">
                                            <Form.Label>รหัสผ่าน</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password1" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="password2">
                                            <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password2" />
                                        </Form.Group>
                                        <div className="text-center">
                                            <Button variant="success" type="submit" size="lg">
                                                สมัครสมาชิก
                                            </Button>
                                        </div>
                                        <br></br>
                                        <Form.Text>
                                            <Link href='/login'>ไปหน้าเข้าสู่ระบบ</Link>
                                        </Form.Text>
                                    </Form>
                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}