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
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6">Edit Konten</h2>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-sm rounded-lg p-6 space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Judul Konten
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Isi Konten
                            </label>
                            <textarea
                                value={data.paragraph}
                                onChange={(e) =>
                                    setData("paragraph", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-48"
                            />
                            {errors.paragraph && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.paragraph}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kategori
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                Simpan Konten
                            </button>

                            <Link
                                href="/content"
                                className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg transition"
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
