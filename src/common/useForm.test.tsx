import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";

import { useForm, FormValues, UseFormProps, FormErrors } from "./useForm";

// Helper function to render test form
const renderForm = <V extends FormValues = FormValues>(
  formProps: UseFormProps<V>
) => {
  // temp wrapper hook to get return type of a generic function
  const useTmp = () => useForm({} as UseFormProps<V>);
  let form: ReturnType<typeof useTmp>;
  const Form = () => {
    form = useForm(formProps);
    const { handleSubmit, getControlProps } = form;
    return (
      <form onSubmit={handleSubmit}>
        <input {...getControlProps("name")} data-testid="name-input" />
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    );
  };
  const formRender = render(<Form />);

  return { ...formRender, getForm: () => form };
};

interface Values {
  name: string;
  email: string;
}
const initialValues: Values = {
  name: "",
  email: "",
};
const onSubmit = (v: Values) => Promise.resolve();
const validator = (v: Values) => ({});

describe("useForm", () => {
  afterEach(cleanup);

  it("should initialize form", async () => {
    const { getForm } = renderForm({ initialValues, onSubmit, validator });

    expect(getForm().submitting).toBe(false);
    expect(getForm().touched).toEqual({});
    expect(getForm().values).toEqual(initialValues);
    expect(getForm().errors).toEqual({});
  });

  it("should update values state on each change", async () => {
    const { getForm, getByTestId } = renderForm({
      initialValues,
      onSubmit,
      validator,
    });
    const nameInput = getByTestId("name-input");
    fireEvent.change(nameInput, { target: { name: "name", value: "asdf" } });
    expect(getForm().values.name).toEqual("asdf");
  });

  it("should set touched state after blur", async () => {
    const { getForm, getByTestId } = renderForm({
      initialValues,
      onSubmit,
      validator,
    });
    const nameInput = getByTestId("name-input");
    fireEvent.blur(nameInput, { target: { name: "name" } });
    expect(getForm().touched.name).toEqual(true);
  });

  it("should call validator on each change", async () => {
    const validate = jest.fn(() => ({}));
    const { getByTestId } = renderForm({
      initialValues,
      onSubmit,
      validator: validate,
    });
    expect(validate).toBeCalledTimes(1); // first validation with initial values
    const nameInput = getByTestId("name-input");
    fireEvent.change(nameInput, { target: { name: "name", value: "asdf" } });
    expect(validate).toBeCalledTimes(2);
  });

  it("should set errors while validating", async () => {
    const validate = jest.fn((vals) => {
      const err: FormErrors<typeof vals> = {};
      if (!vals.name) {
        err.name = "Name is required";
      }
      return err;
    });
    const { getForm, getByTestId } = renderForm({
      initialValues,
      onSubmit,
      validator: validate,
    });

    expect(getForm().errors.name).toEqual("Name is required");

    const nameInput = getByTestId("name-input");
    fireEvent.change(nameInput, { target: { name: "name", value: "asdf" } });

    expect(getForm().errors).toEqual({});
  });

  it("should turn on/off 'submiting' flag when submiting", async () => {
    const { getForm, getByTestId } = renderForm({
      initialValues,
      onSubmit,
      validator,
    });
    const submitBtn = getByTestId("submit-button");
    fireEvent.click(submitBtn);
    expect(getForm().submitting).toEqual(true);
    await waitFor(() => expect(getForm().submitting).toEqual(false));
  });

  it("should turn off 'submiting' flag after error", async () => {
    const onSubmit = jest.fn(() => Promise.reject("asdf"));
    const { getForm, getByTestId } = renderForm({
      initialValues,
      onSubmit,
      validator,
    });
    const submitBtn = getByTestId("submit-button");
    fireEvent.click(submitBtn);
    expect(getForm().submitting).toEqual(true);
    await waitFor(() => expect(getForm().submitting).toEqual(false));
  });

  it("should not submit if any errors", async () => {
    const validate = jest.fn((vals) => {
      const err: FormErrors<typeof vals> = {};
      if (!vals.name) {
        err.name = "Name is required";
      }
      return err;
    });
    const { getForm, getByTestId } = renderForm({
      initialValues,
      onSubmit,
      validator: validate,
    });

    expect(getForm().errors.name).toEqual("Name is required");

    const submitBtn = getByTestId("submit-button");
    fireEvent.click(submitBtn);
    expect(getForm().submitting).toEqual(false);
  });

  it("should set all fields toached before submiting, if any errors", async () => {
    const validate = jest.fn((vals) => {
      const err: FormErrors<typeof vals> = {};
      if (!vals.name) {
        err.name = "Name is required";
      }
      return err;
    });
    const { getForm, getByTestId } = renderForm({
      initialValues,
      onSubmit,
      validator: validate,
    });

    expect(getForm().errors.name).toEqual("Name is required");

    const submitBtn = getByTestId("submit-button");
    fireEvent.click(submitBtn);
    expect(getForm().touched).toEqual({ name: true, email: true });
  });

  it.skip("should reset form", async () => {
    //TODO:
  });
});
