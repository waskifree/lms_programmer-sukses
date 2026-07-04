import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = auth.user?.isAdmin || false;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#313647" }}>
            {/* Navbar */}
            <nav className="border-b border-gray-700">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo + Navigation */}
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-emerald-400" />
                                </Link>
                            </div>

                            <div className="hidden sm:flex space-x-8 ml-10">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="text-warm-white hover:text-emerald-400 px-3 py-2 transition-colors"
                                    activeClassName="text-warm-white border-b-2 border-emerald-400 font-semibold"
                                >
                                    For Your Page
                                </NavLink>

                                {isAdmin ? (
                                    <NavLink
                                        href={route("content.index")}
                                        active={route().current(
                                            "content.index",
                                        )}
                                        className="text-white hover:text-emerald-400 px-3 py-2 transition-colors text-base"
                                        activeClassName="text-white border-b-2 border-emerald-400 font-semibold"
                                    >
                                        Content
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        href={route("mycontent.index")}
                                        active={route().current(
                                            "mycontent.index",
                                        )}
                                        className="text-white hover:text-emerald-400 px-3 py-2 transition-colors text-base"
                                        activeClassName="text-white border-b-2 border-emerald-400 font-semibold"
                                    >
                                        My Content
                                    </NavLink>
                                )}

                                <NavLink
                                    href={route("profile.show", {
                                        user: user.username,
                                    })}
                                    active={route().current("profile.show")}
                                    className="text-white hover:text-emerald-400 px-3 py-2 transition-colors text-base"
                                    activeClassName="text-white border-b-2 border-emerald-400 font-semibold"
                                >
                                    Profile
                                </NavLink>

                                <NavLink
                                    href={route("users.index")}
                                    active={route().current("users.index")}
                                    className="text-white hover:text-emerald-400 px-3 py-2 transition-colors text-base"
                                    activeClassName="text-white border-b-2 border-emerald-400 font-semibold"
                                >
                                    Users
                                </NavLink>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="text-white flex items-center gap-3 rounded-2xl px-5 py-2 hover:bg-gray-700 transition-all text-warm-white font-medium">
                                        {user.name}
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content className="bg-[#1E2937] border border-gray-700 text-white">
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Button */}
                        <div className="sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        !showingNavigationDropdown,
                                    )
                                }
                                className="p-3 rounded-xl text-warm-white hover:bg-gray-700 hover:text-white transition-colors"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`${showingNavigationDropdown ? "block" : "hidden"} sm:hidden bg-[#1E2937] border-t border-gray-700 py-4`}
                >
                    <div className="px-6 space-y-2 text-warm-white">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            For Your Page
                        </ResponsiveNavLink>
                        {/* Tambahkan ResponsiveNavLink lain jika perlu */}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-[#1E2937] border-b border-gray-700">
                    <div className="max-w-7xl mx-auto px-6 py-6">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
