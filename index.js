const express = require("express"),
  app = express(),
  template = require("./views/template"),
  path = require("path");

// Serving static files
app.use("/assets", express.static(path.resolve(__dirname, "assets")));
// app.use("/media", express.static(path.resolve(__dirname, "media")));

// hide powered by express
app.disable("x-powered-by");
// start the server
app.listen(process.env.PORT || 3000);

// our apps data model
// const data = require("./assets/data.json");

let initialState = {
  isFetching: false,
  apps: "",
};

//SSR function import
const ssr = require("./views/server");

// server rendered home page
app.get("/", (req, res) => {
  var jsx = `
  <form onSubmit={handleSubmit(onSubmit)}>

    <input {...register("firstName")} placeholder="First name" />
    <input {...register("lastName")} placeholder="Last name" />
    <select {...register("category")}>
      <option value="">Select...</option>
      <option value="A">Category A</option>
      <option value="B">Category B</option>
    </select>

    <p>{result}</p>
    <input type="submit" />
  </form>

`;

  const { preloadedState, content } = ssr(initialState, jsx);
  const response = template("Server Rendered Page", preloadedState, content);
  res.setHeader("Cache-Control", "assets, max-age=604800");
  res.send(response);
});

// Pure client side rendered page
app.get("/client", (req, res) => {
  let response = template("Client Side Rendered page");
  res.setHeader("Cache-Control", "assets, max-age=604800");
  res.send(response);
});

// tiny trick to stop server during local development

app.get("/exit", (req, res) => {
  if (process.env.PORT) {
    res.send("Sorry, the server denies your request");
  } else {
    res.send("shutting down");
    process.exit(0);
  }
});
