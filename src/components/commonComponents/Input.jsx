export default function Input({
  id,
  label,
  onChange,
  labelClasses,
  inputClasses,
  type,
  ...props
}) {
  const ButtonIdentifier = type === "textarea" ? "textarea" : "input";
  return (
    <div className="flex flex-col gap-1 my-4">
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <ButtonIdentifier
        id={id}
        onChange={(e) => onChange(id, e.target.value)}
        type={type}
        {...props}
        className={inputClasses}
      />
    </div>
  );
}
