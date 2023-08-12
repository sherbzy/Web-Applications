import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

// This is a mock response object so that we're not actually making network requests
const mockObject = {
  firstName: "Terry",
  lastName: "Medhurst",
  birthDate: "2000-12-25",
  university: "Capitol University",
  todos: [
    { id: 17, todo: "Create a cookbook with favorite recipes" },
    { id: 18, todo: "Bake a pie with some friends" },
    { id: 54, todo: "Start a daily journal" },
  ],
};

// This resets our `fetch` mocks before each of the following tests we run
describe("Testing App.js", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  // Render the <App /> and assert `users and their todos` is in the document via the `screen` object and the `getByText` method
  it("renders without error", () => {
    render(<App />);  // render the <App />

    // ensure `Users and their todos` is in the document
    expect(screen.getByText(`Users and their todos`)).toBeInTheDocument();
  });

  // Use `fireEvent` to fire two events: a `change` event for the number input and a `submit` event for the form
  // Then, use `waitFor` for data to come into view when the fetch request has returned and modified state (hint: use the firstName or lastName as the text to get using `getByText`)
  it("fetches the user when an ID is submitted", async () => {
    fetchMock.mockResponse(JSON.stringify(mockObject));
    render(<App />);
    // change the number input
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: '8' } })

    // submit the form
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      // check the name element and university element exist in the document
      const nameElement = screen.getByText('Terry Medhurst');
      const uniElement = screen.getByText('University: Capitol University');
      expect(nameElement).toBeInTheDocument();
      expect(uniElement).toBeInTheDocument();
    });
  });

  // Do the same as above, but ensure that the useEffect hook has a proper dependencies list so that the toHaveBeenCalled assertion passes
  it("fetches the user's todos right after the user object is fetch (useEffect works)", async () => {
    fetch.mockResponse(JSON.stringify(mockObject));
    render(<App />);
    // change the number input
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: '8' } })

    // submit the form
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    // check the name element and university element exist in the document
    await waitFor(() => {
      const nameElement = screen.getByText('Terry Medhurst');
      const uniElement = screen.getByText('University: Capitol University');
      expect(nameElement).toBeInTheDocument();
      expect(uniElement).toBeInTheDocument();
    });

    // wait for some text from the todo array to come into view using getByText
    await waitFor(() => {
      const todoElement = screen.getByText('Create a cookbook with favorite recipes');
      expect(todoElement).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
