import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { RedirectIfAuthenticated } from "./components/auth/RedirectIfAuthenticated";
import { RequirePermissionRoute } from "./components/auth/RequirePermission";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HomeContent from "./pages/cms/HomeContent";
import AboutContent from "./pages/cms/AboutContent";
import ContactContent from "./pages/cms/ContactContent";
import PrivacyPolicyContent from "./pages/cms/PrivacyPolicyContent";
import EthicsPolicyContent from "./pages/cms/EthicsPolicyContent";
import TermsOfUseContent from "./pages/cms/TermsOfUseContent";
import DisclaimerContent from "./pages/cms/DisclaimerContent";
import RefundPolicyContent from "./pages/cms/RefundPolicyContent";
import SEOMetadataList from "./pages/seo/SEOMetadataList";
import SEOMetadataCreate from "./pages/seo/SEOMetadataCreate";
import SEOMetadataEdit from "./pages/seo/SEOMetadataEdit";
import SEOMetadataView from "./pages/seo/SEOMetadataView";
import ArticleList from "./pages/articles/ArticleList";
import ArticleCreate from "./pages/articles/ArticleCreate";
import ArticleEdit from "./pages/articles/ArticleEdit";
import ArticleView from "./pages/articles/ArticleView";
import ArticlePreview from "./pages/articles/ArticlePreview";
import MembershipList from "./pages/memberships/MembershipList";
import MembershipCreate from "./pages/memberships/MembershipCreate";
import MembershipEdit from "./pages/memberships/MembershipEdit";
import MembershipView from "./pages/memberships/MembershipView";
import TestimonialList from "./pages/testimonials/TestimonialList";
import TestimonialCreate from "./pages/testimonials/TestimonialCreate";
import TestimonialEdit from "./pages/testimonials/TestimonialEdit";
import TestimonialView from "./pages/testimonials/TestimonialView";
import FAQList from "./pages/faq/FAQList";
import FAQCreate from "./pages/faq/FAQCreate";
import FAQEdit from "./pages/faq/FAQEdit";
import FAQView from "./pages/faq/FAQView";
import AdminUserList from "./pages/admin-users/AdminUserList";
import AdminUserView from "./pages/admin-users/AdminUserView";
import AdminUserCreate from "./pages/admin-users/AdminUserCreate";
import AdminUserEdit from "./pages/admin-users/AdminUserEdit";
import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";
import UserView from "./pages/users/UserView";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Dashboard: anyone with admin access */}
          <Route element={<RequirePermissionRoute permissions={["admin:access"]} />}>
            <Route index path="/" element={<Home />} />
          </Route>

          {/* Page Content / CMS — view or edit */}
          <Route element={<RequirePermissionRoute permissions={["content:list", "content:view", "content:edit"]} />}>
            <Route path="/content/home" element={<HomeContent />} />
            <Route path="/content/about" element={<AboutContent />} />
            <Route path="/content/contact" element={<ContactContent />} />
            <Route path="/content/privacy-policy" element={<PrivacyPolicyContent />} />
            <Route path="/content/ethics-policy" element={<EthicsPolicyContent />} />
            <Route path="/content/terms-of-use" element={<TermsOfUseContent />} />
            <Route path="/content/disclaimer" element={<DisclaimerContent />} />
            <Route path="/content/refund-policy" element={<RefundPolicyContent />} />
          </Route>

          {/* Articles — each sub-route requires its specific permission */}
          <Route path="/articles" element={<RequirePermissionRoute permissions={["articles:list"]} />}>
            <Route index element={<ArticleList />} />
          </Route>
          <Route path="/articles/create" element={<RequirePermissionRoute permissions={["articles:create"]} />}>
            <Route index element={<ArticleCreate />} />
          </Route>
          <Route path="/articles/preview" element={<RequirePermissionRoute permissions={["articles:view", "articles:edit"]} />}>
            <Route index element={<ArticlePreview />} />
          </Route>
          <Route path="/articles/:id" element={<RequirePermissionRoute permissions={["articles:view"]} />}>
            <Route index element={<ArticleView />} />
          </Route>
          <Route path="/articles/:id/edit" element={<RequirePermissionRoute permissions={["articles:edit"]} />}>
            <Route index element={<ArticleEdit />} />
          </Route>

          {/* SEO Metadata */}
          <Route path="/seo-metadata" element={<RequirePermissionRoute permissions={["seo:list"]} />}>
            <Route index element={<SEOMetadataList />} />
          </Route>
          <Route path="/seo-metadata/create" element={<RequirePermissionRoute permissions={["seo:create"]} />}>
            <Route index element={<SEOMetadataCreate />} />
          </Route>
          <Route path="/seo-metadata/:id" element={<RequirePermissionRoute permissions={["seo:view"]} />}>
            <Route index element={<SEOMetadataView />} />
          </Route>
          <Route path="/seo-metadata/:id/edit" element={<RequirePermissionRoute permissions={["seo:edit"]} />}>
            <Route index element={<SEOMetadataEdit />} />
          </Route>

          {/* Memberships */}
          <Route path="/memberships" element={<RequirePermissionRoute permissions={["memberships:list"]} />}>
            <Route index element={<MembershipList />} />
          </Route>
          <Route path="/memberships/create" element={<RequirePermissionRoute permissions={["memberships:create"]} />}>
            <Route index element={<MembershipCreate />} />
          </Route>
          <Route path="/memberships/:id" element={<RequirePermissionRoute permissions={["memberships:view"]} />}>
            <Route index element={<MembershipView />} />
          </Route>
          <Route path="/memberships/:id/edit" element={<RequirePermissionRoute permissions={["memberships:edit"]} />}>
            <Route index element={<MembershipEdit />} />
          </Route>

          {/* Testimonials */}
          <Route path="/testimonials" element={<RequirePermissionRoute permissions={["testimonials:list"]} />}>
            <Route index element={<TestimonialList />} />
          </Route>
          <Route path="/testimonials/create" element={<RequirePermissionRoute permissions={["testimonials:create"]} />}>
            <Route index element={<TestimonialCreate />} />
          </Route>
          <Route path="/testimonials/:id" element={<RequirePermissionRoute permissions={["testimonials:view"]} />}>
            <Route index element={<TestimonialView />} />
          </Route>
          <Route path="/testimonials/:id/edit" element={<RequirePermissionRoute permissions={["testimonials:edit"]} />}>
            <Route index element={<TestimonialEdit />} />
          </Route>

          {/* FAQ */}
          <Route path="/faq" element={<RequirePermissionRoute permissions={["faq:list"]} />}>
            <Route index element={<FAQList />} />
          </Route>
          <Route path="/faq/create" element={<RequirePermissionRoute permissions={["faq:create"]} />}>
            <Route index element={<FAQCreate />} />
          </Route>
          <Route path="/faq/:id" element={<RequirePermissionRoute permissions={["faq:view"]} />}>
            <Route index element={<FAQView />} />
          </Route>
          <Route path="/faq/:id/edit" element={<RequirePermissionRoute permissions={["faq:edit"]} />}>
            <Route index element={<FAQEdit />} />
          </Route>

          {/* Admin Users */}
          <Route path="/admin-users" element={<RequirePermissionRoute permissions={["admin_users:list"]} />}>
            <Route index element={<AdminUserList />} />
          </Route>
          <Route path="/admin-users/create" element={<RequirePermissionRoute permissions={["admin_users:create"]} />}>
            <Route index element={<AdminUserCreate />} />
          </Route>
          <Route path="/admin-users/:id" element={<RequirePermissionRoute permissions={["admin_users:view"]} />}>
            <Route index element={<AdminUserView />} />
          </Route>
          <Route path="/admin-users/:id/edit" element={<RequirePermissionRoute permissions={["admin_users:edit"]} />}>
            <Route index element={<AdminUserEdit />} />
          </Route>

          {/* Students / Users (Non-Admin) */}
          <Route path="/users" element={<RequirePermissionRoute permissions={["admin_users:list"]} />}>
            <Route index element={<UserList />} />
          </Route>
          <Route path="/users/create" element={<RequirePermissionRoute permissions={["admin_users:create"]} />}>
            <Route index element={<UserCreate />} />
          </Route>
          <Route path="/users/:id" element={<RequirePermissionRoute permissions={["admin_users:view"]} />}>
            <Route index element={<UserView />} />
          </Route>
          <Route path="/users/:id/edit" element={<RequirePermissionRoute permissions={["admin_users:edit"]} />}>
            <Route index element={<UserEdit />} />
          </Route>

          {/* Others Page */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* Ui Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>
      </Route>

      {/* Auth (public) */}
      <Route
        path="/signin"
        element={
          <RedirectIfAuthenticated>
            <SignIn />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="/signup" element={<SignUp />} />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
