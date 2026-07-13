import React, { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";

import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

import Sidebar from "@/Components/Sidebar";

export default function AuthenticatedLayout({ header, children }) {
    const { props } = usePage();
    const auth = props.auth || {};
    const user = auth.user || props.user || {};
    const { filters = {} } = props;

    const isAdmin = auth.user?.isAdmin || false;

    const [search, setSearch] = useState(filters.search || "");
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Auto search dengan debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (window.location.pathname === "/dashboard") {
                router.get(
                    "/dashboard",
                    { search },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    },
                );
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div className="flex min-h-screen bg-[#0f172a] text-slate-200">
            {/* Sidebar */}
            <Sidebar user={user} isAdmin={isAdmin} />

            {/* Main Area */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Top Navbar */}
                <nav className="bg-[#1e2937] border-b border-slate-700 px-6 py-4">
                    <div className="flex items-center justify-between gap-6">
                        {/* Left Side */}
                        <div className="flex items-center gap-10">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-emerald-400" />
                            </Link>

                            <div className="hidden md:flex items-center gap-8">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    For Your Page
                                </NavLink>

                                {isAdmin ? (
                                    <NavLink
                                        href={route("content.index")}
                                        active={route().current(
                                            "content.index",
                                        )}
                                    >
                                        Content
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        href={route("mycontent.index")}
                                        active={route().current(
                                            "mycontent.index",
                                        )}
                                    >
                                        My Content
                                    </NavLink>
                                )}

                                <NavLink
                                    href={route("profile.show", {
                                        user: user.username,
                                    })}
                                    active={route().current("profile.show")}
                                >
                                    Profile
                                </NavLink>

                                <NavLink
                                    href={route("users.index")}
                                    active={route().current("users.index")}
                                >
                                    Users
                                </NavLink>
                            </div>
                        </div>

                        {/* Search Bar (Dipindah ke sini) */}
                        <div className="flex-1 max-w-xl hidden md:block">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul, deskripsi, atau isi konten..."
                                className="w-full bg-[#0f172a] text-white border border-gray-700 
                                         rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 
                                         focus:ring-2 focus:ring-emerald-500/30 transition-all duration-300
                                         placeholder-gray-500"
                            />
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4">
                            {/* Avatar + Dropdown */}
                            {user?.avatar ? (
                                <img
                                    src={`/storage/${user.avatar}`}
                                    alt={user.name}
                                    className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500"
                                    onError={(e) =>
                                        (e.target.style.display = "none")
                                    }
                                />
                            ) : (
                                <div className="w-9 h-9 bg-slate-600 rounded-full flex items-center justify-center text-xl">
                                    👤
                                </div>
                            )}

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 text-white hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors">
                                        <span>{user.name}</span>
                                        <span className="text-gray-400 text-sm">
                                            ▼
                                        </span>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right">
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Edit Profile
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

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        !showingNavigationDropdown,
                                    )
                                }
                                className="md:hidden p-2 rounded-xl hover:bg-slate-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={
                                            showingNavigationDropdown
                                                ? "M6 18L18 6M6 6h12v12"
                                                : "M4 6h16M4 12h16M4 18h16"
                                        }
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {showingNavigationDropdown && (
                    <div className="md:hidden bg-[#1e2937] border-b border-slate-700 py-4 px-6 space-y-3">
                        {/* Responsive links */}
                    </div>
                )}

                {/* Header */}
                {header && (
                    <header className="bg-[#1e2937] border-b border-slate-700 py-6">
                        <div className="max-w-7xl mx-auto px-6">{header}</div>
                    </header>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-6 bg-[#0f172a]">
                    {children}
                </main>
            </div>
        </div>
    );
}
