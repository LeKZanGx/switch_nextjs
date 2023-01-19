import Image from "next/image";
export default function Home() {
  return (
    <div className="container-fluid banner-home p-4 pt-5 pb-5 m-cent">
      <div className="container p-4 pt-5 pb-5 m-cent">
        <div className="row justify-content-center justify-content-lg-between">
          <div className="col-lg mb-4">
            <Image
              src=""
              alt="banner-switchhub"
            />
          </div>
          <div className="col-lg mb-4">
            <h2 className="text-center linear-wipe">SwitchHub</h2>
          </div>
        </div>
      </div>
    </div>
  );
}