import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    user: userData,
}) {
    const user = userData || usePage().props.auth.user;

    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            name: user.name || "",
            email: user.email || "",
            bio: user.bio || "",
            image: null,
            _method: "PATCH",
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-2xl font-semibold text-white">
                    Informasi Profil
                </h2>
                <p className="mt-2 text-gray-400">
                    Perbarui informasi profil dan email kamu
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-8 space-y-8"
                encType="multipart/form-data"
            >
                {/* Upload Avatar */}
                <div>
                    <InputLabel value="Foto Profil" className="text-white" />
                    <div className="flex items-center gap-5 mt-3">
                        {user.avatar || user.image ? (
                            <img
                                src={`/storage/${user.avatar || user.image}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-700"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center text-5xl border border-gray-700">
                                👤
                            </div>
                        )}

                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer"
                            />
                            <InputError
                                message={errors.image}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Nama */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Nama Lengkap"
                        className="text-white"
                    />
                    <TextInput
                        id="name"
                        className="mt-2 bg-gray-900 border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 text-white"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Bio */}
                <div>
                    <InputLabel
                        htmlFor="bio"
                        value="Bio"
                        className="text-white"
                    />
                    <textarea
                        id="bio"
                        className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 focus:ring-emerald-500/30 resize-y min-h-[120px]"
                        value={data.bio}
                        onChange={(e) => setData("bio", e.target.value)}
                        rows={4}
                    />
                    <InputError message={errors.bio} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="text-white"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-2 bg-gray-900 border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 text-white"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Verify Email */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="text-sm text-amber-400">
                        Email kamu belum diverifikasi.{" "}
                        <Link
                            href={route("verification.send")}
                            method="post"
                            as="button"
                            className="underline hover:text-amber-300"
                        >
                            Kirim ulang email verifikasi
                        </Link>
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        Simpan Perubahan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-400 font-medium">
                            ✓ Berhasil disimpan
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
