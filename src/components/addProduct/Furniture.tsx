import React from "react";
import { Form } from "react-bootstrap";
import { FormikProps } from "formik";
import { initialValues } from "../../../types/index";

type Props = {
  formik: FormikProps<initialValues>;
};

const Furniture = ({ formik }: Props) => {
  return (
    <>
      <Form.Group
        className="mb-3 d-inline-flex align-items-center justify-content-between"
        style={{ minWidth: "100%" }}
      >
        <Form.Label>Height (CM)</Form.Label>
        <Form.Control
          type="number"
          id="height"
          name="height"
          value={formik.values.height}
          onChange={formik.handleChange}
          style={{ maxWidth: "50%" }}
          step="any"
          required
        />
      </Form.Group>

      <Form.Group
        className="mb-3 d-inline-flex align-items-center justify-content-between"
        style={{ minWidth: "100%" }}
      >
        <Form.Label>Width (CM)</Form.Label>
        <Form.Control
          type="number"
          id="width"
          name="width"
          value={formik.values.width}
          onChange={formik.handleChange}
          style={{ maxWidth: "50%" }}
          step="any"
          required
        />
      </Form.Group>

      <Form.Group
        className="mb-3 d-inline-flex align-items-center justify-content-between"
        style={{ minWidth: "100%" }}
      >
        <Form.Label>Length (CM)</Form.Label>
        <Form.Control
          type="number"
          id="length"
          name="length"
          value={formik.values.length}
          onChange={formik.handleChange}
          style={{ maxWidth: "50%" }}
          step="any"
          required
        />
      </Form.Group>
      <span>Please, provide dimensions</span>
    </>
  );
};

export default Furniture;
