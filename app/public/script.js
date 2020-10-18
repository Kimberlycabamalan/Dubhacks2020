console.log("hello world :o");
const questionsList = document.getElementById("questions");
const questionsForm = document.getElementById("questionForm");
const answerForm = document.getElementById("answerForm");
var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('myvideo', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
  }
  function onPlayerReady(event) {
	//event.target.playVideo();
  }
  function onPlayerStateChange(event) {
  }

function convertTimeToSeconds() {
  var time_stamp= document.getElementById("timestamp").value;
  var time= time_stamp.split(':');
  var seconds = 0;
  if (time.length==3){
    seconds= parseInt(time[0])*(60*60)+ parseInt(time[1])*60 + parseInt(time[2]);
  }
  else {
    seconds= parseInt(time[0]*60) + parseInt(time[1]);
  }
  console.log("convertTimeToSeconds: " + seconds);
  return seconds;
}

function convertTimeToSecondsWithTime(time) {
  var time_stamp= time;
  var time= time_stamp.split(':');
  console.log(time);
  var seconds = 0;
  if (time.length==3){
    seconds= parseInt(time[0])*(60*60)+ parseInt(time[1])*60 + parseInt(time[2]);
  }
  else {
    seconds= parseInt(time[0]*60) + parseInt(time[1]);
  }
  console.log("convertTimeToSeconds: " + seconds);
  return seconds;
}

function setVideoTime(time){
  player.seekTo(time);
}
function appendNewQuestion(question, timestamp) {
  const newListItem = document.createElement("button");
  
  const newQuestion = document.createElement("p");
  const newTimestamp = document.createElement("p");
  newQuestion.innerText = question;
  newTimestamp.innerText = timestamp;
  newListItem.appendChild(newTimestamp);
  newListItem.appendChild(newQuestion);  
  var id = question + timestamp;
  newListItem.id = id;
  newListItem.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(timestamp);
    setVideoTime(convertTimeToSecondsWithTime(timestamp));
    console.log(id);
  })

  questionsList.appendChild(newListItem);
  setVideoTime(convertTimeToSeconds());
}

// Go to timestamp in video, and show thread
function answerQuestion(id){
  event.preventDefault();
  console.log("answerQuestion id: " + id);
  var x = document.getElementById("answerForm");
  
  
}

// fetch the initial list of dreams
fetch("/questions")
  .then(response => response.json()) // parse the JSON from the server
  .then(questions => {
    questionsList.firstElementChild.remove();
    questions.forEach(appendNewQuestion);
    questionsForm.addEventListener("submit", event => {
      event.preventDefault();
      let newQuestion = questionsForm.elements[1].value;
      questions.push(newQuestion);      
      appendNewQuestion(newQuestion, questionsForm.elements[0].value);
      questionsForm.reset();
    });
  
    answerForm.addEventListener("submit", event => {
      event.preventDefault();
      let a = answerForm.elements[1].value;
      appendNewQuestion(a, answerForm.elements[0].value);
      answerForm.reset();
    });
    

  });
