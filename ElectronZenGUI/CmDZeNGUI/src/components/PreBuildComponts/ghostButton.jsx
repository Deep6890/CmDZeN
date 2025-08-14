function GhostButton({ label = "Sign up", onClick }) {  // ← Add onClick parameter
    return (
        <button
            onClick={onClick}  // ← Add this line!
            className="
                w-24 h-9
                bg-transparent 
                border border-gray 
                text-white 
                rounded-md 
                transition-all duration-300 
                hover:bg-purple-900 hover:text-white
                active:scale-95
            "
        >
            {label}
        </button>
    );
}

export default GhostButton;