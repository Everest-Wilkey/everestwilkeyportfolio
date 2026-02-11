import { describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
vi.mock("next/link", () => ({
      default: ({ children, href }: any) => <a href={href}>{children}</a>,
    }));
describe("test logo", () => {
  it.concurrent("test the logo to see if it is there", () => {
    render(<Navbar></Navbar>);
    expect(screen.getByText("EW")).toBeInTheDocument();
  });
});
describe("test links", () => {
  it.concurrent("Check for links", () => {
    render(<Navbar></Navbar>);
    
    const link = screen.getAllByText("Projects")[0];
    expect(link).toBeInTheDocument();
  });
});
