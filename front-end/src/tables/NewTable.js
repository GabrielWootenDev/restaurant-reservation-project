import React, { useState } from "react";
import { useHistory } from "react-router";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const [error, setError] = useState([]);
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: 1,
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target }) => {
    const { type, value, name } = target;
    setFormData({
      ...formData,
      ...(type === "number" && { [name]: Number(value) }),
      ...(type === "text" && { [name]: value }),
    });
  };

  const handleCancel = (event) => {
    setFormData(initialFormState);
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function submitTable() {
      try {
        await createTable(formData, abortController.signal);
        setFormData(initialFormState);
        history.push("/");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      }
    }

    submitTable();
    return () => {
      abortController.abort();
    };
  };

  return (
    <>
      <div className="text-center">
        <h3>Create a new table</h3>
      </div>
      <div>
        <ErrorAlert error={error} />
      </div>
      <div>
        <TableForm
          handleChange={handleChange}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      </div>
    </>
  );
}

export default NewTable;
