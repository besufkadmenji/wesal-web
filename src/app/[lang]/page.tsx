import { Home } from "@/components/app/home/Home";
import CategoryService from "@/services/category.service";
import { Params } from "@/app/[lang]/layout";

const HomePage = async ({ params }: { params: Params }) => {
  const { lang } = await params;

  const categories = await CategoryService.categories({ page: 1, limit: 20 });
  console.log("categories in page:", categories);
  return <Home categories={categories?.items ?? []} />;
};

export default HomePage;
