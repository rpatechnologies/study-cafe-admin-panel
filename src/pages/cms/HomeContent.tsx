import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import TextArea from "../../components/form/input/TextArea";
import ImageUpload from "../../components/form/ImageUpload";

export default function HomeContent() {
  const [hero, setHero] = useState({
    title: "One Stop Solution For CA CS CWA",
    subtitle: "Direct Indirect Tax GST Business News",
    description:
      "One Stop Solution For CA CS CWA Direct Indirect Tax GST Business News",
    ctaText: "View Memberships",
    ctaLink: "/plans",
    imageUrl: "",
    backgroundImageUrl: "",
  });
  const [stats, setStats] = useState({
    students: "12,847",
    courses: "48",
    articles: "2,356",
    others: "1,892",
  });

  const handleSave = () => {
    // TODO: Integrate with API when backend is ready
    console.log("Save", { hero, stats });
  };

  return (
    <>
      <PageMeta
        title="Home Page Content | StudyCafe Admin"
        description="Update hero section and statistics for StudyCafe homepage"
      />
      <PageBreadcrumb pageTitle="Home Page Content" />
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Hero Section
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Main Title</Label>
              <Input
                value={hero.title}
                onChange={(e) =>
                  setHero((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={hero.subtitle}
                onChange={(e) =>
                  setHero((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                placeholder="Enter subtitle"
              />
            </div>
            <div className="col-span-2">
              <Label>Description</Label>
              <TextArea
                rows={2}
                value={hero.description ?? ""}
                onChange={(value) =>
                  setHero((prev) => ({ ...prev, description: value }))
                }
                placeholder="Enter description"
              />
            </div>
            <div>
              <Label>CTA Button Text</Label>
              <Input
                value={hero.ctaText}
                onChange={(e) =>
                  setHero((prev) => ({ ...prev, ctaText: e.target.value }))
                }
                placeholder="e.g. Explore Courses"
              />
            </div>
            <div>
              <Label>CTA Button Link</Label>
              <Input
                value={hero.ctaLink}
                onChange={(e) =>
                  setHero((prev) => ({ ...prev, ctaLink: e.target.value }))
                }
                placeholder="/courses"
              />
            </div>
            <div>
              <Label>Hero background image</Label>

              <ImageUpload
                value={hero.imageUrl ?? ""}
                onChange={(imageUrl) =>
                  setHero((prev) => ({ ...prev, imageUrl }))
                }
                placeholder="Drop or select image"
              />
            </div>

            <div>
              <Label>Hero image</Label>

              <ImageUpload
                value={hero.backgroundImageUrl ?? ""}
                onChange={(backgroundImageUrl) =>
                  setHero((prev) => ({ ...prev, backgroundImageUrl }))
                }
                placeholder="Drop or select image"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Numbers displayed in the stats/metrics section on the homepage
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label>Students</Label>
              <Input
                type="text"
                value={stats.students}
                onChange={(e) =>
                  setStats((prev) => ({ ...prev, students: e.target.value }))
                }
                placeholder="12,847"
              />
            </div>
            <div>
              <Label>Courses</Label>
              <Input
                type="text"
                value={stats.courses}
                onChange={(e) =>
                  setStats((prev) => ({ ...prev, courses: e.target.value }))
                }
                placeholder="48"
              />
            </div>
            <div>
              <Label>Articles</Label>
              <Input
                type="text"
                value={stats.articles}
                onChange={(e) =>
                  setStats((prev) => ({ ...prev, articles: e.target.value }))
                }
                placeholder="2,356"
              />
            </div>
            <div>
              <Label>Others</Label>
              <Input
                type="text"
                value={stats.others}
                onChange={(e) =>
                  setStats((prev) => ({ ...prev, others: e.target.value }))
                }
                placeholder="1,892"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="sm">
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
