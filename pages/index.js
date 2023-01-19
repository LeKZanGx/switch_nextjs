import { Card, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <div className="opacity-80 h-screen grid content-center">
        <div className="grid sm:grid-cols-2 gap-3 group">
          <div>
            <div className="opacity: 1; --motion-scale:1; transform: scale(var(--motion-scale));">
            <Image src="https://multilabx.team/_nuxt/logoNewGen.196934c3.png" className="mx-auto w-full max-w-xs"/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}