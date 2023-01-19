import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Card, Row } from "react-bootstrap";
import Image from "next/image";
import { setCookie, deleteCookie } from "cookies-next";
import { Button } from "react-bootstrap";
import Script from 'next/script'

export const NavbarComponent = () => {
  const [Authentication, setAuthentication] = useState(false);
  const [Username, setUsername] = useState("Guest");
  const [Point, setPoint] = useState(0);
  const [Rank, setRank] = useState("");
  const handleLogout = async (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    deleteCookie("token")
    setAuthentication(false)
    setUsername("Guest")
    return Swal.fire({
      icon: "success",
      title: "ออกจากระบบแล้ว",
      text: "ขอบคุณที่มาใช้บริการครับ/ค่ะ",
      timer: 2000,
      buttonsStyling: false,
      confirmButtonText: "Bye...",
      customClass: {
        confirmButton: "btn button-62-success"
      },
      showClass: {
        popup: "animate__animated animate__slideInDown"
      },
      hideClass: {
        popup: "animate__animated animate__lightSpeedOutLeft animate__faster"
      }
    })
  }
  useEffect(() => {
    async function checkToken() {
      if (!localStorage.getItem("token")) {
        console.log("You don't have a token")
        deleteCookie("token")
        return
      }
      axios({
        method: "GET",
        url: "https://golang-authapi.onrender.com/apiV1/user/authentication",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      }).then((res) => {
        if (res.status == 200) {
          setAuthentication(true)
          setUsername(res.data.data.data.username)
          setPoint(res.data.data.data.point)
          setRank(res.data.data.data.Stats)
          setCookie("token", localStorage.getItem("token"))
        }
      }).catch((err) => {
        if (err.status == 401) {
          console.log("User unauthorized")
          if (localStorage.getItem("token") != "") {
            localStorage.removeItem("token")
            deleteCookie("token")
          }
        } else {
          localStorage.removeItem("token")
          deleteCookie("token")
        }
        setAuthentication(false)
        setUsername("Guest")
      });
    }
    checkToken();
  });
  if (!Authentication) {
    return (
      <>
        <Script src="https://code.jquery.com/jquery-3.6.3.min.js" />
        <Script src="//cdn.jsdelivr.net/npm/sweetalert2@11" />
        {[false].map((expand) => (
          <Navbar key={expand} bg="dark" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand href="/home">
                <Image
                  src="https://cdn.discordapp.com/icons/961866856283635732/1aa2c24f001a61d7def13c9aa460b18c.webp?size=512"
                  width="80"
                  height="80"
                  className="d-inline-block align-top"
                  alt="test"
                />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                className="bg-dark text-white"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <hr></hr>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Card className="ml-3 text-center text-dark" bg="white">
                      <div className="d-flex justify-content-center">
                        <Image
                          src="/imgs/profile.png"
                          width="100"
                          height="100"
                          alt="test"
                        />
                      </div>
                      <br></br>
                      <h6>
                        🙍‍♂️Status: <Badge bg="success">{Username}</Badge>
                      </h6>
                    </Card>
                    <hr></hr>
                    <Link href="/login" className="text-center btn-hakko2">
                      <i className="mdi mdi-login"></i>
                      <br></br>เข้าสู่ระบบ
                    </Link>
                    <br></br>
                    <Link href="/register" className="text-center btn-hakko2">
                      <i className="mdi mdi-account-plus"></i>
                      <br></br>สมัครสมาชิก
                    </Link>
                  </Nav>
                  {/* <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form> */}
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
  } else {
    return (
      <>
        {[false].map((expand) => (
          <Navbar key={expand} bg="dark" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand href="/home">
                <Image
                  src="https://cdn.discordapp.com/icons/961866856283635732/1aa2c24f001a61d7def13c9aa460b18c.webp?size=512"
                  width="80"
                  height="80"
                  className="d-inline-block align-top"
                  alt="test"
                />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                className="bg-dark text-white"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Card className="ml-3 text-center text-dark" bg="white">
                      <div className="d-flex justify-content-center">
                        <Image
                          src="/imgs/profile.png"
                          width="100"
                          height="100"
                          alt="test"
                        />
                      </div>
                      <br></br>
                      <h6>
                        🙍‍♂️ชื่อผู้ใช้งาน: <Badge bg="success">{Username}</Badge>
                      </h6>
                      <h6>
                        💰พ้อยท์: <Badge bg="success">{Point} ₱</Badge>
                      </h6>
                      <h6>
                        🔴สถานะ: <Badge bg="success">{Rank}</Badge>
                      </h6>
                      <Button variant="outline-danger" onClick={handleLogout}><i className="mdi mdi-logout-variant"></i> ออกจากระบบ</Button>
                    </Card>
                    <hr></hr>
                    <>
                      <Link href="/" className="text-center btn-hakko2">
                        🏠<br></br>หน้าหลัก
                      </Link>
                      <br></br>
                      <Link href="/shop" className="text-center btn-hakko2">
                        🛒<br></br>ร้านค้า
                      </Link>
                      <br></br>
                      <Link href="/topup" className="text-center btn-hakko2">
                        💰<br></br>เติมเงิน
                      </Link>
                      <br></br>
                      <Link href="" className="text-center btn-hakko2">
                        ☎<br></br>ติดต่อ
                      </Link>
                      <br></br>
                      <Link href="" className="text-center btn-hakko2">
                        🤖<br></br>ดิสคอร์ด
                      </Link>
                    </>
                  </Nav>
                  {/* <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form> */}
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
  }
};
