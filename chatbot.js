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
        input = input.toLowerCase();

        for (const category in this.responses) {
            for (const key in this.responses[category]) {
                if (input.includes(key)) {
                    return this.responses[category][key];
                }
            }
        }

        return this.responses.default || "I don't have a response for that.";
    }
}
