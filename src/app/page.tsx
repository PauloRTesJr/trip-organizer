import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="navbar bg-neutral text-neutral-content">
        <button className="btn btn-ghost text-xl">Trip Organizer</button>
      </div>
      <main className="container mx-auto p-6 h-screen">
        <button className="btn btn-success">Success</button>
      </main>
    </div>
  );
}
