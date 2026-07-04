import { usePage, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Dashboard() {
    const { auth, contents = [] } = usePage().props;
    const { filters = {} } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                "/dashboard",
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div
                className="min-h-screen py-8"
                style={{ backgroundColor: "#313647" }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Welcome back,{" "}
                                <span className="text-emerald-400">
                                    {auth?.user?.username}
                                </span>
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Kelola konten kamu dengan mudah
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul, deskripsi, atau isi konten..."
                            className="w-full bg-warm-black text-white border border-gray-700 
                                     rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 
                                     focus:ring-2 focus:ring-emerald-500/30 transition-all duration-300
                                     placeholder-gray-500"
                        />
                    </div>

                    {/* Title */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white">
                            Semua Konten
                            {search && (
                                <span className="text-emerald-400">
                                    {" "}
                                    ({contents.length} ditemukan)
                                </span>
                            )}
                        </h3>
                    </div>

                    {/* Content Grid */}
                    {contents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contents.map((content) => (
                                <div
                                    key={content.slug}
                                    className="group bg-[#1E2937] border border-gray-700 rounded-3xl p-6 
                                             hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 
                                             transition-all duration-300 cursor-pointer"
                                    onClick={() =>
                                        (window.location.href = route(
                                            "content.show",
                                            content.slug,
                                        ))
                                    }
                                >
                                    <h4 className="font-semibold text-lg text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                        {content.title}
                                    </h4>

                                    <p className="font-semibold text-lg text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                        {content.description ||
                                            "Tidak ada deskripsi"}
                                    </p>

                                    <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-gray-700">
                                        <div className="text-emerald-400 font-medium">
                                            {content.category?.name ||
                                                "Uncategorized"}
                                        </div>
                                        <div className="text-gray-500">
                                            {new Date(
                                                content.created_at,
                                            ).toLocaleDateString("id-ID")}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 mt-2">
                                        Oleh{" "}
                                        {content.user?.name ||
                                            "Tidak diketahui"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#1E2937] border border-gray-700 rounded-3xl py-20 text-center">
                            <p className="text-gray-400 text-lg">
                                Belum ada konten yang dibuat.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
