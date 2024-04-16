const DataSource = (key, title) => {
  return { key: key, title: title };
};

const dataSourceFactors = [
  DataSource("electricity", "Electricity"),
  DataSource("locally_produced_heat_cold", "Locally produced Heat/cold"),
  DataSource("natural_gas", "Natural gas"),
  DataSource("liquefied_petroleum_gases", "Liquefied Petroleum Gases"),
  DataSource("natural_gas_liquids", "Natural Gas Liquids"),
  DataSource("gas_diesel_oil", "Gas/diesel oil"),
  DataSource("motor_gasoline", "Motor gasoline"),
  DataSource("lignite", "Lignite"),
  DataSource("anthracite", "Anthracite"),
  DataSource("other_bituminous_coal", "Other Bituminous Coal"),
  DataSource("sub_bituminous_coal", "Sub-Bituminous Coal"),
  DataSource("peat", "Peat"),
  DataSource("municipal_wastes_non_biomass", "Municipal Wastes (non-biomass fraction)"),
  DataSource("other_liquid_biofuels_sustainable", "Other liquid biofuels from sustainable sources"),
  DataSource("other_liquid_biofuels_non_sustainable", "Other liquid biofuels from non-sustainable sources"),
  DataSource("bio_gasoline_sustainable", "Bio-gasoline from sustainable sources"),
  DataSource("bio_gasoline_non_sustainable", "Bio-gasoline from non-sustainable sources"),
  DataSource("biodiesel_sustainable", "Biodiesel from sustainable sources"),
  DataSource("biodiesel_non_sustainable", "Biodiesel from non-sustainable sources"),
  DataSource("wood_waste_sustainable", "Wood / wood waste from sustainable sources"),
  DataSource("wood_waste_non_sustainable", "Wood / wood waste from non-sustainable sources"),
  DataSource("municipal_wastes_biomass_sustainable", "Municipal wastes (biomass fraction) from sustainable sources"),
  DataSource("municipal_wastes_biomass_non_sustainable", "Municipal wastes (biomass fraction) from non-sustainable sources"),
  DataSource("other_primary_biomass_sustainable", "Other primary solid biomass from sustainable sources"),
  DataSource("other_primary_biomass_non_sustainable", "Other primary solid biomass from non-sustainable sources"),
  DataSource("biogas_sustainable", "Biogas from sustainable sources"),
  DataSource("biogas_non_sustainable", "Biogas from non-sustainable sources"),
  DataSource("solar_thermal", "Solar thermal"),
  DataSource("geothermal", "Geothermal")
];

export default dataSourceFactors;