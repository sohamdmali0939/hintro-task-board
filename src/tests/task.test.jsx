import { render, screen } from "@testing-library/react";
import Task from "../pages/Task";

test("renders task page", () => {
  render(<Task />);
  expect(
    screen.getByRole("heading", { name: /task page/i })
  ).toBeInTheDocument();
});
