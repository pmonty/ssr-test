const express = require("express"),
  app = express(),
  template = require("./views/template"),
  babel = require("@babel/standalone"),
  path = require("path");

// Serving static files
app.use("/assets", express.static(path.resolve(__dirname, "assets")));

// hide powered by express
app.disable("x-powered-by");
// start the server
app.listen(process.env.PORT || 3000);

//SSR function import
const ssr = require("./views/server");

// server rendered home page
app.get("/", (req, res) => {
  var jsx = `
  import { useState } from "react";
  import { useForm } from "react-hook-form";
  
  export const App = () => {
    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");
    const onSubmit = (data) => setResult(JSON.stringify(data));
  
    return (
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
    );
  }
`;

  let initialState = {
    app: {
      jsx: jsx,
    },
  };

  const { preloadedState, content } = ssr(initialState);
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
