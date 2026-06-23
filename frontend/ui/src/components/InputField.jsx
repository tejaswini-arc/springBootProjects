export default function InputField({
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}
    </>
  );
}