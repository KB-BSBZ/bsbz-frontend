import { useState } from "react";
import Loading from "../components/Loading";
import Hood from "../components/Hood";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer/Footer";
import BankingMainBox from "../components/Banking/BankingInfo";

export default function Banking() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Hood title={"입출금"} />
      {isLoading && <Loading />}
      <Navigation />
      <BankingMainBox />
      <Footer />
    </>
  );
}
