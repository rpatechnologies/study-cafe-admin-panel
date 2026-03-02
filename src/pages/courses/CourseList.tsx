import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { CoursesTable } from "../../components/tables";

export default function CourseList() {
  return (
    <>
      <PageMeta title="Courses | StudyCafe Admin" description="Manage courses" />
      <PageBreadcrumb
        pageTitle="Courses"
        actions={
          <Link
            to="/courses/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          >
            Create Course
          </Link>
        }
      />
      <div className="space-y-6">
        <CoursesTable />
      </div>
    </>
  );
}
