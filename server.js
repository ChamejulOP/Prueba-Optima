const express = require('express');
const app = express();
const port = 3000; // Puedes usar otro puerto si el 3000 está ocupado

app.use(express.static('public')); // Directorio donde están los archivos estáticos

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});