import * as React from "react";
import { transform } from "@babel/standalone";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createEditor } from "./editor";
export const App = () => {
  const { jsx } = useSelector((state: any) => state.app);
  let el: any = null;
  let editor = null;

  useEffect(() => {
    editor = createEditor(el);
    editor.run(jsx);
  }, []);
  // var Component: any =
  //   jsx &&
  //   eval(
  //     transform(jsx, {
  //       // filename: "test.ts",
  //       presets: [["stage-0", { decoratorsLegacy: true }], "react"],
  //     })?.code as any
  //   );

  // const { register, handleSubmit } = useForm();
  // const [result, setResult] = useState("");
  // const onSubmit = (data: any) => setResult(JSON.stringify(data));

  return (
    <div className="app">
      <div className="split-view">
        <h1>test</h1>
        <div className="preview" ref={(element) => (el = element)}></div>
        {/* <Component /> */}
      </div>
    </div>
  );
};
