Promise.all([    //Ejecuta todas las llamadas de manera paralela
        fetch('/data/cohorts/lim-2018-03-pre-core-pw/users.json'),
        fetch('/data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
        fetch('/data/cohorts.json')
]).then((responses)=>{   //Responde a todas las promesas
    return Promise.all(responses.map((response => response.json())));
}).then((responseJsons)=>{ //Arreglo de respuestas en json
         console.log(responseJsons)
         //
         // Código que ocupa los jsons...
         //
    }).catch(
        (error)=>{ // Al menos una llamada falló
        }
    );


   



    
