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

export default function Register() {
    const router = useRouter()
    const handleRegister = async (event) => {
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
    }
    return (
        <Container>
            <div className='my-5 mx-auto'>
                <Row className='justify-content-md-center'>
                    <Col md="4">
                        <Card>
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