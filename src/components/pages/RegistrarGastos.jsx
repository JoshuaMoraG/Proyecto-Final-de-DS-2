import { useState } from "react";
import "./RegistrarGasto.css";

function RegisterExpense() {

  const [formData, setFormData] = useState({
    date: "",
    category : "",
    description: "",
    amount: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.date ||
      !formData.category ||
      !formData.description ||
      !formData.amount
    ) {
      setError("Todos los campos son necesarios");
      setSuccess("");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError("El monto debe ser mayor a 0");
      setSuccess("");
      return;
    }

    const newExpense = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount)
    };

    const existingExpenses =
      JSON.parse(localStorage.getItem("gastos")) || [];

    localStorage.setItem(
      "gastos",
      JSON.stringify([...existingExpenses, newExpense])
    );

    setSuccess("Gasto guardado correctamente");
    setError("");

    setFormData({
      date: "",
      category: "",
      description: "",
      amount: ""
    });
  };

  return (
    <div className="register-container">
      <h2>Registro de gastos</h2>

      <form className="register-form" onSubmit={handleSubmit}>

        <input
          type="date"
          name="Día"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="Category"
          placeholder="Categoría"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="Description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="Amount"
          placeholder="Monto"
          value={formData.amount}
          onChange={handleChange}
        />

        <button type="submit">Guardar gastos</button>

      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="guardado exitoso">{success}</p>}
    </div>
  );
}

export default RegisterExpense;
