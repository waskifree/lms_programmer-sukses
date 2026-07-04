import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage, Link, router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function Create({}) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("category.store"), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kategori" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6">
                        Tambah Kategori Baru
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-sm rounded-lg p-6"
                    >
                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Nama Kategori
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                Simpan Kategori
                            </button>
                            <Link
                                href="/category"
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
