import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const randomBtn = document.getElementById("randomBtn");
const randomAdv = document.getElementById("randomAdvice");
const advice = document.createElement("p");
const queryBtn = document.getElementById("searchBtn");
const queryAdv = document.getElementById("searchAdvice");
const adviceInput = document.getElementById("searchbar");

queryBtn.addEventListener("click", async () => {
    const advice = adviceInput.value;
    const message = document.createElement('p');
    try{ 
        let queryRes = await axios.get(`${BASE_URL}/search/${advice}`);
        let adviceRes = queryRes.data;
        if(adviceRes.query){
            while(queryAdv.lastChild){
                queryAdv.removeChild(queryAdv.lastChild)
            }
            adviceRes = queryRes.data.slips
            for(let i = 0; i < 5; i++){
                let res = adviceRes[i].advice
                let advice = document.createElement('p');
                advice.textContent = res;
                queryAdv.appendChild(advice)
            }
        } else if (adviceRes.message){
            message.textContent = `No results found for ${advice}. Try a different word.`;

            while(queryAdv.lastChild){
                queryAdv.removeChild(queryAdv.lastChild)
            }
            queryAdv.appendChild(message);
        }
    } catch (e) {
        console.log(e);
    }
})


const randomRes = async () => {
    await axios.get(
        `${BASE_URL}`
    ).then(res => {
        console.log(res.data.slip)
        let adviceObj = res.data.slip;
        advice.textContent = adviceObj.advice;
        advice.id = adviceObj.id;
    }).catch(e => {
        console.log(e);
    })
}

randomBtn.addEventListener("click", () => {
    try {
        randomRes();
        randomAdv.appendChild(advice);
    }
    catch (e){
        console.log(e);
    }
})

