const commonStages =
    [
        { "order": 1, "name": "Backlog", 'bg': 'grey', },
        { "order": 2, "name": "To Do", 'bg': 'skyblue', },
        { "order": 3, "name": "In Progress", 'bg': 'orange', },
        { "order": 4, "name": "Complete", 'bg': 'green', }
    ];

const categories = [
    {
        "description": "For HR",
        "categoryCode": "hr",
        "name": "Human Resources",
        "stages": commonStages
    },
    {
        "description": "For Sales",
        "categoryCode": "sales",
        "name": "Sales",
        "stages": commonStages
    },
    {
        "description": "For Support",
        "categoryCode": "support",
        "name": "Support",
        "stages": commonStages
    },
    {
        "description": "For UX Design",
        "categoryCode": "ux-design",
        "name": "UX Design",
        "stages": commonStages
    },
    {
        "description": "For Digital Marketing",
        "categoryCode": "digital-marketting",
        "name": "Digital Marketing",
        "stages": commonStages
    },
    {
        "description": " For Software Development",
        "categoryCode": "software-development",
        "name": "Software Development",
        "stages": commonStages
    },
    {
        "description": "For Business Consultancy",
        "categoryCode": "business-consultancy",
        "name": "Business Consultancy",
        "stages": commonStages
    },
    {
        "description": "For Law",
        "categoryCode": "law",
        "name": "Law",
        "stages": commonStages
    },
    {
        "description": "For Architecture",
        "categoryCode": "architecture",
        "name": "Architecture",
        "stages": commonStages
    },
    {
        "description": "For Education",
        "categoryCode": "education",
        "name": "Education",
        "stages": commonStages
    },
    {
        "description": "For Time-driven",
        "categoryCode": "timeDrive",
        "name": "Time-driven",
        "stages": commonStages
    },
    {
        "description": "For Personal",
        "categoryCode": "personal",
        "name": "Personal",
        "stages": commonStages
    }
];



module.exports = {
    categories
};
