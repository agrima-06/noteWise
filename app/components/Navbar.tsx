export default function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-black">
          N
        </div>

        <span className="text-lg font-semibold tracking-tight">
          NoteWise AI
        </span>
      </div>

      <div className="hidden items-center gap-6 text-sm text-gray-400 sm:flex">
        <span>AI Notes</span>
        <span>Simple. Smart. Clear.</span>
      </div>
    </nav>
  );
}