import React from "react";
import { usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function DashFriends() {
    const {
        auth,
        following = [],
        followers = [],
        contents = [],
    } = usePage().props;

    // Filter konten hanya dari user yang di-follow
    const displayedContents =
        following && following.length > 0
            ? contents.filter((content) =>
                  following.some(
                      (f) =>
                          f.id === content.user_id || f.id === content.user?.id,
                  ),
              )
            : contents;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Welcome back,{" "}
                                <span className="text-emerald-400">
                                    {auth?.user?.username || auth?.user?.name}
                                </span>
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Kelola konten kamu dengan mudah
                            </p>
                        </div>

                        {/* Stats Following & Followers */}
                        <div className="flex gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-emerald-400">
                                    {following.length}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Following
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-emerald-400">
                                    {followers.length}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Followers
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white">
                            Konten yang Difollow
                            {displayedContents.length > 0 && (
                                <span className="text-emerald-400">
                                    {" "}
                                    ({displayedContents.length})
                                </span>
                            )}
                        </h3>
                    </div>

                    {/* Content Grid */}
                    {displayedContents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                            {displayedContents.map((content) => (
                                <div
                                    key={content.slug}
                                    className="group bg-[#1E2937] border border-gray-700 rounded-3xl p-6 
                                             hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 
                                             transition-all duration-300 cursor-pointer"
                                    onClick={() =>
                                        (window.location.href = route(
                                            "content.show",
                                            content.slug,
                                        ))
                                    }
                                >
                                    <h4 className="font-semibold text-lg text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                        {content.title}
                                    </h4>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {content.description ||
                                            "Tidak ada deskripsi"}
                                    </p>

                                    <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-gray-700">
                                        <div className="text-emerald-400 font-medium">
                                            {content.category?.name ||
                                                "Uncategorized"}
                                        </div>
                                        <div className="text-gray-500">
                                            {new Date(
                                                content.created_at,
                                            ).toLocaleDateString("id-ID")}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 mt-2">
                                        Oleh{" "}
                                        {content.user?.name ||
                                            "Tidak diketahui"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#1E2937] border border-gray-700 rounded-3xl py-20 text-center">
                            <p className="text-gray-400 text-lg">
                                {following.length > 0
                                    ? "Belum ada konten dari akun yang kamu ikuti."
                                    : "Belum ada konten yang dibuat."}
                            </p>
                            {following.length === 0 && (
                                <p className="text-gray-500 text-sm mt-3">
                                    Mulai ikuti akun lain untuk melihat konten
                                    mereka di sini.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
