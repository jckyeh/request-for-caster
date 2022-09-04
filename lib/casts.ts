import axios from "axios";

export async function getCasts() {
  try {
    const resultRequest = await axios.get("https://searchcaster.xyz/api/search?text=request+for");
    // const resultRequestCaster = await axios.get("https://searchcaster.xyz/api/search?text=requestcaster");

    // const result = resultRequest.data.casts.concat(resultRequestCaster.data.casts);

    // result.sort((a: any, b: any) => (a.body.publishedAt > b.body.publishedAt ? -1 : 1));

    return resultRequest.data.casts;
    // return result;
  } catch (error) {
    console.log(error);
  }
}
