import React from "react";
import FAQ from '../../components/PageComponents/LandingPage/FAQ/FAQ.jsx'
import DashboardLayout from "../../components/UI/DashboardLayout/DashboardLayout.jsx";
import DashboardPageHeading from "../../components/UI/DashboardPageHeading/DashboardPageHeading.jsx";

const faq = () => {
  return (
    <DashboardLayout>
      <DashboardPageHeading heading="FAQs" />
      <FAQ />
    </DashboardLayout>
  );
};

export default faq;
