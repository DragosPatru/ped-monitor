const indicatorsMap = new Map([
  ["FET0", {
    unit: "kWh/a",
    title: "Total district final energy consumption",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["FET1", {
    unit: "kWh/a",
    title: "Total final energy consumption: buildings, equipment/facilities and industries",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["FET2", {
    unit: "kWh/a",
    title: "Total final energy consumption: transport",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["FET3", {
    unit: "kWh/a",
    title: "Total final energy consumption: other sectors",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["FET1_1", {
    unit: "kWh/a",
    title: "Subtotal Municipal Final energy consumption",
    categoryLabel: "Energy",
    parent: "FET1"
  }],
  ["FET1_1_1", {
    unit: "kWh/a",
    title: "Energy consumption: municipal buildings, equipment/facilities",
    categoryLabel: "Energy",
    parent: "FET1_1"
  }],
  ["FET1_1_2", {
    unit: "kWh/a",
    title: "Energy consumption: public lighting",
    categoryLabel: "Energy",
    parent: "FET1_1"
  }],
  ["FET1_1_3", {
    unit: "kWh/a",
    title: "Energy consumption: other municipal category",
    categoryLabel: "Energy",
    parent: "FET1_1"
  }],
  ["FET1_2", {
    unit: "kWh/a",
    title: "Subtotal Tertiary (non-Municipal) Final energy consumption",
    categoryLabel: "Energy",
    parent: "FET1"
  }],
  ["FET1_2_1", {
    unit: "kWh/a",
    title: "Energy consumption: institutional buildings, non-municipal",
    categoryLabel: "Energy",
    parent: "FET1_2"
  }],
  ["FET1_2_2", {
    unit: "kWh/a",
    title: "Energy consumption: other non-municipal category",
    categoryLabel: "Energy",
    parent: "FET1_2"
  }],
  ["FET1_3", {
    unit: "kWh/a",
    title: "Energy consumption: residential buildings",
    categoryLabel: "Energy",
    parent: "FET1"
  }],
  ["FET1_4", {
    unit: "kWh/a",
    title: "Subtotal Industry Final energy consumption",
    categoryLabel: "Energy",
    parent: "FET1"
  }],
  ["FET1_4_1", {
    unit: "kWh/a",
    title: "Energy consumption: non-ETS industry",
    categoryLabel: "Energy",
    parent: "FET1_4"
  }],
  ["FET1_4_2", {
    unit: "kWh/a",
    title: "Energy consumption: ETS",
    categoryLabel: "Energy",
    parent: "FET1_4"
  }],
  ["FET2_1", {
    unit: "kWh/a",
    title: "Subtotal Municipal Fleet energy consumption",
    categoryLabel: "Energy",
    parent: "FET2"
  }],
  ["FET2_1_1", {
    unit: "kWh/a",
    title: "Energy consumption: road fleet",
    categoryLabel: "Energy",
    parent: "FET2_1"
  }],
  ["FET2_1_2", {
    unit: "kWh/a",
    title: "Energy consumption: other fleet",
    categoryLabel: "Energy",
    parent: "FET2_1"
  }],
  ["FET2_2", {
    unit: "kWh/a",
    title: "Subtotal Public transport energy consumption",
    categoryLabel: "Energy",
    parent: "FET2"
  }],
  ["FET2_2_1", {
    unit: "kWh/a",
    title: "Energy consumption: public road transport",
    categoryLabel: "Energy",
    parent: "FET2_2"
  }],
  ["FET2_2_2", {
    unit: "kWh/a",
    title: "Energy consumption: public rail",
    categoryLabel: "Energy",
    parent: "FET2_2"
  }],
  ["FET2_2_3", {
    unit: "kWh/a",
    title: "Energy consumption: public local and domestic waterways",
    categoryLabel: "Energy",
    parent: "FET2_2"
  }],
  ["FET2_2_4", {
    unit: "kWh/a",
    title: "Energy consumption: other public transport categories",
    categoryLabel: "Energy",
    parent: "FET2_2"
  }],
  ["FET2_3", {
    unit: "kWh/a",
    title: "Subtotal Private and commercial transport energy consumption",
    categoryLabel: "Energy",
    parent: "FET2"
  }],
  ["FET2_3_1", {
    unit: "kWh/a",
    title: "Energy consumption: private road transport",
    categoryLabel: "Energy",
    parent: "FET2_3"
  }],
  ["FET2_3_2", {
    unit: "kWh/a",
    title: "Energy consumption: private rail",
    categoryLabel: "Energy",
    parent: "FET2_3"
  }],
  ["FET2_3_3", {
    unit: "kWh/a",
    title: "Energy consumption: private local and domestic waterways",
    categoryLabel: "Energy",
    parent: "FET2_3"
  }],
  ["FET2_3_4", {
    unit: "kWh/a",
    title: "Energy consumption: private local aviation",
    categoryLabel: "Energy",
    parent: "FET2_3"
  }],
  ["FET2_3_5", {
    unit: "kWh/a",
    title: "Energy consumption: other private transport categories",
    categoryLabel: "Energy",
    parent: "FET2_3"
  }],
  ["FET2_4", {
    unit: "kWh/a",
    title: "Energy consumption: Other type of transport",
    categoryLabel: "Energy",
    parent: "FET2"
  }],
  ["FET3_1", {
    unit: "kWh/a",
    title: "Subtotal other sectors energy consumption",
    categoryLabel: "Energy",
    parent: "FET3"
  }],
  ["FET3_1_1", {
    unit: "kWh/a",
    title: "Agriculture, Forestry, Fisheries",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["FET3_1_2", {
    unit: "kWh/a",
    title: "Other not allocated",
    categoryLabel: "Energy",
    parent: "FET3_1"
  }],
  ["PET0", {
    unit: "kWh/a",
    title: "Total district primary energy consumption",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["PET1", {
    unit: "kWh/a",
    title: "Total primary energy consumption: buildings, equipment/facilities and industries",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["PET2", {
    unit: "kWh/a",
    title: "Total primary energy consumption: transport",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["PET3", {
    unit: "kWh/a",
    title: "Total primary energy consumption: other sectors",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["RES0", {
    unit: "kWh/a",
    title: "RES generation",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["RES1", {
    unit: "kWh/a",
    title: "Local electricity production: wind",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["RES2", {
    unit: "kWh/a",
    title: "Local electricity production: hydroelectric",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["RES3", {
    unit: "kWh/a",
    title: "Local electricity production: photovoltaics",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["RES4", {
    unit: "kWh/a",
    title: "Local electricity production: geothermal",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["RES5", {
    unit: "kWh/a",
    title: "Local electricity production: other",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["SS", {
    unit: "%",
    title: "Degree of energetic self-supply by RES",
    categoryLabel: "Energy",
    parent: "NONE"
  }],
  ["GHG0", {
    unit: "tCO2eq/a",
    title: "Total amount of Greenhouse Gas Emissions",
    categoryLabel: "Environment",
    parent: "NONE"
  }]
]);

export default indicatorsMap;