import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status, user }) {
    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.get("/dashboard");
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Pengaturan Profil
                </h2>
            }
        >
            <Head title="Pengaturan Profil" />

            <div className="py-12  min-h-screen">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile Information */}
                    <div className="bg-warm-black border border-gray-700 shadow-xl sm:rounded-3xl p-6 sm:p-8">
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={goBack}
                                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition"
                            >
                                ← Kembali
                            </button>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            user={user}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Update Password */}
                    <div className="bg-warm-black border border-gray-700 shadow-xl sm:rounded-3xl p-6 sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Delete Account */}
                    <div className="bg-warm-black border border-gray-700 shadow-xl sm:rounded-3xl p-6 sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
