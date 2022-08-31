import { providers, Contract, utils } from "ethers";
import axios from "axios";
import got from "got";

export async function getCasts() {
  try {
    const resultRequest = await axios.get(
      "https://searchcaster.xyz/api/search?text=request"
    );
    const resultRequestCaster = await axios.get(
      "https://searchcaster.xyz/api/search?text=requestcaster"
    );
    // console.log("result: ", result.data);

    const result = resultRequest.data.casts.concat(
      resultRequestCaster.data.casts
    );

    result.sort((a: any, b: any) =>
      a.body.publishedAt > b.body.publishedAt ? -1 : 1
    );

    return resultRequestCaster;
  } catch (error) {
    console.log(error);
    // return
  }
}

export async function doStuff() {
  const ALCHEMY_SECRET = process.env.ALCHEMY_SECRET;
  const provider = new providers.AlchemyProvider("rinkeby", ALCHEMY_SECRET);

  const block = await provider.getBlockNumber();
  // console.log("The latest Ethereum block is: ", block);

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
  // console.log(`${username}'s Host is located at: ${directoryUrl} \n`);
  const directoryResponse = await got(directoryUrl);
  const directory = JSON.parse(directoryResponse.body);

  // console.log(`${username}'s Directory is: `);
  // console.log(directory, "\n");

  const addressActivityUrl = directory.body.addressActivityUrl;
  const addressActivityResponse = await got(addressActivityUrl);
  const addressActivity = JSON.parse(addressActivityResponse.body);

  const cast = addressActivity[0];
  console.log(`${username}'s most recent Cast was: `);
  console.log(cast, "\n");

  const stringifiedCastBody = JSON.stringify(cast.body);
  const calculatedHash = utils.keccak256(
    utils.toUtf8Bytes(stringifiedCastBody)
  );
  const expectedHash = cast.merkleRoot;

  if (calculatedHash !== expectedHash) {
    console.log(
      `FAILED: the calculated hash ${calculatedHash} does not match the one in the cast: ${expectedHash}`
    );
  } else {
    console.log(
      `PASSED: the calculated hash ${calculatedHash} matches the one in the cast`
    );
  }

  return cast;
}
