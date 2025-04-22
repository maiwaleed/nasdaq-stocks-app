import { act } from "@testing-library/react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ScrollToTopButton from "./ScrollToTopButton";
import "@testing-library/jest-dom";

describe("ScrollToTopButton", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    window.scrollTo = jest.fn();
  });

  it("should not render the button when scrolled to the top", () => {
    render(<ScrollToTopButton />);
    expect(screen.queryByTestId("scrollUp-btn")).not.toBeInTheDocument();
  });

  it("should render the button when scrolled down", async () => {
    render(<ScrollToTopButton />);

    window.scrollY = 300;
    await act(() => {
      window.dispatchEvent(new Event("scroll"));
      return Promise.resolve();
    });

    await waitFor(() => {
      expect(screen.getByTestId("scrollUp-btn")).toBeInTheDocument();
    });
  });

  it("should call scrollTo when the button is clicked", async () => {
    render(<ScrollToTopButton />);

    window.scrollY = 300;
    await act(() => {
      window.dispatchEvent(new Event("scroll"));
      return Promise.resolve();
    });

    const button = await screen.findByTestId("scrollUp-btn");
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
