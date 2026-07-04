import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ contents }) {
    // Fungsi Kembali Pintar
    const goBack = () => {
        // Cek dari mana user datang
        if (window.history.length > 1) {
            window.history.back(); // Kembali ke halaman sebelumnya
        } else {
            // Fallback jika tidak ada history
            router.get("/content");
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title={contents.title} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {contents.title}
                            </h1>
                            <div className="flex gap-3">
                                <Link
                                    href={`/mycontent/${contents.slug}/edit`}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={goBack}
                                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>

                        {/* Konten Detail */}
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">
                                    Deskripsi
                                </h3>
                                <p className="text-gray-700">
                                    {contents.description || "-"}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">
                                    Kategori
                                </h3>
                                <span className="inline-block    py-1 rounded-full text-sm">
                                    {contents.category?.name || "-"}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    Isi Konten
                                </h3>
                                <div className="prose max-w-none border rounded-lg p-6 bg-gray-50">
                                    {contents.paragraph}
                                </div>
                            </div>

                            {contents.image && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                                        Gambar
                                    </h3>
                                    <img
                                        src={`/storage/${contents.image}`}
                                        alt={contents.title}
                                        className="max-w-full rounded-lg shadow"
                                    />
                                </div>
                            )}

                            <div className="pt-4 border-t text-sm text-gray-500">
                                Dibuat pada:{" "}
                                {new Date(
                                    contents.created_at,
                                ).toLocaleDateString("id-ID")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
