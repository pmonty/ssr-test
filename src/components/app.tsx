import * as React from "react";
import { transform } from "@babel/standalone";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const App = () => {
  const { jsx } = useSelector((state: any) => state.app);

  var Component: any =
    jsx &&
    eval(
      transform(jsx, {
        // filename: "test.ts",
        presets: [["stage-0", { decoratorsLegacy: true }], "react"],
      })?.code as any
    );

  // const { register, handleSubmit } = useForm();
  // const [result, setResult] = useState("");
  // const onSubmit = (data: any) => setResult(JSON.stringify(data));

  return (
    <div>
      <h1>test</h1>

      <Component />
    </div>
  );
};

// return <div suppressHydrationWarning={true}>{eval(Component)}</div>;
//
