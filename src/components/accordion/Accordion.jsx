import { useState } from "react";
import { Collapse, Button } from "antd";

const { Panel } = Collapse;

export default function Accordion() {
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  const data = [
    {
      id: "1",
      question: "What is React?",
      answer:
        "React is a JavaScript library for building user interfaces, especially single-page applications. It allows developers to create reusable UI components.",
    },
    {
      id: "2",
      question: "What are components in React?",
      answer:
        "Components are the building blocks of a React application. They are reusable pieces of code that return UI elements and can be functional or class-based.",
    },
    {
      id: "3",
      question: "What is JSX?",
      answer:
        "JSX stands for JavaScript XML. It is a syntax extension that allows you to write HTML-like code inside JavaScript.",
    },
    {
      id: "4",
      question: "What is state in React?",
      answer:
        "State is an object that holds data that can change over time in a component.",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Button
        type="primary"
        style={{ background: "#614101", color: "#c2a57a" }}
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
      >
        {enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
      </Button>

      <div style={{ width: 500 }}>
        <Collapse accordion={!enableMultiSelection}>
          {data.map((item) => (
            <Panel key={item.id} header={
              <span style={{ color: "#c2a57a" }}>
                {item.question}
              </span>
            } style={{ background: "#614101" }}>
              <p>{item.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}