import Image from 'next/image';
import Navbar from './components/navbar';
import Link from 'next/link';
import Notebook from '../app/images/notebook.png';

export default function Home() {
  return (
    <main>
      <div className="px-4 md:px-15 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-title mt-4 md:mt-56 ml-4 md:ml-64">
            For students, made by students.
          </h1>
          <h1 className="font-sans ml-4 md:ml-64 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
        </div>
        <div className="md:w-1/2">
          <Image className="w-full ml-36 md:w-80 mt-4 md:mt-32" src={Notebook} alt="" />
        </div>
      </div>
    </main>
  );
}
