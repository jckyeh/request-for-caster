import axios from "axios";

export async function getCasts() {
  try {
    const resultRequestFor = await axios.get(
      "https://searchcaster.xyz/api/search?text=request+for"
    );
    const resultRequestCaster = await axios.get(
      "https://searchcaster.xyz/api/search?text=requestcaster"
    );

    const uniqueMerkleRoots = new Set(
      resultRequestFor.data.casts.map((cast: any) => cast.merkleRoot)
    );

    const mergedCasts = [
      ...resultRequestFor.data.casts,
      ...resultRequestCaster.data.casts.filter(
        (cast: any) => !uniqueMerkleRoots.has(cast.merkleRoot)
      ),
    ];

    const sortedMergedCasts = mergedCasts.sort((a: any, b: any) =>
      a.body.publishedAt > b.body.publishedAt ? -1 : 1
    );

    return sortedMergedCasts;
  } catch (error) {
    console.log(error);
  }
}
