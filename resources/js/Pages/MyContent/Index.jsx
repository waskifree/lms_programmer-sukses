import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Index() {
    const { contents, flash, auth } = usePage().props;
    const { filters = {} } = usePage().props; // ← Tambahkan filters dengan default
    const [search, setSearch] = useState(filters.search || "");

    const handleDelete = (slug) => {
        if (confirm("Are you sure you want to delete this content?")) {
            router.delete(route("mycontent.destroy", slug));
        }
    };
    // Debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                "/mycontent",
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 300); // 300ms debounce

        return () => clearTimeout(timeout);
    }, [search]);
    return (
        <AuthenticatedLayout>
            <Head title="Daftar Content" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            All Contents
                        </h2>
                        <Link
                            href={route("mycontent.create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                        >
                            + Create New Content
                        </Link>
                    </div>

                    {flash?.success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {flash.success}
                        </div>
                    )}

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

                    <div className="bg-warm-black shadow-sm rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-warm-black">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Judul
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        deskripsi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Likes
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-warm-black divide-y divide-gray-200">
                                {contents.map((content) => (
                                    <tr key={content.slug}>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">
                                                {content.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {content.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {content.category?.name ||
                                                "No Category"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {content.likes}
                                        </td>
                                        <td className="px-6 py-4 text-center space-x-3">
                                            <Link
                                                href={route(
                                                    "mycontent.show",
                                                    content.slug,
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Show
                                            </Link>
                                            <Link
                                                href={route(
                                                    "mycontent.edit",
                                                    content.slug,
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(content.slug)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
