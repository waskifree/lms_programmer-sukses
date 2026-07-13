import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show() {
    const { user, contents, isOwnProfile, auth } = usePage().props;

    const handleToggleFollow = () => {
        router.post(
            `/profile/${user.username}/toggle-follow`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                // Tidak perlu onSuccess khusus karena pakai back()
            },
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Profil ${user.name}`} />

            <div className="py-6">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Profil Header */}
                    <div className="bg-warm-black shadow-sm rounded-2xl p-8 mb-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl shadow overflow-hidden">
                                    {user.avatar ? (
                                        <img
                                            src={`/storage/${user.avatar}`}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        "👤"
                                    )}
                                </div>

                                <div className="text-center md:text-left">
                                    <h1 className="text-3xl font-bold text-white">
                                        {user.name}
                                    </h1>
                                    <p className="text-gray-400 mt-1">
                                        {user.email}
                                    </p>

                                    {/* Stats Followers */}
                                    <div className="flex gap-6 mt-4 text-sm">
                                        <div>
                                            <span
                                                className="font-semibold text-white text-lg"
                                                href={`/profile/${user.username}/followers`}
                                            >
                                                {user.followers_count || 0}
                                            </span>
                                            <a
                                                className="text-gray-400 ml-1"
                                                href={`/profile/${user.username}/followers`}
                                            >
                                                Followers
                                            </a>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white text-lg">
                                                {user.following_count || 0}
                                            </span>
                                            <a
                                                className="text-gray-400 ml-1"
                                                href={`/profile/${user.username}/following`}
                                            >
                                                Following
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Follow Button */}
                            {!isOwnProfile && auth?.user && (
                                <button
                                    onClick={handleToggleFollow}
                                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 text-sm uppercase tracking-wider ${
                                        user.is_following
                                            ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                                            : "bg-white hover:bg-gray-100 text-black"
                                    }`}
                                >
                                    {user.is_following
                                        ? "✓ Following"
                                        : "Follow"}
                                </button>
                            )}

                            {isOwnProfile && (
                                <Link
                                    href="/profile"
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition"
                                >
                                    ✏️ Edit Profil
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Daftar Konten */}
                    <div className="shadow-sm rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-200">
                                Konten {user.name} ({contents.length})
                            </h2>
                        </div>

                        {contents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {contents.map((content) => (
                                    <div
                                        key={content.id}
                                        className="bg-warm-black border border-gray-700 rounded-xl p-5 hover:shadow-lg transition cursor-pointer"
                                        onClick={() =>
                                            (window.location.href = route(
                                                "content.show",
                                                content.slug,
                                            ))
                                        }
                                    >
                                        <h3 className="text-white font-semibold text-lg leading-tight mb-3 line-clamp-2">
                                            {content.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                            {content.description ||
                                                "Tidak ada deskripsi"}
                                        </p>
                                        {content.category && (
                                            <span className="inline-block text-xs bg-blue-900 text-blue-300 px-3 py-1 rounded-full">
                                                {content.category.name}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                {user.name} belum membuat konten apapun.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
