import * as React from "react";
import { transform } from "@babel/standalone";
import { Component, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  jsx?: any;
}
export const App = ({ jsx }: Props) => {
  var Component: any = jsx
    ? transform(jsx, {
        presets: ["react"],
      })?.code
    : null;
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data: any) => setResult(JSON.stringify(data));

  return (
    <div>
      <h1>Test</h1>
      {console.log(Component)}
      {jsx && eval(Component)}
    </div>
  );
};
