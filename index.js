import app from "./src/app";
//Listen for requests
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is listening on port ");
  }
});
export default app;
