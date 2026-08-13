export const Checkbox = ({ type, placeholder, value, onChange, classes}) => {
    return (
        <>
            
                <input type="checkbox" className={classes} placeholder={placeholder} value={value} onChange={onChange} />
            
        </>
    )
}