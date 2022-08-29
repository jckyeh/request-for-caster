// import useSWR from 'swr';

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import CastList from "../components/CastList";

import { doStuff, getCasts } from "../lib/casts";

export async function getServerSideProps() {
  // const directory = await doStuff();
  const results = await getCasts();
  return {
    props: {
      // directory,
      results,
    },
  };
}

const Header = () => {
  return (
    <header className="flex justify-center w-full border-b border-slate-200">
      <div className="flex flex-row justify-between items-center w-full max-w-7xl h-20 px-6">
        <div className="flex flex-row items-center gap-2">
          <Image src="/icon.svg" alt="Farcaster Logo" width={48} height={48} />
          <div className="font-semibold text-xl text-purple-700">
            Request for Caster
          </div>
        </div>
        {/* <div>Request for Caster</div> */}
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t">
      <a
        className="flex items-center justify-center gap-2"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </a>
    </footer>
  );
};

// const Home: NextPage = ({ directory, results }) => {
const Home: NextPage = ({ results }) => {
  // console.log(`directoryUrl props is: `, directory);
  console.log(`results props is: `, results);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-slate-100">
        <h1 className="text-2xl font-bold">Requests</h1>

        {/* <CastList /> */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
