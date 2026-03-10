export default function Footer() {
    return (
        <footer className="shrink-0 border-t border-white/[.04] bg-dark-900/60 backdrop-blur px-7 py-2 flex items-center gap-6 text-[10px] text-gray-600">
            <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-400 inline-block"></span>Encrypted
            </span>
            <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-wifi text-[8px]"></i> Connected
            </span>
            <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-microchip text-[8px]"></i> SCADA v4.2.1
            </span>
            <span className="ml-auto">
                <i className="fa-regular fa-clock text-[8px]"></i> Uptime: <span className="text-gray-400 font-mono">99.97%</span>
            </span>
        </footer>
    );
}
