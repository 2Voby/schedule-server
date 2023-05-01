module.exports = (req, res) => {
  // Проверяем, что источник запроса разрешен
    res.writeHead(200, {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    });
  

  res.send = (data) => {
    res.end(JSON.stringify(data));
  };
};
