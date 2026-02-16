import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Drag from "../components/Drag";
import { vi } from "vitest";

test("renders drag component", () => {
  const mockLogin = vi.fn();

  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ login: mockLogin }}>
        <Drag />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByTestId("drag-component")).toBeInTheDocument();
});
