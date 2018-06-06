var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myObj = JSON.parse(xmlhttp.responseText);
        document.getElementById("registro").innerHTML = myObj.name;
    }
};
xmlhttp.open("GET", "../data/cohorts.json/", true);
xmlhttp.send();

