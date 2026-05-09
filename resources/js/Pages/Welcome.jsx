import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" className="bg-gray-100" />
            <div>
                <header className="flex items-center justify-between bg-blue-100 px-6 py-4">
                    <a className="justify-start text-lg font-bold" href="#">
                        ProgrammerSukses
                    </a>
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                <main className="mt-6 mb-6 px-6 py-4">
                    <div className="container container h-full py-24 content-center mx-auto max-w-4xl text-center">
                        <h1 className="text-3xl font-bold">
                            Welcome to ProgrammerSukses
                        </h1>
                        <p className="mt-4">
                            Join our community of developers and start your
                            journey to becoming a better programmer!
                        </p>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 p-4">
                            <h2 className="text-2xl font-bold">Learn</h2>
                            <p className="mt-2">
                                Access a wide range of tutorials, articles, and
                                resources to enhance your programming skills.
                            </p>
                        </div>
                        <div className="w-1/2 p-4">
                            <h2 className="text-2xl font-bold">Connect</h2>
                            <p className="mt-2">
                                Join discussions, ask questions, and connect
                                with other developers in our vibrant community.
                            </p>
                        </div>
                    </div>
                </main>

                <footer className="mt-6 px-6 py-4 text-center text-sm text-gray-500">
                    <p>&copy; 2023 ProgrammerSukses. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
