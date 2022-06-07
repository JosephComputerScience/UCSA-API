import app from './src/index';
const port = process.env.PORT || 3000; // 3000 is default port
// start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
