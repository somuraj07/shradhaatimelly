export default function TopNavbar() {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-6">
      {/* Search */}
      <div className="w-96 relative">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full bg-gray-100 rounded-full px-5 py-2 text-sm focus:outline-none"
        />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-gray-200" />
        <div className="text-sm">
          <p className="font-medium">Kartheek</p>
          <p className="text-gray-500 text-xs">Super Admin</p>
        </div>
      </div>
    </header>
  );
}
