import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-emerald-400 text-white focus:border-emerald-700"
                    : "border-transparent text-warm-white hover:text-emerald-400 focus:text-emerald-400") +
                " " +
                className
            }
        >
            {children}
        </Link>
    );
}
