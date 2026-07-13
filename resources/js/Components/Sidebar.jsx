import React from "react";
import {
    Home,
    Users,
    FolderOpen,
    Calendar,
    FileText,
    BarChart3,
    PencilIcon,
    BookAIcon,
    BookCopy,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = ({ user, isAdmin }) => {
    const { url } = usePage();

    return (
        <div className="h-screen w-64 bg-[#0f172a] text-slate-300 flex flex-col border-r border-slate-700 fixed">
            {/* Logo */}
            <div className="p-6 flex items-center border-slate-700">
                <span className="text-lg font-semibold text-white">
                    mindfeed.
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        url === "{{ route('dashboard') }}"
                            ? "bg-slate-800 text-white"
                            : "hover:bg-slate-800/50"
                    }`}
                >
                    <Home size={20} />
                    <span>for your page</span>
                </Link>

                <Link
                    href={route("dashboard.friends")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        url.startsWith("/dashboard/friends")
                            ? "bg-slate-800 text-white"
                            : "hover:bg-slate-800/50"
                    }`}
                >
                    <Users size={20} />
                    <span>friends</span>
                </Link>

                <Link
                    href={route("mycontent.create")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        url.startsWith("/mycontent/create")
                            ? "bg-slate-800 text-white"
                            : "hover:bg-slate-800/50"
                    }`}
                >
                    <PencilIcon size={20} />
                    <span>create a post</span>
                </Link>

                <Link
                    href={route("mycontent.index")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        url.startsWith("/mycontent/index")
                            ? "bg-slate-800 text-white"
                            : "hover:bg-slate-800/50"
                    }`}
                >
                    <BookCopy size={20} />
                    <span>my content</span>
                </Link>

                <Link
                    href={route("notes.index")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        url.startsWith("/notes")
                            ? "bg-slate-800 text-white"
                            : "hover:bg-slate-800/50"
                    }`}
                >
                    <FileText size={20} />
                    <span>notes</span>
                </Link>

                {/* <Link
                    href="/reports"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        url.startsWith("/reports")
                            ? "bg-slate-800 text-white"
                            : "hover:bg-slate-800/50"
                    }`}
                >
                    <BarChart3 size={20} />
                    <span>reports</span>
                </Link> */}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-700">
                <div className="text-xs text-slate-500 px-4 mb-2">
                    Your teams
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        H
                    </div>
                    <div>
                        <p className="text-sm font-medium">Heroicons</p>
                        <p className="text-xs text-slate-500">
                            Team • 8 members
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
