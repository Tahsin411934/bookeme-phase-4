import { Roboto } from "next/font/google";
import Banner from "./components/Home/Banner";
import Visa from "./components/Home/Visa";
import Tangour from "./components/Home/Tangour";
import Sundarban from "./components/Home/sundarban";
import SaintMartin from "./components/Home/SaintMartin";
import PromotionsPage from "./components/Home/PromotionsPage";
import getServicesData from "@/services/homepage/getServicesData";
import HpmepageBlog from "./components/pre-footer-content/Homepage";

// Optional: ensure server-side rendering
export const dynamic = "force-dynamic";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default async function Home() {
  let servicesData = [];

  try {
    servicesData = await getServicesData();
  } catch (error) {
    console.error("Error fetching services data:", error);
  }

  const shouldShowVisa = servicesData?.some(
    (item) => item?.category_name === "Visa" && item?.isShow === "yes"
  );

  const shouldShowTour = servicesData?.some(
    (item) => item?.category_name === "Tour" && item?.isShow === "yes"
  );

  const shouldShowTangour = servicesData?.some(
    (item) => item?.category_name === "Tanguar Haor" && item?.isShow === "yes"
  );

  const shouldShowSundarban = servicesData?.some(
    (item) => item?.category_name === "Sundarban" && item?.isShow === "yes"
  );

  const shouldShowSaintMartin = servicesData?.some(
    (item) => item?.category_name === "Saint Martin Ships" && item?.isShow === "yes"
  );

  return (
    <main className={roboto.className}>
      <div className="w-[100%]">
        <Banner />
      </div>
      <div className="py-[20px] md:py-10">
        <div className="mt-[12px] md:mt-0 w-[98%] 2xl:w-[1440px] gap-5 mx-auto">
          <div className="overflow-hidden">
            {servicesData.length > 0 ? (
              <>
                <PromotionsPage servicesData={servicesData} />

                {shouldShowVisa && <Visa />}

                {shouldShowTour && (
                  <>
                    {shouldShowTangour && <Tangour />}
                    {shouldShowSundarban && <Sundarban />}
                    {shouldShowSaintMartin && <SaintMartin />}
                  </>
                )}
              </>
            ) : (
              <p className="text-center text-red-500">
                Failed to load services data. Please try again later.
              </p>
            )}
          </div>
        </div>
      </div>
      <HpmepageBlog/>
    </main>
  );
}
