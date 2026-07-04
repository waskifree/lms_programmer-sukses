import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage, Link, router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        paragraph: "",
        type: "text",
        category_id: "",
        image: null,
        slug: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("content.store"), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Konten" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6">
                        Tambah Konten Baru
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-sm rounded-lg p-6"
                    >
                        {/* Title */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Judul Konten
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2 h-24"
                            />
                        </div>

                        {/* Paragraph / Isi Konten */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Isi Konten
                            </label>
                            <textarea
                                value={data.paragraph}
                                onChange={(e) =>
                                    setData("paragraph", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2 h-48"
                            />
                        </div>

                        {/* Type */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Kategori
                            </label>
                            <select
                                value={data.category_id || ""} // tambahkan || ''
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2"
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
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                Simpan Konten
                            </button>
                            <Link
                                href="/content"
                                className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400"
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
