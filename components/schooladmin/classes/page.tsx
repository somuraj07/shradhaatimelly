import CreateClassForm from "@/components/ui/SchoolAdminClassForm";

export default function SchoolAdminClassesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Create New Class
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Add a new class to your school management system
      </p>

      <div className="max-w-xl mx-auto">
        <CreateClassForm />
      </div>
    </div>
  );
}
