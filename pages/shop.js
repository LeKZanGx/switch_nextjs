import axios from 'axios';
import Image from 'next/image';
import { useEffect } from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';

function Shops(props) {
    console.log(props)
    const itemsWithCount = props.data.data.data.map((item) => {
        console.log(item.Key)
        let strlist = [];
        strlist = item.Key
        let datalist = strlist.filter(function (el) { return el !== ""; });
        let itemlist = datalist.length;
        let msg = "";
        let color = ""
        if (itemlist == 0) {
            msg = 'สินค้าหมด!'
            color = "outline-danger btn-block"
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
    return (
        <div className='container'>
            <Row>
                {itemsWithCount.map((item, index) => (
                    <Col md="4" key={index} className="mt-5">
                        <Card bg='dark' key='dark' text='light' border='success'>
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
                                        <Button variant={item.color}>{item.msg}</Button>
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
    console.log(data)
    return {
        props: {
            data,
        },
    };
}

export default Shops;