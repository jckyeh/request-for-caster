// import useSWR from 'swr';

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import CastList from "../components/CastList";
import { formatCastText } from "../utils/casts";
import { getRelativeDate } from "../utils/date";

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
      <div className="flex flex-row justify-between items-center w-full max-w-7xl h-20 px-6 md:px-10">
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

const Cast = ({ cast }) => {
  return (
    <div className="border-b border-slate-200 w-full">
      <div className="flex gap-3 my-6 md:my-8">
        <div className="shrink-0">
          <Image
            src={cast.meta.avatar}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-auto w-0">
          <div className="flex flex-col md:flex-row">
            <div className="font-semibold">{cast.meta.displayName}</div>
            <div className="pl-1 text-slate-500">
              @{cast.body.username} · {getRelativeDate(cast.body.publishedAt)}
            </div>
          </div>
          <div className="whitespace-pre-wrap break-words text-slate-800">
            {formatCastText(cast.body.data.text)}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = () => {
  return (
    <div className="flex flex-col p-6 rounded-2xl mb-10 md:mb-14 bg-white border border-slate-200 drop-shadow-lg">
      <div className="text-xl font-bold text-slate-900 mb-3">
        About RFCaster
      </div>
      <div className="text-slate-700 whitespace-pre-line">
        Request for Caster (RFCaster) is a list of feature or product requests
        from the Farcaster community. <br />
        <br />
        Cast a request with the hashtag
        <span className="font-semibold text-purple-700"> #RFCaster </span>
        and it will be added to the list. New casts are indexed every 30min.
      </div>
    </div>
  );
};

// const Home: NextPage = ({ directory, results }) => {
const Home: NextPage = ({ results }) => {
  // console.log(`directoryUrl props is: `, directory);
  console.log(`results props is: `, results);

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="px-6 md:px-10 pt-6 md:pt-12 max-w-7xl">
        <div className="flex flex-1 flex-col w-full max-w-xl mx-auto">
          <InfoCard />
          <h1 className="text-3xl font-bold text-slate-900 md:mb-4">
            🪄 Requests
          </h1>

          {results.map((cast, index) => (
            <Cast key={index} cast={cast} />
          ))}

          {/* <CastList /> */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
