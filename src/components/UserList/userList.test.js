import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import UserList from "./UserList";

describe("Render UserList", () => {
  beforeEach(() =>
    render(
      <UserList />
    )
  );
  it('hola', () => {
    expect(screen.getByText('User List')).toBeInTheDocument();
  })
});