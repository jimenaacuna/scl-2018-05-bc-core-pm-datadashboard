
/*   users.map(user => {
   
    courses.map(course => {     
      console.log(progress[user.id][course])  
      if (progress[user.id][course]) {  
        console.log(progress[user.id][course])      
        user.stats = {
          percent: promedio(progress[user.id][course].percent),
          exercises: {
            total: 0,
            completed: 0,
            percent: 0 
          },
          quizzes: {
            total: 0,
            completed: 0,
            scoreSum: 0,
            percent: 0,
            scoreAvg: 0
          },
          reads: {
            total: 0,
            completed: 0,
            percent: 0

          },
        };

        // Recupera los valores del objeto y los devuelve en un arreglo
        Object.values(progress[user.id][course].units).forEach(unit => {
          Object.values(unit.elements).forEach(part => {
            switch (part) {             
            case part.type === 'practice':          
              user.stats.exercises.total++;
              user.stats.exercises.completed += (part.completed);
            
            case part.type === 'quiz': 
              user.stats.quizzes.total++;
              user.stats.quizzes.completed += (part.completed);
            
            case part.completed: 
              user.stats.quizzes.scoreSum += (part.score);
              
            case part.type === 'read':
              user.stats.reads.total++;
              user.stats.reads.completed += (part.completed);
            }
          }
          );
        });
        user.stats.exercises.percent = Math.round(user.stats.exercises.completed / user.stats.exercises.total * 100);
        user.stats.quizzes.percent = Math.round(user.stats.quizzes.completed / user.stats.quizzes.total * 100);
        user.stats.quizzes.scoreAvg = Math.round(user.stats.quizzes.scoreSum / user.stats.quizzes.completed);
        user.stats.reads.percent = Math.round(user.stats.reads.completed / user.stats.reads.total * 100);
      } else {
        user.stats = {
          percent: 0,
          exercises: {},
          quizzes: {},
          reads: {},
        };
      }
    });
  });
  

  return users; */