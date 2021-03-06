import { cleanup, render, screen, waitFor, act } from "@testing-library/react";

import { useFetcher } from "./useFetcher";

describe("useFetcher hook", () => {
  afterEach(cleanup);

  it("should fetch data on the first call", async () => {
    const fetcherSpy = jest.fn(() => Promise.resolve("DATA"));
    function Page() {
      const { data } = useFetcher("cache-key", fetcherSpy);
      return <div>hi, {data}</div>;
    }
    render(<Page />);
    expect(screen.getByText("hi,")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("hi, DATA")).toBeInTheDocument()
    );
  });

  it("should not refetch data on rerenders, if cache key is provided", async () => {
    const fetcherSpy = jest.fn(() => Promise.resolve("DATA"));
    function Page() {
      const { data } = useFetcher("cache-key2", fetcherSpy);
      return <div>{data}</div>;
    }
    const { rerender } = render(<Page />);
    await waitFor(() => expect(screen.getByText("DATA")).toBeInTheDocument());
    rerender(<Page />);
    expect(fetcherSpy).toHaveBeenCalledTimes(1);
  });

  it("should refetch data without caching, if cache key is not provided", async () => {
    const fetcherSpy = jest.fn(() => Promise.resolve("DATA"));
    function Page() {
      const { data } = useFetcher(null, fetcherSpy);
      return <div>{data}</div>;
    }
    render(<Page />);
    await waitFor(() => expect(screen.getByText("DATA")).toBeInTheDocument());
    expect(fetcherSpy).toHaveBeenCalledTimes(1);
    render(<Page />);
    await waitFor(() => expect(screen.getByText("DATA")).toBeInTheDocument());
    expect(fetcherSpy).toHaveBeenCalledTimes(2);
  });

  it.skip("should be called only once, for several components", async () => {
    // TODO: add feature
    const fetcherSpy = jest.fn(() => Promise.resolve("DATA"));

    function Page1() {
      const { data } = useFetcher("cache-key3", fetcherSpy);
      return <div>{data}</div>;
    }
    function Page2() {
      const { data } = useFetcher("cache-key3", fetcherSpy);
      return <div>{data}</div>;
    }
    render(
      <>
        <Page1 />
        <Page2 />
      </>
    );
    await waitFor(() => expect(fetcherSpy).toHaveBeenCalledTimes(1));
  });
});
