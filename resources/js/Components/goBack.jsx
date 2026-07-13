export default function GoBack({ className = "", children, ...props }) {
    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.get("/dashboard");
        }
    };
    return (
        <button
            onClick={goBack}
            className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 m-4 rounded-xl transition"
        >
            Kembali
        </button>
    );
}
