export async function GET() {
  const response = await fetch("https://api.api-ninjas.com/v1/randomword", {
    cache: "no-store",
    headers: {
      "X-Api-Key": process.env.API_NINJAS_KEY,
    } as any,
  });
  const json = await response.json();
  return Response.json({ word: json.word });
}
