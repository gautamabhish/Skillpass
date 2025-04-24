import NavbarLogged from "@/components/ui/globals/NavbarLogged";
import CardContainer from "@/components/dashboard/CardContainer";
import CoursesContainer from "@/components/dashboard/CourseContainer";
import CertificatesContainer from "@/components/dashboard/CertificateContainer";
import RecommendedContainer from "@/components/dashboard/RecommendConatiner";
export default function Home() {
  return (
      <section className="main bg-[#f5f5f5] w-full min-h-screen">

        <NavbarLogged />
        <CardContainer />
        <CoursesContainer />
        <CertificatesContainer />
        <RecommendedContainer />
      </section>
  );
}