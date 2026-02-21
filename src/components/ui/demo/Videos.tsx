import ComponentCard from "../../common/ComponentCard";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import PageMeta from "../../common/PageMeta";
import FourIsToThree from "../videos/FourIsToThree";
import OneIsToOne from "../videos/OneIsToOne";
import SixteenIsToNine from "../videos/SixteenIsToNine";
import TwentyOneIsToNine from "../videos/TwentyOneIsToNine";

export default function Videos() {
  return (
    <>
      <PageMeta
        title="Videos | StudyCafe Admin"
        description="Video components for StudyCafe Admin - studycafe.in management console"
      />
      <PageBreadcrumb pageTitle="Videos" />
      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
        <div className="space-y-5 sm:space-y-6">
          <ComponentCard title="Video Ratio 16:9">
            <SixteenIsToNine />
          </ComponentCard>
          <ComponentCard title="Video Ratio 4:3">
            <FourIsToThree />
          </ComponentCard>
        </div>
        <div className="space-y-5 sm:space-y-6">
          <ComponentCard title="Video Ratio 21:9">
            <TwentyOneIsToNine />
          </ComponentCard>
          <ComponentCard title="Video Ratio 1:1">
            <OneIsToOne />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
