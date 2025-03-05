export async function getMetadata(type: string): Promise<{
  decimals: number;
}> {
  const response = await fetch(
    `https://api.patara.app/metadata/coin-metadata/0x${type}`
  );
  return response.json();
}
