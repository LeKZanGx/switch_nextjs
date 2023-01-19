import Image from "next/image";
export default function Home() {
  return (
    <div className="container-fluid banner-home p-4 pt-5 pb-5 m-cent">
      <div className="container p-4 pt-5 pb-5 m-cent">
        <div className="row justify-content-center justify-content-lg-between">
          <div className="d-flex justify-content-center">
            <div className="col-lg mb-4">
              <Image
                src="https://cdn.discordapp.com/icons/961866856283635732/1aa2c24f001a61d7def13c9aa460b18c.webp?size=512"
                alt="banner-switchhub"
              />
            </div>
          </div>
          <div className="col-lg mb-4">
            <h2 className="text-center linear-wipe">SwitchHub</h2>
          </div>
        </div>
      </div>
    </div>
  );
}