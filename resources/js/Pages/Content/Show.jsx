import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function Show() {
    const { content, auth } = usePage().props;
    const [newComment, setNewComment] = useState("");
    const { data, setData, post } = useForm({
        like: false,
        comment: "",
    });

    // Proteksi jika content belum load
    if (!content) {
        return (
            <AuthenticatedLayout>
                <div className="p-10 text-center">Loading konten...</div>
            </AuthenticatedLayout>
        );
    }
    const handleLike = () => {
        router.post(route("content.like", content.slug), {
            like: true,
        });
    };
    const handleComment = (e) => {
        e.preventDefault();

        console.log("Mengirim komentar:", newComment);
        console.log("URL:", route("content.comment", content.slug));

        if (!newComment.trim()) {
            alert("Komentar tidak boleh kosong");
            return;
        }

        setData("comment", newComment);

        post(route("content.comment", content.slug), {
            preserveScroll: true,

            onSuccess: () => {
                setNewComment("");
                router.reload({ only: ["content"] });
            },

            onError: (errors) => {
                console.error(errors);
            },
        });
    };

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
            <Head title={content.title} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 ">
                    <div className=" bg-white shadow-sm rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {content.title}
                            </h1>
                            <div className="flex gap-3">
                                {auth?.user?.isAdmin && (
                                    <Link
                                        href={`/content/${content.slug}/edit`}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                    >
                                        Edit
                                    </Link>
                                )}
                                <button
                                    onClick={goBack}
                                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>

                        {/* Likes */}
                        <div className="px-6 py-4 border-b flex items-center gap-3">
                            <button
                                onClick={handleLike}
                                className="text-3xl hover:scale-110 active:scale-95 transition"
                            >
                                ❤️
                            </button>
                            <span className="text-2xl font-semibold">
                                {content.likes || 0}
                            </span>
                        </div>

                        {/* Konten Detail */}
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">
                                    Kategori
                                </h3>
                                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {content.category?.name || "-"}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    Isi Konten
                                </h3>
                                <div className="prose max-w-none border rounded-lg p-6 bg-gray-50">
                                    {content.paragraph}
                                </div>
                            </div>

                            {content.image && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                                        Gambar
                                    </h3>
                                    <img
                                        src={`/storage/${content.image}`}
                                        alt={content.title}
                                        className="max-w-full rounded-lg shadow"
                                    />
                                </div>
                            )}

                            {/* Komentar Section */}
                            <div className="pt-8 border-t">
                                <h3 className="text-xl font-semibold mb-4">
                                    💬 Komentar ({content.comments?.length || 0}
                                    )
                                </h3>

                                {/* Form Komentar */}
                                <form onSubmit={handleComment} className="mb-6">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) =>
                                            setNewComment(e.target.value)
                                        }
                                        className="w-full border rounded-lg p-4"
                                        rows="3"
                                        placeholder="Tulis komentar anda..."
                                    />
                                    <button
                                        type="submit"
                                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                                    >
                                        Kirim Komentar
                                    </button>
                                </form>

                                {/* List Komentar */}
                                <div className="space-y-6">
                                    {content.comments &&
                                    content.comments.length > 0 ? (
                                        content.comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                className="border-l-4 border-gray-300 pl-4 py-1"
                                            >
                                                <div className="font-medium text-gray-800">
                                                    {comment.user?.name}
                                                </div>
                                                <p className="text-gray-700 mt-1">
                                                    {comment.comment}
                                                </p>
                                                <small className="text-gray-500">
                                                    {new Date(
                                                        comment.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                    )}
                                                </small>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic">
                                            Belum ada komentar.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
