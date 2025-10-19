import React from "react";
import PrivacyPolicy from "../components/PageComponents/LandingPage/PrivacyPolicy/PrivacyPolicy";
import MetaTags from "../components/UI/MetaTags/MetaTags";

const privacyPolicy = () => {
  return (
    <>
      <MetaTags title="Privacy Policy | DVMCentral" description="Our privacy statement provides you the information about how we collect and use your data. We respect your privacy and believe in confidentiality and clarity." keywords="" />
      <PrivacyPolicy />
    </>
  );
};

export default privacyPolicy;
