module.exports = (req, res) => {
  const allowedOrigins = [
    "https://lyceum-schedule.ztu.edu.ua/",
    "https://script.google.com/",
  ];
  const origin = req.headers.origin;

  // Проверяем, что источник запроса разрешен
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.writeHead(200, {
      "Content-type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    });
  }

  res.send = (data) => {
    res.end(JSON.stringify(data));
  };
};
