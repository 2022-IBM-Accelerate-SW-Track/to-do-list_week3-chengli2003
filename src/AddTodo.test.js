import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("test that App component doesn't render dupicate Task", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";
  const dueDate2 = "05/31/2023";
  fireEvent.change(inputTask, { target: { value: "Duplicate" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Duplicate" } });
  fireEvent.change(inputDate, { target: { value: dueDate2 } });
  fireEvent.click(element);
  const check = screen.getByText(/Duplicate/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  const checkDate2 = screen.queryByText(new RegExp(dueDate2, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  expect(checkDate2).toBeNull();
});

test("test that App component doesn't add a task without task name", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(checkDate).toBeNull();
});

test("test that App component doesn't add a task without due date", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "";
  fireEvent.change(inputTask, { target: { value: "TestText" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const checkText = screen.queryByText(new RegExp("TestText", "i"));
  expect(checkText).toBeNull();
});

test("test that App component can be deleted thru checkbox", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "TestText" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const checkBox = screen.getByRole("checkbox");
  fireEvent.click(checkBox);
  const checkGone = screen.queryByText(
    new RegExp("You have no todo's left", "i")
  );
  expect(checkGone).toBeInTheDocument();
});

test("test that App component renders different colors for past due events", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/15/2022";
  fireEvent.change(inputTask, { target: { value: "TestText" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const checkColor = screen.getByTestId(new RegExp("TestText", "i")).style
    .background;
  expect(checkColor).toBe("red");
});
