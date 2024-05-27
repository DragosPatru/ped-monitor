const energyRelatedIndicators = {
    title: "Energy Related",
    kpis:["FET0", "SS", "PET0"],
    kpisGhg:["FET0_GHG_"],
    sectionsFET: [
        {
            title: "Buildings, equipment/facilities and industries",
            hasSubsections: true,
            kpis:["FET1", "PET1"],
            kpisGhg:["FET1_GHG_"],
            subsections: [
                {
                    isContainer: true,
                    key: "municipal_buildings",
                    title: "Municipal buildings, equipment/facilities",
                    kpis:["FET1_1"],
                    kpisGhg:["FET1_1_GHG_"],
                    items: [
                        "FET1_1_1",
                        "FET1_1_2",
                        "FET1_1_3",]
                },
                {
                    isContainer: true,
                    key: "non_municipal_buildings",
                    title: "Tertiary (non municipal) buildings, equipment/facilities",
                    kpis:["FET1_2"],
                    kpisGhg:["FET1_2_GHG_"],
                    items: [
                        "FET1_2_1",
                        "FET1_2_2",]
                },
                {
                    key: "residential_buildings",
                    title: "Residential buildings",
                    isContainer: true,
                    kpis:["FET1_3"],
                    kpisGhg:["FET1_3_GHG_"],
                    items: ["FET1_3"]
                },
                {
                    key: "industry",
                    isContainer: true,
                    title: "Industry",
                    kpis:["FET1_4"],
                    kpisGhg:["FET1_4_GHG_"],
                    items: [
                        "FET1_4_1",
                        "FET1_4_2",]
                },

            ],

        },
        {
            title: "Transport",
            hasSubsections: true,
            kpis:["FET2", "PET2"],
            kpisGhg:["FET2_GHG_"],
            subsections: [
                {
                    key: "municipal_fleet",
                    isContainer: true,
                    title: "Municipal fleet",
                    kpis:["FET2_1"],
                    kpisGhg:["FET2_1_GHG_"],
                    items: [
                        "FET2_1_1",
                        "FET2_1_2",]
                },
                {
                    key: "public_transport",
                    isContainer: true,
                    title: "Public transport",
                    kpis:["FET2_2"],
                    kpisGhg:["FET2_2_GHG_"],
                    items: [
                        "FET2_2_1",
                        "FET2_2_2",
                        "FET2_2_3",
                        "FET2_2_4",]
                },
                {
                    key: "private_commercial_transport",
                    isContainer: true,
                    title: "Private and commercial transport",
                    kpis:["FET2_3"],
                    kpisGhg:["FET2_3_GHG_"],
                    items: [
                        "FET2_3_1",
                        "FET2_3_2",
                        "FET2_3_3",
                        "FET2_3_4",
                        "FET2_3_5",]
                },
                {
                    key: "other_transport",
                    title: "Other type of transport",
                    isContainer: true,
                    kpis:["FET2_4"],
                    kpisGhg:["FET2_4_GHG_"],
                    items: [
                        "FET2_4"]
                },
            ],
        },
        {
            title: "Other sectors",
            hasSubsections: false,
            kpis:["FET3", "PET3"],
            kpisGhg:["FET3_GHG_"],
            items: [
                "FET3_1_1",
                "FET3_1_2",
            ]
        },

    ],

    sectionsRES: [
        {
            title: "RES generation",
            hasSubsections: false,
            kpis:["RES0"],
            items: [
                "RESX"
            ]
        },
    ]
}

export default energyRelatedIndicators;