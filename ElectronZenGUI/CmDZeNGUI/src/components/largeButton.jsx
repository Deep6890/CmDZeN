function LargeButton({ label = "Login", width = "10rem" }) {
    return (
        <button
            className="h-14 bg-[linear-gradient(135deg,#6366F1_0%,#8B5CF6_100%)] rounded-md text-lg"
            style={{ width }}
        >
            {label}
        </button>
    );
}

export default LargeButton;
