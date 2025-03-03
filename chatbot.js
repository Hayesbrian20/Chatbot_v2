export default class Chatbot {
    constructor(responseFile = "responses.json") {
        this.responseFile = responseFile;
        this.responses = {};
    }

    async loadResponses() {
        try {
            const res = await fetch(this.responseFile);
            this.responses = await res.json();
        } catch (error) {
            console.error("Error loading chatbot responses:", error);
        }
    }

    getResponse(input) {
        input = input.toLowerCase().trim(); // Normalize user input
        let bestMatch = { phrase: null, score: 0 };
        let matchedResponse = this.responses.default || "I'm not sure how to respond to that.";

        // Ensure stringSimilarity is loaded from the CDN
        if (typeof window.stringSimilarity === 'undefined') {
            console.error("stringSimilarity library not found. Make sure to load it in index.html.");
            return matchedResponse;
        }

        // Flatten responses into a searchable format
        let phraseList = [];
        let phraseMapping = {};

        for (const category in this.responses) {
            for (const phrase in this.responses[category]) {
                phraseList.push(phrase);
                phraseMapping[phrase] = this.responses[category][phrase];
            }
        }

        // Find the closest match using fuzzy logic
        const matches = window.stringSimilarity.findBestMatch(input, phraseList);
        const bestPhrase = matches.bestMatch.target;
        const bestScore = matches.bestMatch.rating;

        // Set response if confidence score is high enough
        if (bestScore > 0.5) { // Threshold to determine a "good match"
            matchedResponse = phraseMapping[bestPhrase];
        }

        return matchedResponse;
    }
}
