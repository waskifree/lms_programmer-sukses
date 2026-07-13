import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";

export default function Index({ users }) {
    const { filters = {} } = usePage().props; // ← Tambahkan filters dengan default
    const [search, setSearch] = useState(filters.search || "");

    // Debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                "/users",
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
            <Head title="Cari User" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" shadow-sm rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-white">
                            Cari User
                        </h2>

                        {/* Search Input */}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.data.map((user) => (
                                <Link
                                    key={user.id}
                                    href={route("profile.show", user.username)}
                                    className="block bg-[#1E2937] border border-gray-700 rounded-3xl p-6 
                                             hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 
                                             transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        {user.avatar ? (
                                            <img
                                                src={`/storage/${user.avatar}`}
                                                alt={user.name}
                                                className="w-9 h-9 rounded-full object-cover "
                                            />
                                        ) : (
                                            "👤"
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-xl text-white">
                                                {user.name}
                                            </h3>
                                            <p className="text-gray-200 text-sm mt-1">
                                                @{user.username}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {users.data.length === 0 && (
                            <div className="text-center py-16 text-gray-500">
                                Tidak ada user ditemukan dengan kata kunci "
                                {search}"
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
