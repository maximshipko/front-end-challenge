import { useState, useEffect, useRef } from "react";

type FixMe = unknown;
export const useForm = <T extends object>({
  initialValues,
  onSubmit,
}: {
  initialValues: T;
  onSubmit: (opt: FixMe) => void;
}) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<object>({});
  const [touched, setTouched] = useState<object>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  // const [onBlur, setOnBlur] = useState<boolean>(false);

  const formRendered = useRef(true);

  useEffect(() => {
    if (formRendered.current) {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setSubmitting(false);
      // setOnBlur(false);
    }
    formRendered.current = false;
  }, [initialValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value = "" } = target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name } = target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors });
  };

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    if (submitting) return;
    setErrors({ ...errors });
    setSubmitting(true);
    onSubmit({ values, errors });
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
