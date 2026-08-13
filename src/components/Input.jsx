
export const Input = ({type, className, placeholder, value, onChange, icon}) => {

    const baseClasses = "border-0 focus:outline-0 w-full p-2"

    const Icon = icon;
    const classes = `${baseClasses} ${className}`;
    return(
        <>
        <div className="flex flex-row items-center border border-black/50 gap-3 shadow py-2 px-4 rounded-lg focus-within:outline focus-within:outline-primary">
            <p><Icon className="text-dark/60" /></p>
            <input type={type} className={classes} placeholder={placeholder} value={value} onChange={onChange}/>   
        </div>
        </>
    )
}