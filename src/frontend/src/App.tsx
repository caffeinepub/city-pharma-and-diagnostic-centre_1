import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HomePage } from "@/pages/HomePage";
import { MedicinePage } from "@/pages/MedicinePage";
import { PathologyPage } from "@/pages/PathologyPage";
import { UltrasoundPage } from "@/pages/UltrasoundPage";
import { DoctorsPage } from "@/pages/DoctorsPage";
import { ContactPage } from "@/pages/ContactPage";

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const medicineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/medicines",
  component: MedicinePage,
});

const pathologyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pathology",
  component: PathologyPage,
});

const ultrasoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ultrasound",
  component: UltrasoundPage,
});

const doctorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/doctors",
  component: DoctorsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  medicineRoute,
  pathologyRoute,
  ultrasoundRoute,
  doctorsRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
