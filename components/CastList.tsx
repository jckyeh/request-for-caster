import React, { useEffect } from "react";

import { providers, Contract, utils } from "ethers";
import got from "got";

async function doStuff() {
  const ALCHEMY_SECRET = process.env.ALCHEMY_SECRET;
  const provider = new providers.AlchemyProvider("rinkeby", ALCHEMY_SECRET);

  const block = await provider.getBlockNumber();
  console.log("The latest Ethereum block is: ", block);

  const REGISTRY_CONTRACT_ADDRESS =
    "0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1";
  const REGISTRY_ABI = [
    {
      name: "getDirectoryUrl",
      inputs: [{ internalType: "bytes32", name: "username", type: "bytes32" }],
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      name: "addressToUsername",
      inputs: [{ internalType: "address", name: "", type: "address" }],
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const registryContract = new Contract(
    REGISTRY_CONTRACT_ADDRESS,
    REGISTRY_ABI,
    provider
  );

  const username = "v";
  const byte32Name = utils.formatBytes32String(username);
  const directoryUrl = await registryContract.getDirectoryUrl(byte32Name);
  console.log(`${username}'s Host is located at: ${directoryUrl} \n`);

  return directoryUrl;

  // const directoryResponse = await got(directoryUrl);
  // const directory = JSON.parse(directoryResponse.body);
  // console.log(`${username}'s Directory is: `);
  // console.log(directory, "\n");
}

const CastList = () => {
  useEffect(() => {
    doStuff();
  }, []);

  return <div>Hello world</div>;
};

export default CastList;
