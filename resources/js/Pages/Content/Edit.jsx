import { useForm, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ contents, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        title: contents.title || "",
        description: contents.description || "",
        paragraph: contents.paragraph || "",
        category_id: contents.category_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("content.update", contents.slug));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit: ${contents.title}`} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            Edit Konten
                        </h2>
                        <p className="text-slate-400 mt-1">
                            Perbarui informasi konten kamu
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-[#1e2937] border border-slate-700 rounded-3xl p-8 space-y-8 shadow-xl"
                    >
                        {/* Judul */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Judul Konten
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full bg-[#0f172a] border border-slate-600 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                            />
                            {errors.title && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Deskripsi Singkat
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full bg-[#0f172a] border border-slate-600 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition h-28 resize-y"
                            />
                        </div>

                        {/* Isi Konten */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Isi Konten Lengkap
                            </label>
                            <textarea
                                value={data.paragraph}
                                onChange={(e) =>
                                    setData("paragraph", e.target.value)
                                }
                                className="w-full bg-[#0f172a] border border-slate-600 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition h-64 resize-y"
                            />
                            {errors.paragraph && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.paragraph}
                                </p>
                            )}
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Kategori
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="w-full bg-[#0f172a] border border-slate-600 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-slate-700">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 text-white px-8 py-3.5 rounded-2xl font-semibold transition flex-1 sm:flex-none"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>

                            <Link
                                href="/dashboard"
                                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3.5 rounded-2xl font-semibold transition flex-1 sm:flex-none text-center"
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
