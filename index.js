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
app.listen(process.env.PORT || 3001);

//SSR function import
const ssr = require("./views/server");

// server rendered home page
app.get("/", (req, res) => {
  var jsx = `
  const React = require("react"),
  ReactDOM = require("react-dom");

 function Test () {

    const [state, setState] = React.useState({ fName: "", lName: "" });

    React.useEffect(() => {
      console.log(state);
    }, [state]);

    const handleChange = e => {
      const { name, value } = e.target;
      setState(prevState => ({
          ...prevState,
          [name]: value
      }));
  };
  
    return (
      <form>
        <input
            value={state.fName}
            type="text"
            onChange={handleChange}
            name="fName"
        />
        <input
            value={state.lName}
            type="text"
            onChange={handleChange}
            name="lName"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  };
 <Test />
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
