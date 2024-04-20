const createIndicator = (unit, title, categoryLabel, parent = "NONE") => {
  return { unit, title, categoryLabel, parent };
};

const indicatorsMap = new Map([
  ["FET0", createIndicator("kWh/a", "Total district final energy consumption", "ENERGY")],
  ["FET1", createIndicator("kWh/a", "Total final energy consumption: buildings, equipment/facilities and industries", "ENERGY")],
  ["FET2", createIndicator("kWh/a", "Total final energy consumption: transport", "ENERGY")],
  ["FET3", createIndicator("kWh/a", "Total final energy consumption: other sectors", "ENERGY")],
  ["FET1_1", createIndicator("kWh/a", "Subtotal Municipal Final energy consumption", "ENERGY", "FET1")],
  ["FET1_1_1", createIndicator("kWh/a", "Energy consumption: municipal buildings, equipment/facilities", "ENERGY", "FET1_1")],
  ["FET1_1_2", createIndicator("kWh/a", "Energy consumption: public lighting", "ENERGY", "FET1_1")],
  ["FET1_1_3", createIndicator("kWh/a", "Energy consumption: other municipal category", "ENERGY", "FET1_1")],

  ["FET1_2", createIndicator("kWh/a", "Subtotal Tertiary (non-Municipal) Final energy consumption", "ENERGY", "FET1")],
  ["FET1_2_1", createIndicator("kWh/a", "Energy consumption: institutional buildings, non-municipal", "ENERGY", "FET1_2")],
  ["FET1_2_2", createIndicator("kWh/a", "Energy consumption: other non-municipal category", "ENERGY", "FET1_2")],
  
  ["FET1_3", createIndicator("kWh/a", "Energy consumption: residential buildings", "ENERGY", "FET1")],
  
  ["FET1_4", createIndicator("kWh/a", "Subtotal Industry Final energy consumption", "ENERGY", "FET1")],
  ["FET1_4_1", createIndicator("kWh/a", "Energy consumption: non-ETS industry", "ENERGY", "FET1_4")],
  ["FET1_4_2", createIndicator("kWh/a", "Energy consumption: ETS", "ENERGY", "FET1_4")],
  
  ["FET2_1", createIndicator("kWh/a", "Subtotal Municipal Fleet energy consumption", "ENERGY", "FET2")],
  ["FET2_1_1", createIndicator("kWh/a", "Energy consumption: road fleet", "ENERGY", "FET2_1")],
  ["FET2_1_2", createIndicator("kWh/a", "Energy consumption: other fleet", "ENERGY", "FET2_1")],
  
  ["FET2_2", createIndicator("kWh/a", "Subtotal Public transport energy consumption", "ENERGY", "FET2")],
  ["FET2_2_1", createIndicator("kWh/a", "Energy consumption: public road transport", "ENERGY", "FET2_2")],
  ["FET2_2_2", createIndicator("kWh/a", "Energy consumption: public rail", "ENERGY", "FET2_2")],
  ["FET2_2_3", createIndicator("kWh/a", "Energy consumption: public local and domestic waterways", "ENERGY", "FET2_2")],
  ["FET2_2_4", createIndicator("kWh/a", "Energy consumption: other public transport categories", "ENERGY", "FET2_2")],
  
  ["FET2_3", createIndicator("kWh/a", "Subtotal Private and commercial transport energy consumption", "ENERGY", "FET2")],
  ["FET2_3_1", createIndicator("kWh/a", "Energy consumption: private road transport", "ENERGY", "FET2_3")],
  ["FET2_3_2", createIndicator("kWh/a", "Energy consumption: private rail", "ENERGY", "FET2_3")],
  ["FET2_3_3", createIndicator("kWh/a", "Energy consumption: private local and domestic waterways", "ENERGY", "FET2_3")],
  ["FET2_3_4", createIndicator("kWh/a", "Energy consumption: private local aviation", "ENERGY", "FET2_3")],
  ["FET2_3_5", createIndicator("kWh/a", "Energy consumption: other private transport categories", "ENERGY", "FET2_3")],
  
  ["FET2_4", createIndicator("kWh/a", "Energy consumption: Other type of transport", "ENERGY", "FET2")],
  
  ["FET3_1", createIndicator("kWh/a", "Subtotal other sectors energy consumption", "ENERGY", "FET3")],
  ["FET3_1_1", createIndicator("kWh/a", "Agriculture, Forestry, Fisheries", "ENERGY")],
  ["FET3_1_2", createIndicator("kWh/a", "Other not allocated", "ENERGY", "FET3_1")],
  
  ["PET0", createIndicator("kWh/a", "Total district primary energy consumption", "ENERGY")],
  ["PET1", createIndicator("kWh/a", "Total primary energy consumption: buildings, equipment/facilities and industries", "ENERGY")],
  ["PET2", createIndicator("kWh/a", "Total primary energy consumption: transport", "ENERGY")],
  ["PET3", createIndicator("kWh/a", "Total primary energy consumption: other sectors", "ENERGY")],
  
  ["RES0", createIndicator("kWh/a", "RES generation", "ENERGY")],
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
  ["E2", createIndicator("years", "Return on investment", "ECONOMIC")]

]);

export default indicatorsMap;