const IndicatorItem = (key, children = []) => {
    return {
      key,
      children,
      hasChildren() {
        return this.children.length > 0;
      }
    };
  };

  const indicatorsTreeData = [
    IndicatorItem("FET1_1", ["FET1_1_1", "FET1_1_2", "FET1_1_3"]),
    IndicatorItem("FET1_2", ["FET1_2_1", "FET1_2_2"]),
    IndicatorItem("FET1_3"),
    IndicatorItem("FET1_4", ["FET1_4_1", "FET1_4_2"]),
    IndicatorItem("FET2_1", ["FET2_1_1", "FET2_1_2"]),
    IndicatorItem("FET2_2", ["FET2_2_1", "FET2_2_2", "FET2_2_3", "FET2_2_4"]),
    IndicatorItem("FET2_3", ["FET2_3_1", "FET2_3_2", "FET2_3_3", "FET2_3_4", "FET2_3_5"]),
    IndicatorItem("FET2_4"),
    IndicatorItem("FET3", ["FET3_1"]),
    IndicatorItem("FET3_1", ["FET3_1_1", "FET3_1_2"]),
    // IndicatorItem("PET0"),
    // IndicatorItem("PET1"),
    // IndicatorItem("PET2"),
    // IndicatorItem("PET3"),
    IndicatorItem("RES0", ["RES1", "RES2", "RES3", "RES4", "RES5"])
  ];


  export default indicatorsTreeData;