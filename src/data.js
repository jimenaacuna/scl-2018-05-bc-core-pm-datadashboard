var requestCohorts = new XMLHttpRequest();
requestCohorts.onreadystatechange = function() {
    if (requestCohorts.readyState == 4 && requestCohorts.status == 200) {
        var myObj = JSON.parse(requestCohorts.responseText);
        document.getElementById("registroData").innerHTML = myObj.name;
    }
};
requestCohorts.open("GET", "../data/cohorts.json/", true);
requestCohorts.send();
console.log(requestCohorts);



var requestUsers = new XMLHttpRequest();
requestUsers.onreadystatechange = function() {
    if (requestUsers.readyState == 4 && requestUsers.status == 200) {
        var myObjj = JSON.parse(requestUsers.responseText);
        document.getElementById("registroData").innerHTML = myObjj.name;
    }
};
requestUsers.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/users.json/", true);
requestUsers.send();
console.log(requestUsers);



var requestProgress = new XMLHttpRequest();
requestProgress.onreadystatechange = function() {
    if (requestProgress.readyState == 4 && requestProgress.status == 200) {
        var myObjjj = JSON.parse(requestProgress.responseText);
        document.getElementById("registroData").innerHTML = myObjjj.name;
    }
};
requestProgress.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progress.json/", true);
requestProgress.send();
console.log(requestProgress);


