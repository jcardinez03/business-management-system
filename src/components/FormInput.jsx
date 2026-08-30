export const FormInput = ({ label, type, onChange, value, placeholder, className="" }) => {

    const baseClass = `outline outline-secondary/40 hover:outline hover:outline-blue-600 rounded-sm w-full h-8 px-3 ${className}`;
    return (

        <div className="flex flex-col py-3">
            <label htmlFor={label} className="text-xs text-muted/40 font-bold">{label}</label>
            <input type={type} onChange={onChange} value={value} placeholder={placeholder} className={baseClass} />
        </div>
    );
}