const createIndicator = (unit, title, categoryLabel, parent = "NONE", shortTitleInSubcategory = title) => {
  return { unit, title, categoryLabel, parent, shortTitleInSubcategory };
};

const indicatorsMap = new Map([
  ["FET0", createIndicator("kWh/a", "Total district final energy consumption", "ENERGY", "NONE", "Total district final energy consumption (FET0)")],
  ["FET1", createIndicator("kWh/a", "Total energy consumption: buildings, equipment/facilities and industries", "ENERGY", "NONE", "Total energy consumption (FET1)")],
  ["FET2", createIndicator("kWh/a", "Total energy consumption: transport", "ENERGY", "NONE", "Total energy consumption (FET2)")],
  ["FET3", createIndicator("kWh/a", "Total energy consumption: other sectors", "ENERGY", "NONE", "Total energy consumption (FET3)")],
  ["FET1_1", createIndicator("kWh/a", "Municipal energy consumption", "ENERGY", "FET1")],
  ["FET1_1_1", createIndicator("kWh/a", "Energy consumption: municipal buildings, equipment/facilities", "ENERGY", "FET1_1", "Municipal buildings, equipment/facilities")],
  ["FET1_1_2", createIndicator("kWh/a", "Energy consumption: public lighting", "ENERGY", "FET1_1", "Public lighting")],
  ["FET1_1_3", createIndicator("kWh/a", "Energy consumption: other municipal category", "ENERGY", "FET1_1", "Other")],

  ["FET1_2", createIndicator("kWh/a", "Tertiary (non-Municipal) energy consumption", "ENERGY", "FET1")],
  ["FET1_2_1", createIndicator("kWh/a", "Energy consumption: institutional buildings, non-municipal", "ENERGY", "FET1_2", "Institutional buildings")],
  ["FET1_2_2", createIndicator("kWh/a", "Energy consumption: other non-municipal category", "ENERGY", "FET1_2", "Other")],
  
  ["FET1_3", createIndicator("kWh/a", "Energy consumption: residential buildings", "ENERGY", "FET1", "Residential buildings")],
  
  ["FET1_4", createIndicator("kWh/a", "Industry energy consumption", "ENERGY", "FET1")],
  ["FET1_4_1", createIndicator("kWh/a", "Energy consumption: non-ETS industry", "ENERGY", "FET1_4", "Non-ETS")],
  ["FET1_4_2", createIndicator("kWh/a", "Energy consumption: ETS", "ENERGY", "FET1_4", "ETS")],
  
  ["FET2_1", createIndicator("kWh/a", "Municipal Fleet energy consumption", "ENERGY", "FET2")],
  ["FET2_1_1", createIndicator("kWh/a", "Energy consumption: road fleet", "ENERGY", "FET2_1", "Road")],
  ["FET2_1_2", createIndicator("kWh/a", "Energy consumption: other fleet", "ENERGY", "FET2_1", "Other")],
  
  ["FET2_2", createIndicator("kWh/a", "Public transport energy consumption", "ENERGY", "FET2")],
  ["FET2_2_1", createIndicator("kWh/a", "Energy consumption: public road transport", "ENERGY", "FET2_2", "Road")],
  ["FET2_2_2", createIndicator("kWh/a", "Energy consumption: public rail", "ENERGY", "FET2_2", "Rail")],
  ["FET2_2_3", createIndicator("kWh/a", "Energy consumption: public local and domestic waterways", "ENERGY", "FET2_2", "Local and domestic waterways")],
  ["FET2_2_4", createIndicator("kWh/a", "Energy consumption: other public transport categories", "ENERGY", "FET2_2", "Other")],
  
  ["FET2_3", createIndicator("kWh/a", "Private and commercial transport energy consumption", "ENERGY", "FET2")],
  ["FET2_3_1", createIndicator("kWh/a", "Energy consumption: private road transport", "ENERGY", "FET2_3", "Road")],
  ["FET2_3_2", createIndicator("kWh/a", "Energy consumption: private rail", "ENERGY", "FET2_3", "Rail")],
  ["FET2_3_3", createIndicator("kWh/a", "Energy consumption: private local and domestic waterways", "ENERGY", "FET2_3", "Local and domestic waterways")],
  ["FET2_3_4", createIndicator("kWh/a", "Energy consumption: private local aviation", "ENERGY", "FET2_3", "Local aviation")],
  ["FET2_3_5", createIndicator("kWh/a", "Energy consumption: other private transport categories", "ENERGY", "FET2_3", "Other")],
  
  ["FET2_4", createIndicator("kWh/a", "Energy consumption: Other type of transport", "ENERGY", "FET2", "Transport not allocated")],
  
  ["FET3_1", createIndicator("kWh/a", "Other sectors energy consumption", "ENERGY", "FET3")],
  ["FET3_1_1", createIndicator("kWh/a", "Agriculture, Forestry, Fisheries", "ENERGY")],
  ["FET3_1_2", createIndicator("kWh/a", "Other not allocated", "ENERGY", "FET3_1")],
  
  ["PET0", createIndicator("kWh/a", "Total district primary energy consumption", "ENERGY", "NONE", "Total district primary energy consumption (PET0)")],
  ["PET1", createIndicator("kWh/a", "Total primary energy consumption: buildings, equipment/facilities and industries", "ENERGY", "NONE", "Total primary energy consumption (PET1)" )],
  ["PET2", createIndicator("kWh/a", "Total primary energy consumption: transport", "ENERGY", "NONE", "Total primary energy consumption (PET2)")],
  ["PET3", createIndicator("kWh/a", "Total primary energy consumption: other sectors", "ENERGY", "NONE", "Total primary energy consumption (PET3)")],
  
  ["RES0", createIndicator("kWh/a", "RES generation", "ENERGY")],
  ["RESX", createIndicator("kWh/a", "Local electricity production", "ENERGY")],
  ["RES1", createIndicator("kWh/a", "Local electricity production: wind", "ENERGY")],
  ["RES2", createIndicator("kWh/a", "Local electricity production: hydroelectric", "ENERGY")],
  ["RES3", createIndicator("kWh/a", "Local electricity production: photovoltaics", "ENERGY")],
  ["RES4", createIndicator("kWh/a", "Local electricity production: geothermal", "ENERGY")],
  ["RES5", createIndicator("kWh/a", "Local electricity production: other", "ENERGY")],
  ["SS", createIndicator("%", "Degree of energetic self-supply by RES", "ENERGY")],

  ["GHG0", createIndicator("tCO2eq/a", "Total amount of Greenhouse Gas Emissions", "ENVIRONMENT")],

  ["A1", createIndicator("no.", "People reached", "ACCEPTANCE")],
  ["A2", createIndicator("%", "Rate of people reached", "ACCEPTANCE")],
  ["A3", createIndicator("%", "Success rate", "ACCEPTANCE")],
  
  ["E1", createIndicator("€", "Money spent", "ECONOMIC")],
  ["E2", createIndicator("years", "Return on investment", "ECONOMIC")],


  ["FET0_GHG_", createIndicator("tCO2eq/a", "Total district final energy consumption", "ENVIRONMENT", "NONE", "District Greenhouse Gas Emissions")],
  ["FET1_GHG_", createIndicator("tCO2eq/a", "Total final energy consumption: buildings, equipment/facilities and industries", "ENVIRONMENT", "NONE", "Greenhouse Gas Emissions")],
  ["FET2_GHG_", createIndicator("tCO2eq/a", "Total final energy consumption: transport", "ENVIRONMENT", "NONE", "Greenhouse Gas Emissions")],
  ["FET3_GHG_", createIndicator("tCO2eq/a", "Total final energy consumption: other sectors", "ENVIRONMENT", "NONE", "Greenhouse Gas Emissions")],
  ["FET1_1_GHG_", createIndicator("tCO2eq/a", "Municipal Final energy consumption", "ENVIRONMENT", "FET1_GHG_", "Greenhouse Gas Emissions")],
  ["FET1_2_GHG_", createIndicator("tCO2eq/a", "Tertiary (non-Municipal) Final energy consumption", "ENVIRONMENT", "FET1_GHG_", "Greenhouse Gas Emissions" )],
  ["FET1_3_GHG_", createIndicator("tCO2eq/a", "Energy consumption: residential buildings", "ENVIRONMENT", "FET1_GHG_", "Greenhouse Gas Emissions")],
  ["FET1_4_GHG_", createIndicator("tCO2eq/a", "Industry Final energy consumption", "ENVIRONMENT", "FET1_GHG_", "Greenhouse Gas Emissions")],
  ["FET2_1_GHG_", createIndicator("tCO2eq/a", "Municipal Fleet energy consumption", "ENVIRONMENT", "FET2_GHG_", "Greenhouse Gas Emissions")],
  ["FET2_2_GHG_", createIndicator("tCO2eq/a", "Public transport energy consumption", "ENVIRONMENT", "FET2_GHG_", "Greenhouse Gas Emissions")],
  ["FET2_3_GHG_", createIndicator("tCO2eq/a", "Private and commercial transport energy consumption", "ENVIRONMENT", "FET2_GHG_", "Greenhouse Gas Emissions")],
  ["FET2_4_GHG_", createIndicator("tCO2eq/a", "Energy consumption: Other type of transport", "ENVIRONMENT", "FET2_GHG_", "Greenhouse Gas Emissions")],
  ["FET3_1_GHG_", createIndicator("tCO2eq/a", "other sectors energy consumption", "ENVIRONMENT", "FET3_GHG_", "Greenhouse Gas Emissions")]

]);

export default indicatorsMap;