import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { About } from "./About";



vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("About component", () => {
  it("renders the bio heading", () => {
    render(<About />);

    expect(screen.getByText("I am Everest a Software Engineer from Boise")).toBeInTheDocument();

  });

  it("renders skill icons from skills.json", () => {
    render(<About />);

    expect(screen.getByAltText("HTML logo")).toBeInTheDocument();
   
  });

  it("renders the resume download link", () => {
    render(<About />);
    const link = screen.getByRole("link", { name: "View Resume" });
    expect(screen.getByText("View Resume")).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("download");
  });
});
