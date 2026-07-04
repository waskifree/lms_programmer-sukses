import { useForm, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ categories, category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("category.update", category.slug));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit: ${category.name}`} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6">Edit Category</h2>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-sm rounded-lg p-6 space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Kategori
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
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
