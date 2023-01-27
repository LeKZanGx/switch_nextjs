import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Link from 'next/link'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    const handleLogin = async (event) => {
        event.preventDefault();
        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = 'http://localhost:8080/apiV1/user/login'

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
                        localStorage.setItem("token", result.data.data)
                        router.push("/home", undefined)
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
                        <Card data-aos="fade-left" data-aos-duration="1000">
                            <Card.Body>
                                <Card.Title className='text-center'>
                                    <h3>
                                        เข้าสู่ระบบ
                                    </h3>
                                </Card.Title>
                                <Card.Body>
                                    <Form onSubmit={handleLogin}>
                                        <Form.Group className="mb-3" controlId="username">
                                            <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                                            <Form.Control type="username" placeholder="Enter Username" required />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label>รหัสผ่าน</Form.Label>
                                            <Form.Control type="password" placeholder="Password" required />
                                        </Form.Group>
                                        <div className="text-center">
                                            <Button variant="success" size="lg" type='submit'>
                                                เข้าสู่ระบบ
                                            </Button>
                                        </div>
                                        <br></br>
                                        <Form.Text>
                                            <Link href='/register'>ไปหน้าสมัครสมาชิก</Link>
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