import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./layout/ScrollToTop";
import { ThemeProvider } from "./theme/ThemeProvider";

export default function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Navbar />
        <main className="mt-16">
          <ScrollToTop />
          <AppRoutes />
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
