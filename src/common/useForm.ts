import { useState, useEffect } from "react";

export interface FormValues {
  [field: string]: any;
}

export type FormErrors<V> = {
  [key in keyof V]?: string;
};
export type FormTouched<V> = {
  [key in keyof V]?: boolean;
};
export type UseFormProps<V> = {
  initialValues: V;
  onSubmit: (values: V) => Promise<unknown>;
  validator: (values: V) => FormErrors<V>;
};
export const useForm = <V extends FormValues>({
  initialValues,
  onSubmit,
  validator,
}: UseFormProps<V>) => {
  const [values, setValues] = useState<V>(initialValues);
  const [errors, setErrors] = useState<FormErrors<V>>({});
  const [touched, setTouched] = useState<FormTouched<V>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (validator) {
      setErrors(validator(values));
    }
  }, [values, validator]);

  const handleChange = (field: keyof V) => (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | { value: unknown }
    >
  ) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleBlur = (field: keyof V) => (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTouched({ ...touched, [field]: true });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    if (submitting) return;
    const err = validator(values);
    if (Object.keys(err).length) {
      setErrors(err);
      setTouched(
        Object.keys(values).reduce(
          (acc: FormTouched<V>, key: keyof FormTouched<V>) => {
            acc[key] = true;
            return acc;
          },
          {}
        )
      );
      setSubmitting(false);
    } else {
      setSubmitting(true);

      return onSubmit(values)
        .catch((err) => {})
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const getControlProps = (name: string) => {
    return {
      name,
      value: values[name] || "",
      onChange: handleChange(name),
      onBlur: handleBlur(name),
    };
  };

  return {
    values,
    errors,
    touched,
    submitting,
    handleChange,
    handleBlur,
    getControlProps,
    resetForm,
    handleSubmit,
  };
};
