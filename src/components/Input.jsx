export const Input = ({type, className, placeholder, value, onChange}) => {

    const baseClasses = "border-0"


    const classes = `${baseClasses} ${className}`;
    return(
        <>
            <input type={type} className={classes} placeholder={placeholder} value={value} onChange={onChange}/>   
        </>
    )
}