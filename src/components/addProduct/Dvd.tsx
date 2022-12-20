import React from "react";
import { Form } from "react-bootstrap";
import { FormikProps } from "formik";
import { initialValues } from "../../../types/index";

type Props = {
  formik: FormikProps<initialValues>;
};

const Dvd = ({ formik }: Props) => {
  return (
    <>
      <Form.Group
        className="mb-3 d-inline-flex align-items-center justify-content-between"
        style={{ minWidth: "100%" }}
      >
        <Form.Label>Size (MB)</Form.Label>
        <Form.Control
          type="number"
          id="size"
          name="size"
          value={formik.values.size}
          onChange={formik.handleChange}
          style={{ maxWidth: "50%" }}
          step="any"
          required
        />
      </Form.Group>
      <span>Please, provide size</span>
    </>
  );
};

export default Dvd;
