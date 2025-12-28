export function generateQuestionID() {
    const timestamp = Date.now().toString(36);
    const spice = Math.random().toString(36).substring(2, 6); // 4 long
    const questionID = timestamp + spice;

    // console.log(`Generated question ID: ${questionID.toUpperCase()} with spice: ${spice}`);

    return questionID.toUpperCase();
}

export function generateQuestionTimestamp() {
    const timestamp = Date.now().toString(16);
    return timestamp;
}