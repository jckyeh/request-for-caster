// import useSWR from 'swr';

import type { NextPage } from "next";
import { ReactNode } from "react";
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
      <div className="flex flex-row justify-between items-center w-full max-w-6xl h-20 px-6 md:px-10">
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

const Cast = ({ cast }: any) => {
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
            {formatCastText(cast.body.data.text, "request")}
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoCardProps {
  shadow?: boolean;
  title: string;
  text: ReactNode;
}

const InfoCard = (props: InfoCardProps) => {
  return (
    <div
      className={
        "flex flex-col p-6 rounded-2xl bg-white border border-slate-200 " +
        (props.shadow ? "drop-shadow-xl" : "")
      }
    >
      <div className="text-xl font-bold text-slate-900 mb-3">{props.title}</div>
      <div className="text-slate-700 whitespace-pre-line">{props.text}</div>
    </div>
  );
};

const aboutCardText = (
  <>
    Request for Caster (RFCaster) is a list of feature or product requests from
    the Farcaster community.
    <br />
    <br />
    Cast a request with the hashtag
    <span className="font-semibold text-purple-700"> #RFCaster </span>
    and it will be added to the list. New casts are indexed every 30min.
  </>
);

const resourcesCardText = (
  <>
    Want to hack on a request? Here are some helpful resources:
    <br />
    <br />
    <ul className="text-purple-700">
      <li>
        <a
          href="https://www.farcaster.xyz/docs/fetch-casts"
          target="_blank"
          rel="noopener"
        >
          Farcaster Tutorial
        </a>
      </li>
      <li>
        <a href="https://farapps.farcase.xyz/" target="_blank" rel="noopener">
          Farcaster apps
        </a>
      </li>
    </ul>
  </>
);

const SideBar = () => {
  return (
    <div className="flex flex-initial flex-col md:sticky top-0 md:order-last max-w-xl md:w-4/12 mx-auto md:ml-[8.333333333333332%] mb-10 md:mb-16">
      <div className="flex flex-col sticky top-12 gap-6">
        <InfoCard title="🪄 About RFCaster" text={aboutCardText} shadow />
        <InfoCard title="🏗 Resources for Builders" text={resourcesCardText} />
        <div className="hidden md:block text-sm text-slate-500">
          💌 HMU for feedback or ideas! @jacky (FC), or on{" "}
          <a
            href="https://twitter.com/jckyeh"
            target="_blank"
            rel="noopener"
            className="text-purple-700"
          >
            the bird app
          </a>
          .
        </div>
      </div>
    </div>
  );
};

// const Home: NextPage = ({ directory, results }) => {
const Home: NextPage = ({ results }: any) => {
  // console.log(`directoryUrl props is: `, directory);
  console.log(`results props is: `, results);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Head>
        <title>Request for Caster</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="md:flex md:flex-row px-6 md:px-10 pt-6 md:pt-12 w-full max-w-6xl mb-16">
        <SideBar />
        <div className="flex flex-auto flex-col w-full md:w-[58.333333333333336%] max-w-xl md:max-w-none mx-auto md:mx-0">
          <h1 className="text-3xl font-bold text-slate-900 md:mb-4">
            💬 Requests
          </h1>
          <div className="p-4 rounded-lg bg-purple-50 mt-6 mb-2 md:mt-4 md:mb-0">
            🚧 Currently showing casts mentioning "request" in addition to
            #RFCaster
          </div>
          {results.map((cast: any, index: number) => (
            <Cast key={index} cast={cast} />
          ))}
          {/* <CastList /> */}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
