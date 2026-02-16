import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "./hero";
import { act } from "react";
describe('check for title text', () =>
    {
        it.concurrent('should render titel', () => {
            vi.useFakeTimers();
            render(<Hero></Hero>)
            act(() => {vi.advanceTimersByTime(20000)})
            expect(screen.getByText("Hello I'm")).toBeInTheDocument();  
            vi.useRealTimers();
       });
    }
)
describe('check for title text', () =>
    {
        it.concurrent('should render subheading', () => {
            vi.useFakeTimers();
            render(<Hero></Hero>)
            act(() => {vi.advanceTimersByTime(20000)})
            expect(screen.getByText("A Fullstack Developer")).toBeInTheDocument();  
            vi.useRealTimers();
       });
    }
)
