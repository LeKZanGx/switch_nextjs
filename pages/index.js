import Image from "next/image";
export default function Home() {
  return (
    <div className="container-fluid banner-home p-4 pt-5 pb-5 m-cent">
      <div className="container p-4 pt-5 pb-5 m-cent">
        <div className="row justify-content-center justify-content-lg-between">
          <div className="col-lg mb-4">
            <div className="d-flex justify-content-end mr-2">
              <Image
                src="https://cdn.discordapp.com/icons/961866856283635732/1aa2c24f001a61d7def13c9aa460b18c.webp?size=512"
                width="350"
                height="350"
                alt="banner-switchhub"
              />
            </div>
          </div>
          <div className="col-lg mb-4 ml-2">
            <h2 className="linear-wipe">SwitchHub</h2>
            <hr></hr>
            <h4 className="text-white home-text">#1 Quality Script</h4>
            <h4 className="text-white home-text">ค่ายก่ำๆ สคริปกังๆ ยกให้ SwitchHub</h4>
          </div>
        </div>
      </div>
    </div>
  );
}