import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        paragraph: "",
        type: "text",
        image: null,
        category_id: "",
        slug: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("mycontent.store"), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Konten Baru" />

            <div className="py-10 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white">
                                Tambah Konten Baru
                            </h2>
                            <p className="text-gray-400 mt-1">
                                Buat dan publikasikan konten baru Anda
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-warm-black border border-gray-800 shadow-2xl rounded-3xl p-8"
                    >
                        {/* Title */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Judul Konten
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full bg-gray-900 border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 text-white rounded-2xl px-6 py-4 transition-all placeholder-gray-400"
                                placeholder="Masukkan judul konten..."
                            />
                            {errors.title && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Deskripsi Singkat
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full bg-gray-900 border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 text-white rounded-2xl px-6 py-4 h-28 transition-all placeholder-gray-400"
                                placeholder="Deskripsi singkat tentang konten..."
                            />
                            {errors.description && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Paragraph / Isi Konten */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Isi Konten
                            </label>
                            <textarea
                                value={data.paragraph}
                                onChange={(e) =>
                                    setData("paragraph", e.target.value)
                                }
                                className="w-full bg-gray-900 border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 text-white rounded-2xl px-6 py-4 h-56 transition-all placeholder-gray-400"
                                placeholder="Tulis isi konten lengkap di sini..."
                            />
                            {errors.paragraph && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.paragraph}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Kategori
                            </label>
                            <select
                                value={data.category_id || ""}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="w-full bg-gray-900 border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 text-white rounded-2xl px-6 py-4 transition-all"
                                required
                            >
                                <option value="">-- Pilih Kategori --</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:text-gray-400 text-white font-semibold px-8 py-3.5 rounded-2xl transition flex-1"
                            >
                                {processing ? "Menyimpan..." : "Simpan Konten"}
                            </button>

                            <Link
                                href="/mycontent"
                                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold px-8 py-3.5 rounded-2xl transition text-center flex-1"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
