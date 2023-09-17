import Image from 'next/image';
import Navbar from './components/navbar';
import Link from 'next/link';
import Notebook from '../app/images/notebook.png';

export default function Home() {
  return (
    <main>
      <div className="px-4 md:px-72 flex flex-col md:flex-row justify-between">
        <div className="w-1/2 flex flex-col">
          <h1 className="text-black font-title text-5xl mt-4 md:mt-48 leading-tight">
            Made for students, by students
          </h1>
          <h2 className="text-black font-sans mt-6 leading-relaxed">
            Deepen your understanding and accelerate the learning process with notes that highlight key concepts.
          </h2>
        </div>
        <Image className="w-full md:w-80 mt-4 md:mt-24" src={Notebook} alt="" />
      </div>
    </main>
  );
}
