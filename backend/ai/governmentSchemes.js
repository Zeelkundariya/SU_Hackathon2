module.exports.checkEligibility = ({
  msmeRegistered = true,
  turnoverCr = 0,
  investmentCr = 0
}) => {
  const schemes = [];

  // Rajasthan-Specific & Textile Focus
  if (msmeRegistered) {
    schemes.push("✔ Rajasthan Investment Promotion Scheme (RIPS-2024)");
    schemes.push("✔ TUFS (Amended Technology Upgradation Fund Scheme)");
  }

  if (investmentCr > 2 && investmentCr < 50) {
    schemes.push("✔ MSME Technology Centre Support (SITP)");
  }

  if (turnoverCr < 100) {
    schemes.push("✔ ZED Certification Financial Support");
  }

  // Rajasthan State Specific
  schemes.push("✔ Rajasthan MSME Policy: Power Tariff Rebate");

  return {
    eligibleSchemes: schemes,
    pmegpEligible: investmentCr < 0.5,
    tufsStatus: "Eligible for 15% Subsidy"
  };
};