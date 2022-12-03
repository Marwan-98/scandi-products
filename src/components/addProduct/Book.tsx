import React from "react";
import { Form } from "react-bootstrap";
import { FormikProps } from "formik";
import { initialValues } from "../../../types/index";

type Props = {
  formik: FormikProps<initialValues>;
};

const Book = ({ formik }: Props) => {
  return (
    <>
      <Form.Group
        className="mb-3 d-inline-flex align-items-center justify-content-between"
        style={{ minWidth: "100%" }}
      >
        <Form.Label>Weight (KG)</Form.Label>
        <Form.Control
          type="number"
          id="weight"
          name="weight"
          onChange={formik.handleChange}
          style={{ maxWidth: "50%" }}
          step="any"
        />
      </Form.Group>
      <span>Please, provide weight</span>
    </>
  );
};

export default Book;
