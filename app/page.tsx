import Image from "next/image";
import QrCodeGenerator from "./QrCodeGenerator";

export default function Home() {
  return (
    <div className="relative min-h-screen flex justify-center items-center">
      <QrCodeGenerator/>
      <Image src="/glass.png" alt="glass image" width={1600} height={1200} className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none z-0"/>
    </div>
  );
}
