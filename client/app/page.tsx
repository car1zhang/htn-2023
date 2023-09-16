import Image from 'next/image';
import Navbar from './components/navbar';
import Link from 'next/link';
import Notebook from '../app/images/notebook.png';

export default function Home() {
  return (
    <main>
      <div className="px-4 md:px-72 flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-2xl md:text-5xl font-title mt-4 md:mt-48 leading-loose font-semibold">
            For students, made by students.
          </h1>
          <h1 className="font-sans mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
        </div>
        <Image className="w-full md:w-80 mt-4 md:mt-24" src={Notebook} alt="" />
      </div>
    </main>
  );
}
