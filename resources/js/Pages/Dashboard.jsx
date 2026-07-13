import React, { useState, useMemo } from "react";
import { usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
    const { auth, contents = [] } = usePage().props;
    const [activeFilter, setActiveFilter] = useState("all");

    // Helper Badge
    const getVisibilityBadge = (visibility) => {
        switch (visibility) {
            case "public":
                return {
                    label: "Public",
                    class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                    icon: "🌍",
                };
            case "followers":
                return {
                    label: "Followers",
                    class: "bg-blue-500/10 text-blue-400 border-blue-500/30",
                    icon: "👥",
                };
            case "private":
                return {
                    label: "Private",
                    class: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                    icon: "🔒",
                };
            default:
                return {
                    label: "Public",
                    class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                    icon: "🌍",
                };
        }
    };

    // Filter Contents
    const filteredContents = useMemo(() => {
        if (activeFilter === "all") return contents;
        return contents.filter(
            (content) => content.visibility === activeFilter,
        );
    }, [contents, activeFilter]);

    const filterButtons = [
        { key: "all", label: "Semua", count: contents.length },
        {
            key: "public",
            label: "Public",
            count: contents.filter((c) => c.visibility === "public").length,
        },
        {
            key: "followers",
            label: "Followers",
            count: contents.filter((c) => c.visibility === "followers").length,
        },
        {
            key: "private",
            label: "Private",
            count: contents.filter((c) => c.visibility === "private").length,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Welcome back,{" "}
                                <span className="text-emerald-400">
                                    {auth?.user?.username || auth?.user?.name}
                                </span>
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Kelola konten kamu dengan mudah
                            </p>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-2">
                        {filterButtons.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all flex items-center gap-2 ${
                                    activeFilter === filter.key
                                        ? "bg-white text-black"
                                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                }`}
                            >
                                {filter.label}
                                <span className="text-xs px-2 py-0.5 bg-gray-700 rounded-full">
                                    {filter.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Content Grid */}
                    {filteredContents.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredContents.map((content) => {
                                const badge = getVisibilityBadge(
                                    content.visibility,
                                );
                                return (
                                    <div
                                        key={content.slug}
                                        className="group bg-[#1E2937] border border-gray-700 rounded-3xl p-6 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
                                        onClick={() =>
                                            (window.location.href = route(
                                                "content.show",
                                                content.slug,
                                            ))
                                        }
                                    >
                                        {/* Visibility + Date */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${badge.class}`}
                                            >
                                                <span>{badge.icon}</span>
                                                {badge.label}
                                            </div>

                                            <div className="text-xs text-gray-500">
                                                {new Date(
                                                    content.created_at,
                                                ).toLocaleDateString("id-ID")}
                                            </div>
                                        </div>

                                        <h4 className="font-semibold text-lg text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                            {content.title}
                                        </h4>

                                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                            {content.description ||
                                                "Tidak ada deskripsi"}
                                        </p>

                                        <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-gray-700">
                                            <div className="text-emerald-400 font-medium">
                                                {content.category?.name ||
                                                    "Uncategorized"}
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500 mt-2">
                                            Oleh{" "}
                                            {content.user?.name ||
                                                "Tidak diketahui"}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-[#1E2937] border border-gray-700 rounded-3xl py-20 text-center">
                            <p className="text-gray-400 text-lg">
                                {activeFilter === "all"
                                    ? "Belum ada konten yang dibuat."
                                    : `Tidak ada konten dengan visibilitas ${activeFilter}.`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
