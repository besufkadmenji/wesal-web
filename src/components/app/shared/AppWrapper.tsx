import { TopBar } from "./TopBar";
import { Header } from "@/components/app/shared/Header";
import { Footer } from "@/components/app/shared/Footer";

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1">
      <TopBar />
      <Header />
      {children}
      <Footer />
    </div>
  );
};
