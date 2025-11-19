export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method Not Allowed" }),
        { status: 405 }
      );
    }

    const { messages } = await req.json();

    const apiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.1",
        input: messages.map(m => `${m.role}: ${m.content}`).join("\n"),
      }),
    });

    const data = await apiRes.json();

    return new Response(
      JSON.stringify({
        reply: data.output_text || "No reply from model",
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
