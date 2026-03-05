let first = null;
let second = null;
let player = 1;
let matchedPairs = 0;
let totalPairs = 6;
let isChecking = false;

$(document).ready(function() {
  shuffleCards();
  $("#resetBtn").click(resetGame);
});

function shuffleCards() {
  let cards = $(".card").get();
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = $(cards[i]).attr("data-value");
    $(cards[i]).attr("data-value", $(cards[j]).attr("data-value"));
    $(cards[j]).attr("data-value", temp);
  }
}

function resetGame() {
  first = null;
  second = null;
  player = 1;
  matchedPairs = 0;
  isChecking = false;
  
  $("#p1").text("0");
  $("#p2").text("0");
  $("#turn").text("Player 1 Turn").removeClass("winner");
  
  $(".card").text("?").removeClass("matched");
  shuffleCards();
}

$(".card").click(function() {
  if (isChecking) return;
  if ($(this).text() != "?" || $(this).hasClass("matched")) {
    return;
  }

  let value = $(this).attr("data-value");
  $(this).text(value);

  if (first == null) {
    first = $(this);
  } else if ($(this)[0] === first[0]) {
    return;
  } else {
    second = $(this);
    isChecking = true;

    if (first.attr("data-value") == second.attr("data-value")) {
      
      setTimeout(function() {
        first.addClass("matched");
        second.addClass("matched");
        matchedPairs++;

        if (player == 1) {
          let s = Number($("#p1").text());
          $("#p1").text(s + 1);
        } else {
          let s = Number($("#p2").text());
          $("#p2").text(s + 1);
        }

        if (matchedPairs == totalPairs) {
          setTimeout(function() {
            let p1Score = Number($("#p1").text());
            let p2Score = Number($("#p2").text());
            
            if (p1Score > p2Score) {
              $("#turn").text("🎉 Player 1 Wins! 🎉").addClass("winner");
            } else if (p2Score > p1Score) {
              $("#turn").text("🎉 Player 2 Wins! 🎉").addClass("winner");
            } else {
              $("#turn").text("🤝 It's a Tie! 🤝").addClass("winner");
            }
          }, 300);
        }

        first = null;
        second = null;
        isChecking = false;
      }, 500);
    } else {
     
      setTimeout(function() {
        first.text("?");
        second.text("?");

        first = null;
        second = null;
        isChecking = false;

        if (player == 1) {
          player = 2;
          $("#turn").text("Player 2 Turn");
        } else {
          player = 1;
          $("#turn").text("Player 1 Turn");
        }
      }, 900);
    }
  }
});