const Textarea = ({
    value,
    onChange,
    placeholder,
    className = "",
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
  }) => {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-[#3277ee] resize-none ${className}`}
      />
    );
  };
  
  export default Textarea;
  