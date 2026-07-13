import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import GoBack from "@/Components/goBack";

export default function Following() {
    const { user, following } = usePage().props;
    return (
        <AuthenticatedLayout>
            <h2 className="text-2xl font-semibold text-gray-200 mb-6">
                Following
            </h2>
            <GoBack />
            {following && following.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {following.map((followed) => (
                        <Link
                            key={followed.id}
                            href={`/profile/${followed.username}`}
                            className="flex items-center gap-4 bg-warm-black border border-gray-700 hover:border-gray-600 rounded-xl p-4 transition"
                        >
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0">
                                {followed.avatar ? (
                                    <img
                                        src={`/storage/${followed.avatar}`}
                                        alt={followed.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl">
                                        👤
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-white">
                                    {followed.name}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    @{followed.username}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500">
                    Belum ada followers.
                </div>
            )}
        </AuthenticatedLayout>
    );
}
