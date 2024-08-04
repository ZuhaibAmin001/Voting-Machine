let selectedParty = null;
let totalVotes = 0;

const partyVotes = {
    pti: 0,
    pmln: 0,
    mqm: 0,
    ppp: 0,
    tlp: 0
};

const parties = document.querySelectorAll(".parties");
const submitVoteButton = document.querySelector("#submit-vote");
const totalCountButton = document.querySelector("#count");
const winnerButton = document.querySelector("#winner-button");
const resetCountButton = document.querySelector("#reset-count");

const voteResults = {
    pti: document.querySelector("#pti-votes"),
    pmln: document.querySelector("#pmln-votes"),
    mqm: document.querySelector("#mqm-votes"),
    ppp: document.querySelector("#ppp-votes"),
    tlp: document.querySelector("#tlp-votes"),
    total: document.querySelector("#total-votes"),
    winner: document.querySelector("#winner")
};

const voteSubmit = (choiceID) => {
    submitVoteButton.innerText = `Your vote has been submitted to ${choiceID}`;
    console.log(`Your vote has been submitted to ${choiceID}`);
};

const updateVoteCount = () => {
    for (const party in partyVotes) {
        voteResults[party].innerText = `${party.toUpperCase()} Votes: ${partyVotes[party]}`;
    }
    voteResults.total.innerText = `Total Votes: ${totalVotes}`;
};

const result = (choiceID) => {
    console.log("You voted for", choiceID);
    selectedParty = choiceID;
};

parties.forEach(party => {
    party.addEventListener("click", () => {
        const choiceID = party.getAttribute("id");
        result(choiceID);
    });
});

submitVoteButton.addEventListener("click", () => {
    if (selectedParty) {
        partyVotes[selectedParty]++;
        totalVotes++;
        voteSubmit(selectedParty);
        updateVoteCount();
        selectedParty = null;  // Reset selected party after submission
    } else {
        console.log("No party is selected");
        submitVoteButton.innerText = "No party is selected, please select again";
    }
});

totalCountButton.addEventListener("click", () => {
    alert(`Total Votes: ${totalVotes}`);
});

const determineWinner = () => {
    let maxVotes = -1;
    let winner = null;
    for (const party in partyVotes) {
        if (partyVotes[party] > maxVotes) {
            maxVotes = partyVotes[party];
            winner = party;
        }
    }
    if (winner) {
        voteResults.winner.innerText = `Winner: ${winner.toUpperCase()} with ${maxVotes} votes`;
    } else {
        voteResults.winner.innerText = "Winner: N/A";
    }
};

winnerButton.addEventListener("click", determineWinner);

resetCountButton.addEventListener("click", () => {
    for (const party in partyVotes) {
        partyVotes[party] = 0;
    }
    totalVotes = 0;
    updateVoteCount();
    submitVoteButton.innerText = "Submit Vote";
    voteResults.winner.innerText = "Winner: N/A";
    console.log("Vote counts have been reset");
});
