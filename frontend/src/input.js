export function SimpleInput({ name, value, onChange, type = "input" }) {
  function inputField() {
    if (type === "input") {
      return (
        <input
          type="text"
          name={name.toLowerCase()}
          value={value}
          onChange={onChange}
          className="simple-input-field"
        />
      );
    } else if (type === "textarea") {
      return (
        <textarea
          name={name.toLowerCase()}
          value={value}
          onChange={onChange}
          className="simple-input-field"
        />
      );
    }
  }

  return (
    <div className="simple-input">
      <label>
        {name}
        <br />
        {inputField()}
      </label>
    </div>
  );
}
