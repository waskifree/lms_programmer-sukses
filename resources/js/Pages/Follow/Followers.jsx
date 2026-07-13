import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import GoBack from "@/Components/goBack";

export default function Followers() {
    const { user, followers } = usePage().props;
    return (
        <AuthenticatedLayout>
            <h2 className="text-2xl font-semibold text-gray-200 mb-6">
                Followers
            </h2>
            <GoBack />
            {followers && followers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {followers.map((follower) => (
                        <Link
                            key={follower.id}
                            href={`/profile/${follower.username}`}
                            className="flex items-center gap-4 bg-warm-black border border-gray-700 hover:border-gray-600 rounded-xl p-4 transition"
                        >
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0">
                                {follower.avatar ? (
                                    <img
                                        src={`/storage/${follower.avatar}`}
                                        alt={follower.name}
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
                                    {follower.name}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    @{follower.username}
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
