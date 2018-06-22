/*coursesData = {};

Promise.all([ // Ejecuta todas las llamadas de manera paralela.
  fetch('/data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('/data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('/data/cohorts.json')
]).then((responses)=>{ // Responde a todas las promesas.
  return Promise.all(responses.map((response => response.json())));
}).then((responseJsons)=>{ // Arreglo de respuestas en json.
  let users = responseJsons[0];
  let progress = responseJsons[1];
  let courses = responseJsons[2];

  var ids = courses.map(function (courses) {
     return courses.id;
     console.log(ids);
    });
  

  
  computeUsersStats(users, progress, courses);
}).catch(
  (error)=>{ // Al menos una llamada falló.
  }
);

/*window.computeUsersStats = (users, progress, courses) => {
 let esto = users.map(
   (user) => {
     if (Object.keys(progress[user.id]).length ===0) {
       return user
     }  
          user.stats: {
            percent: percent,
            exercices: {
              total: practiceTotal,
              completed: practiceCompleted,
              percent: Math.round((practiceCompletes / practiceTotal)*100),
            },
            reads: {
              total: readsTotal,
              completed:readsCompleted,
              percent: Math.round((readsCompletes / readsTotal)*100),
            },
            quizzes: {
              total: quizzTotal,
              completed: quizzCompleted,
              percent: Math.round((quizzCompleted / quizzTotal)*100),
              scoreSum: scoreSumQuizz,
              scoreAvg: Math.round(scoreSumQuizz / quizzCompleted),
            }
          }
          return user;
        }
      }
    )
  }  
};*/



 
