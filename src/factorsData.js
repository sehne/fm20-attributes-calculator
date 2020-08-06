const factors = {
    technical: {
        finishing: {
            id: "finishing",
            label: "Abschluss",
            factor: "1"
        },
        firstTouch: {
            id: "firstTouch",
            label: "Ballannahme",
            factor: "1"
        },
        marking: {
            id: "marking",
            label: "Deckung",
            factor: "1"
        },
        dribbling: {
            id: "dribbling",
            label: "Dribbling",
            factor: "1"
        },
        corners: {
            id: "corners",
            label: "Ecken",
            factor: "0"
        },
        penaltyTaking: {
            id: "penaltyTaking",
            label: "Elfmeter",
            factor: "0"
        },
        crossing: {
            id: "crossing",
            label: "Flanken",
            factor: "1"
        },
        freeKickTaking: {
            id: "freeKickTaking",
            label: "Freistöße",
            factor: "0"
        },
        heading: {
            id: "heading",
            label: "Kopfballtechnik",
            factor: "1"
        },
        passing: {
            id: "passing",
            label: "Passen",
            factor: "1"
        },
        tackling: {
            id: "tackling",
            label: "Tackling",
            factor: "1"
        },
        technique: {
            id: "technique",
            label: "Technik",
            factor: "1"
        },
        longThrows: {
            id: "longThrows",
            label: "Weite Einwürfe",
            factor: "0"
        },
        longShots: {
            id: "longShots",
            label: "Weitschüsse",
            factor: "1"
        }
    },
    mental: {
        aggression: {
            id: "aggression",
            label: "Aggressivität",
            factor: "1"
        },
        anticipation: {
            id: "anticipation",
            label: "Antizipation",
            factor: "1"
        },
        workRate: {
            id: "workRate",
            label: "Einsatzfreude",
            factor: "1"
        },
        decisions: {
            id: "decisions",
            label: "Entscheidungen",
            factor: "1"
        },
        flair: {
            id: "flair",
            label: "Flair",
            factor: "1"
        },
        leadership: {
            id: "leadership",
            label: "Führungsqualitäten",
            factor: "0"
        },
        concentration: {
            id: "concentration",
            label: "Konzentration",
            factor: "1"
        },
        bravery: {
            id: "bravery",
            label: "Mut",
            factor: "1"
        },
        composure: {
            id: "composure",
            label: "Nervenstärke",
            factor: "1"
        },
        offTheBall: {
            id: "offTheBall",
            label: "Ohne Ball",
            factor: "1"
        },
        positioning: {
            id: "positioning",
            label: "Stellungsspiel",
            factor: "1"
        },
        teamwork: {
            id: "teamwork",
            label: "Teamwork",
            factor: "1"
        },
        vision: {
            id: "vision",
            label: "Übersicht",
            factor: "1"
        },
        determination: {
            id: "determination",
            label: "Zielstrebigkeit",
            factor: "0"
        }
    },
    physical: {
        acceleration: {
            id: "acceleration",
            label: "Antritt",
            factor: "1"
        },
        stamina: {
            id: "stamina",
            label: "Ausdauer",
            factor: "1"
        },
        balance: {
            id: "balance",
            label: "Balance",
            factor: "1"
        },
        agility: {
            id: "agility",
            label: "Beweglichkeit",
            factor: "1"
        },
        naturalFitness: {
            id: "naturalFitness",
            label: "Grundfitness",
            factor: "0"
        },
        strength: {
            id: "strength",
            label: "Kraft",
            factor: "1"
        },
        pace: {
            id: "pace",
            label: "Schnelligkeit",
            factor: "1"
        },
        jumpingHeight: {
            id: "jumpingHeight",
            label: "Sprunghöhe",
            factor: "1"
        }
    }
}

export default factors;