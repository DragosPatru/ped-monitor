const createIndicator = (unit, title, categoryLabel, parent = "NONE") => {
  return { unit, title, categoryLabel, parent };
};

const indicatorsMap = new Map([
  ["FET0", createIndicator("kWh/a", "Total district final energy consumption", "Energy")],
  ["FET1", createIndicator("kWh/a", "Total final energy consumption: buildings, equipment/facilities and industries", "Energy")],
  ["FET2", createIndicator("kWh/a", "Total final energy consumption: transport", "Energy")],
  ["FET3", createIndicator("kWh/a", "Total final energy consumption: other sectors", "Energy")],
  ["FET1_1", createIndicator("kWh/a", "Subtotal Municipal Final energy consumption", "Energy", "FET1")],
  ["FET1_1_1", createIndicator("kWh/a", "Energy consumption: municipal buildings, equipment/facilities", "Energy", "FET1_1")],
  ["FET1_1_2", createIndicator("kWh/a", "Energy consumption: public lighting", "Energy", "FET1_1")],
  ["FET1_1_3", createIndicator("kWh/a", "Energy consumption: other municipal category", "Energy", "FET1_1")],

  ["FET1_2", createIndicator("kWh/a", "Subtotal Tertiary (non-Municipal) Final energy consumption", "Energy", "FET1")],
  ["FET1_2_1", createIndicator("kWh/a", "Energy consumption: institutional buildings, non-municipal", "Energy", "FET1_2")],
  ["FET1_2_2", createIndicator("kWh/a", "Energy consumption: other non-municipal category", "Energy", "FET1_2")],
  
  ["FET1_3", createIndicator("kWh/a", "Energy consumption: residential buildings", "Energy", "FET1")],
  
  ["FET1_4", createIndicator("kWh/a", "Subtotal Industry Final energy consumption", "Energy", "FET1")],
  ["FET1_4_1", createIndicator("kWh/a", "Energy consumption: non-ETS industry", "Energy", "FET1_4")],
  ["FET1_4_2", createIndicator("kWh/a", "Energy consumption: ETS", "Energy", "FET1_4")],
  
  ["FET2_1", createIndicator("kWh/a", "Subtotal Municipal Fleet energy consumption", "Energy", "FET2")],
  ["FET2_1_1", createIndicator("kWh/a", "Energy consumption: road fleet", "Energy", "FET2_1")],
  ["FET2_1_2", createIndicator("kWh/a", "Energy consumption: other fleet", "Energy", "FET2_1")],
  
  ["FET2_2", createIndicator("kWh/a", "Subtotal Public transport energy consumption", "Energy", "FET2")],
  ["FET2_2_1", createIndicator("kWh/a", "Energy consumption: public road transport", "Energy", "FET2_2")],
  ["FET2_2_2", createIndicator("kWh/a", "Energy consumption: public rail", "Energy", "FET2_2")],
  ["FET2_2_3", createIndicator("kWh/a", "Energy consumption: public local and domestic waterways", "Energy", "FET2_2")],
  ["FET2_2_4", createIndicator("kWh/a", "Energy consumption: other public transport categories", "Energy", "FET2_2")],
  
  ["FET2_3", createIndicator("kWh/a", "Subtotal Private and commercial transport energy consumption", "Energy", "FET2")],
  ["FET2_3_1", createIndicator("kWh/a", "Energy consumption: private road transport", "Energy", "FET2_3")],
  ["FET2_3_2", createIndicator("kWh/a", "Energy consumption: private rail", "Energy", "FET2_3")],
  ["FET2_3_3", createIndicator("kWh/a", "Energy consumption: private local and domestic waterways", "Energy", "FET2_3")],
  ["FET2_3_4", createIndicator("kWh/a", "Energy consumption: private local aviation", "Energy", "FET2_3")],
  ["FET2_3_5", createIndicator("kWh/a", "Energy consumption: other private transport categories", "Energy", "FET2_3")],
  
  ["FET2_4", createIndicator("kWh/a", "Energy consumption: Other type of transport", "Energy", "FET2")],
  
  ["FET3_1", createIndicator("kWh/a", "Subtotal other sectors energy consumption", "Energy", "FET3")],
  ["FET3_1_1", createIndicator("kWh/a", "Agriculture, Forestry, Fisheries", "Energy")],
  ["FET3_1_2", createIndicator("kWh/a", "Other not allocated", "Energy", "FET3_1")],
  
  ["PET0", createIndicator("kWh/a", "Total district primary energy consumption", "Energy")],
  ["PET1", createIndicator("kWh/a", "Total primary energy consumption: buildings, equipment/facilities and industries", "Energy")],
  ["PET2", createIndicator("kWh/a", "Total primary energy consumption: transport", "Energy")],
  ["PET3", createIndicator("kWh/a", "Total primary energy consumption: other sectors", "Energy")],
  ["RES0", createIndicator("kWh/a", "RES generation", "Energy")],
  ["RES1", createIndicator("kWh/a", "Local electricity production: wind", "Energy")],
  ["RES2", createIndicator("kWh/a", "Local electricity production: hydroelectric", "Energy")],
  ["RES3", createIndicator("kWh/a", "Local electricity production: photovoltaics", "Energy")],
  ["RES4", createIndicator("kWh/a", "Local electricity production: geothermal", "Energy")],
  ["RES5", createIndicator("kWh/a", "Local electricity production: other", "Energy")],
  ["SS", createIndicator("%", "Degree of energetic self-supply by RES", "Energy")],
  ["GHG0", createIndicator("tCO2eq/a", "Total amount of Greenhouse Gas Emissions", "Environment")]
]);

export default indicatorsMap;