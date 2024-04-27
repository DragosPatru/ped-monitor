const energyRelatedIndicators = {
    title: "Energy Related",
    sectionsFET: [
        {
            title: "Buildings, equipment/facilities and industries Indicators",
            hasSubsections: true,
            subsections: [
                {
                    isContainer: true,
                    key: "municipal_buildings",
                    title: "Municipal buildings, equipment/facilities",
                    items: [
                        "FET1_1_1",
                        "FET1_1_2",
                        "FET1_1_3",]
                },
                {
                    isContainer: true,
                    key: "non_municipal_buildings",
                    title: "Tertiary (non municipal) buildings, equipment/facilities",
                    items: [
                        "FET1_2_1",
                        "FET1_2_2",]
                },
                {
                    key: "residential_buildings",
                    isContainer: false,
                    items: ["FET1_3"]
                },
                {
                    key: "industry",
                    isContainer: true,
                    title: "Industry",
                    items: [
                        "FET1_4_1",
                        "FET1_4_2",]
                },

            ],

        },
        {
            title: "Transport Indicators",
            hasSubsections: true,
            subsections: [
                {
                    key: "municipal_fleet",
                    isContainer: true,
                    title: "Municipal fleet",
                    items: [
                        "FET2_1_1",
                        "FET2_1_2",]
                },
                {
                    key: "public_transport",
                    isContainer: true,
                    title: "Public transport",
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
                    items: [
                        "FET2_3_1",
                        "FET2_3_2",
                        "FET2_3_3",
                        "FET2_3_4",
                        "FET2_3_5",]
                },
                {
                    key: "other_transport",
                    isContainer: false,
                    items: [
                        "FET2_4"]
                },
            ],
        },
        {
            title: "Other sectors",
            hasSubsections: false,
            items: [
                "FET3_1_1",
                "FET3_1_2",
            ]
        },

    ],

    sectionsRES: [
        {
            title: "RES generation Indicators",
            hasSubsections: false,
            items: [
                "RES1",
                "RES2",
                "RES3",
                "RES4",
                "RES5"
            ]
        },
    ]
}

export default energyRelatedIndicators;