import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { useSearchStore } from "../store/searchStore";
import { jest } from "@jest/globals";

// Mocking Zustand store
jest.mock("../store/searchStore.ts", () => ({
  useSearchStore: jest.fn(),
}));

describe("SearchInput Component", () => {
  let setQueryMock: jest.Mock;

  beforeEach(() => {
    setQueryMock = jest.fn();
    (useSearchStore as jest.Mock).mockReturnValue({
      query: "",
      setQuery: setQueryMock,
    });
  });

  it("should render the search input", () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText("Search stocks...")).toBeInTheDocument();
  });

  it("should call setQuery when user types in input", async () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText("Search stocks...");
    fireEvent.change(input, { target: { value: "AAPL" } });

    await waitFor(() => expect(setQueryMock).toHaveBeenCalledWith("AAPL"));
  });

  it("should debounce the input change", async () => {
    jest.useFakeTimers();

    render(<SearchInput />);

    const input = screen.getByPlaceholderText("Search stocks...");
    fireEvent.change(input, { target: { value: "AAPL" } });
    fireEvent.change(input, { target: { value: "GOOG" } });

    // Fast forward timer
    jest.runAllTimers();

    await waitFor(() => expect(setQueryMock).toHaveBeenCalledWith("GOOG"));
    jest.useRealTimers();
  });
});
