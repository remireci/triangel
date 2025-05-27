export async function GET() {
  // Optional DB call to keep Neon awake
  // await db.query('SELECT 1');

  return new Response("OK", { status: 200 });
}
