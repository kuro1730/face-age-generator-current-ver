export default async function handler(req, res) {
    const response = await fetch(
      "https://api.replicate.com/v1/predictions/" + req.query.id,
      {
        headers: {
          Authorization: `Token 5804b5bf1a52d95591be094f9c845c0babb2996b}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await response.json();
    res.end(JSON.stringify(prediction));
  }