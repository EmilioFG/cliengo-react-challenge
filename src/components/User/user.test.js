import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import User from "./User";

const data = { name: "Juan", email: "arg@gmail.com", phone: "+543242343", country: "AR" };

describe("Render User", () => {
  beforeEach(() =>
    render(
      <User
        name={data.name}
        email={data.email}
        phone={data.phone}
      />
    )
  );

  it("Render Name", () => {
    expect(screen.getByText(data.name)).toBeInTheDocument();
  });
  it("Render Email", () => {
    expect(screen.getByText(data.email)).toBeInTheDocument();
  });
  it("Render Phone", () => {
    expect(screen.getByText(data.phone)).toBeInTheDocument();
  });
});
