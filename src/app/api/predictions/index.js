export default async function handler(req, res) {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token 5804b5bf1a52d95591be094f9c845c0babb2996b`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Pinned to a specific version of Stable Diffusion
        // See https://replicate.com/stability-ai/stable-diffussion/versions
        version: "9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c",
  
        // This is the text prompt that will be submitted by a form on the frontend
        input: {
        image: req.body.image,
        target_age: req.body.target_age,
      },
      }),
    });
  
    if (response.status !== 201) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  }