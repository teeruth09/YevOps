const InputBox = ({ name, value, handleChange, isEditing, label }) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        className="border border-gray-300 rounded-xl h-10 px-2 w-24"
        value={value}
        onChange={isEditing ? handleChange : null} // Only call handleChange if editable
        disabled={isEditing} // Disable input if not in editing mode
      />
    </div>
  );
};

export default InputBox;
