
export const Label = ({ htmlFor, children }) => {
    const baseClasses = "font-semibold md:text-xl"

    const classes = `${baseClasses} `
    return (
        <>

            <label htmlFor={htmlFor} className={classes}>{children}</label>

        </>
    )
}