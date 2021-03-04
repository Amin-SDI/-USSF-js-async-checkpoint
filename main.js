/*
[ ] import fetch & node js fs
[ ] utilize pokeapi.com
[ ] read txt file
[ ] process each line for serperate input (Array?)
[ ] process the api request from the array of pokemon
[ ] error handle non-exisitant pokemon
[ ] log each pokemon's type
*/

const fetch = require('node-fetch')
const fs = require('fs')

function getNames(filePath){
    return new Promise((success, failure)=>{
        fs.readFile(filePath, 'utf8', function(err, contents){
            if(err){
                failure(err)
            }else{
                contents = contents.replace(/\r\n/g, '\n') // removing windows return encoding
                contents = contents.split('\n') //each new line turns into it's own
                success(contents)
            }
        })
    })
};

function getType(pokemon){
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    return fetch(URL)
        .then(results => results.json())
        .then(data => {
        let pokemonObj = {
            name: data.name, 
            type: data.types.map(element => element.type.name)   
          }    
        console.log(`${pokemonObj.name}: ${pokemonObj.type.join(' and ')} type`) //Charazard: fire , flying type)
        })

}
 

const filename = "./Files/input.txt"
const promise1 = getNames(filename)
promise1
    .then((contents)=>contents.forEach(pokemon=>getType(pokemon)))
    .catch(err=>console.log(err))
