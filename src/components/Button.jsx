export const Button = ({className, size="default", children, color="blue"}) => {
    const baseClasses = "relative overflow-hidden rounded-lg shadow-sm";

    const sizeClasses = {
        sm: "px-4 py-1 text-sm",
        default: "px-10 py-3 text-base",
        lg: "px-15 py-8 text-lg"
    }

    const colorClasses = {
        white: "bg-blue-50 text-primary",
        blue: "bg-primary text-primary-foreground",
        default: "shadow"
    }

    const classes = `${baseClasses} ${sizeClasses[size]} ${className} ${colorClasses[color]}`; // contains all the contents of the button using tailwind
    // baseClasses - default Tailwind classes applied to every button
    // sizeClasses - Tailwind classes for each button size (sm, default, lg)
    // className - additional Tailwind classes passed from <Button>
    return (
        <button className={classes}>
            <span className="relative flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    )
}