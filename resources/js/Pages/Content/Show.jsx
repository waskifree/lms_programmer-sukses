import React, { useState } from "react";
import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GoBack from "@/Components/goBack";

export default function Show() {
    const { content, auth } = usePage().props;
    const [newComment, setNewComment] = useState("");

    const { data, setData, post } = useForm({
        comment: "",
    });

    if (!content) {
        return (
            <AuthenticatedLayout>
                <div className="p-10 text-center text-gray-400">
                    Loading konten...
                </div>
            </AuthenticatedLayout>
        );
    }

    const handleLike = () => {
        router.post(route("content.like", content.slug), { like: true });
    };

    const handleComment = (e) => {
        e.preventDefault();
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
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={content.title} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="bg-[#1e2937] border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-700 flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-white">
                                {content.title}
                            </h1>
                            <div className="flex gap-3">
                                {auth?.user?.isAdmin && (
                                    <Link
                                        href={`/content/${content.slug}/edit`}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition"
                                    >
                                        Edit
                                    </Link>
                                )}
                                <GoBack />
                            </div>
                        </div>

                        {/* Likes */}
                        <div className="px-8 py-5 border-b border-slate-700 flex items-center gap-4">
                            <button
                                onClick={handleLike}
                                className="text-4xl hover:scale-110 active:scale-95 transition-transform"
                            >
                                ❤️
                            </button>
                            <span className="text-3xl font-semibold text-white">
                                {content.likes || 0}
                            </span>
                        </div>

                        {/* Konten Detail */}
                        <div className="p-8 space-y-8">
                            {/* Kategori */}
                            <div>
                                <h3 className="text-sm font-medium text-slate-400 mb-2">
                                    Kategori
                                </h3>
                                <span className="inline-block bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                                    {content.category?.name || "Uncategorized"}
                                </span>
                            </div>

                            {/* Isi Konten */}
                            <div>
                                <h3 className="text-sm font-medium text-slate-400 mb-3">
                                    Isi Konten
                                </h3>
                                <div className="prose prose-invert max-w-none bg-[#0f172a] border border-slate-700 rounded-2xl p-8 text-slate-200 leading-relaxed">
                                    {content.paragraph}
                                </div>
                            </div>

                            {/* Gambar */}
                            {content.image && (
                                <div>
                                    <h3 className="text-sm font-medium text-slate-400 mb-3">
                                        Gambar
                                    </h3>
                                    <img
                                        src={`/storage/${content.image}`}
                                        alt={content.title}
                                        className="max-w-full rounded-2xl shadow-2xl border border-slate-700"
                                    />
                                </div>
                            )}

                            {/* Komentar Section */}
                            <div className="pt-8 border-t border-slate-700">
                                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                                    💬 Komentar
                                    <span className="text-slate-400 text-lg">
                                        ({content.comments?.length || 0})
                                    </span>
                                </h3>

                                {/* Form Komentar */}
                                <form onSubmit={handleComment} className="mb-8">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) =>
                                            setNewComment(e.target.value)
                                        }
                                        className="w-full bg-[#0f172a] border border-slate-600 rounded-2xl p-5 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                                        rows="4"
                                        placeholder="Tulis komentar anda..."
                                    />
                                    <button
                                        type="submit"
                                        className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold transition"
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
                                                className="bg-[#0f172a] border border-slate-700 rounded-2xl p-6"
                                            >
                                                <div className="font-semibold text-white">
                                                    {comment.user?.name}
                                                </div>
                                                <p className="text-slate-300 mt-2 leading-relaxed">
                                                    {comment.comment}
                                                </p>
                                                <small className="text-slate-500 mt-3 block">
                                                    {new Date(
                                                        comment.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                    )}
                                                </small>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 italic text-center py-10">
                                            Belum ada komentar. Jadilah yang
                                            pertama!
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
