import ComponentCard from "../../common/ComponentCard";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import PageMeta from "../../common/PageMeta";
import Button from "../button/Button";
import { BoxIcon } from "../../../icons";

export default function Buttons() {
  return (
    <div>
      <PageMeta
        title="Buttons | StudyCafe Admin"
        description="Button components for StudyCafe Admin - studycafe.in management console"
      />
      <PageBreadcrumb pageTitle="Buttons" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Primary Button">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary">Button Text</Button>
            <Button size="md" variant="primary">Button Text</Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Primary Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" startIcon={<BoxIcon className="size-5" />}>Button Text</Button>
            <Button size="md" variant="primary" startIcon={<BoxIcon className="size-5" />}>Button Text</Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Primary Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" endIcon={<BoxIcon className="size-5" />}>Button Text</Button>
            <Button size="md" variant="primary" endIcon={<BoxIcon className="size-5" />}>Button Text</Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Secondary Button">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline">Button Text</Button>
            <Button size="md" variant="outline">Button Text</Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Outline Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" startIcon={<BoxIcon className="size-5" />}>Button Text</Button>
            <Button size="md" variant="outline" startIcon={<BoxIcon className="size-5" />}>Button Text</Button>
          </div>
        </ComponentCard>{" "}
        <ComponentCard title="Outline Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" endIcon={<BoxIcon className="size-5" />}>Button Text</Button>
            <Button size="md" variant="outline" endIcon={<BoxIcon className="size-5" />}>Button Text</Button>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
