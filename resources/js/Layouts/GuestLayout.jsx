import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex items-center justify-center bg-[#222831] px-4 flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div>
                {/* <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link> */}
            </div>

            <div className="mt-6 w-full overflow-hidden bg-[#313647]  px-6 py-6 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
