import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ contents }) {
    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.get("/mycontent");
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={contents.title} />

            <div className="py-10 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-900 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-gray-700 flex justify-between items-center bg-warm-black">
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                {contents.title}
                            </h1>
                            <div className="flex gap-3">
                                <Link
                                    href={`/mycontent/${contents.slug}/edit`}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl transition font-medium"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={goBack}
                                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-5 py-2.5 rounded-2xl transition font-medium"
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>

                        {/* Konten Detail */}
                        <div className="p-8 space-y-8 bg-warm-black">
                            {/* Deskripsi */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">
                                    Deskripsi
                                </h3>
                                <p className="text-gray-200 leading-relaxed">
                                    {contents.description ||
                                        "Tidak ada deskripsi"}
                                </p>
                            </div>

                            {/* Kategori */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">
                                    Kategori
                                </h3>
                                <span className="inline-block bg-gray-900 text-emerald-400 px-4 py-1.5 rounded-2xl text-sm font-medium">
                                    {contents.category?.name || "Uncategorized"}
                                </span>
                            </div>

                            {/* Isi Konten */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-3">
                                    Isi Konten
                                </h3>
                                <div className="prose prose-invert max-w-none bg-gray-900 border border-gray-700 rounded-2xl p-8 text-gray-200 leading-relaxed">
                                    {contents.paragraph}
                                </div>
                            </div>

                            {/* Gambar */}
                            {contents.image && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-3">
                                        Gambar
                                    </h3>
                                    <img
                                        src={`/storage/${contents.image}`}
                                        alt={contents.title}
                                        className="max-w-full rounded-2xl shadow-xl border border-gray-700"
                                    />
                                </div>
                            )}

                            {/* Metadata */}
                            <div className="pt-6 border-t border-gray-700 text-sm text-gray-400">
                                Dibuat pada:{" "}
                                {new Date(
                                    contents.created_at,
                                ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
