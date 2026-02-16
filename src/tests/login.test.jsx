import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import { vi } from "vitest";

test("renders login heading", () => {
  const mockLogin = vi.fn();

  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ login: mockLogin }}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /login/i })
  ).toBeInTheDocument();
});
