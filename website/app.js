//import { application } from "express";

/* Global Variables */

const apiKey = "&appid=4d4350f4b0820fbf2df2a7961a475c9e"

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//get req
const getData = async (baseURL, zip, apiKey) => {
    try{
        const res = await fetch(baseURL+zip+apiKey);
        const data = await res.json();
        console.log(data);
        return data;
    } catch(e){
        console.log("getData err is: "+e);
    }
}

//post req
const postData = async (url = "", data = {}) => {
    try{
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return(res);
    } catch(e){
        console.log("postData error is: "+e);
    }
}



 //update UI
const updateUI = async() => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        
        //display everything
        const date = document.getElementById('date').innerHTML = 'The date is:  ' + allData.date;
        const zip = document.getElementById('zip').innerHTML = allData.zip;
        const temp = document.getElementById('temp').innerHTML = 'The ºF temperature is:  ' + allData.temperature;
        const content = document.getElementById('content').innerHTML = 'It feels:  ' + allData.content;
        
        
        
        console.log(allData);
    } catch(e){
        console.log("updateUI err is "+e);
    }
}




  //button click eve
document.getElementById('generate').addEventListener('click', performAction);

async function performAction(e) {
    const zip = document.getElementById('zip').value;
    const temp = document.getElementById('temp').value;
    const feelings = document.getElementById('feelings').value;

    getData(baseURL, zip, apiKey)
    .then(function(data) {
        console.log(data);
        postData('/addWeather', {date: newDate, zip, temp: data.main.temp, feelings});
    }).then(setTimeout(function () {
        updateUI();
    }, 1000))
};
 

