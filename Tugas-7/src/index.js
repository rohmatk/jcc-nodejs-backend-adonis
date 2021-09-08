import Bootcamp from './lib/bootcamp.js';
import Student from './lib/student.js';


const jcc = new Bootcamp("JCC")

jcc.createClass("Laravel", "beginner", "abduh")
jcc.createClass("React", "beginner", "abdul")

let names = ["regi", "ahmad", "bondra", "iqbal", "putri", "rezky"]
names.map((nama, index) => { 
    let newStud = new Student(nama)
    let kelas = jcc.classes[index % 2].name
    jcc.register(kelas, newStud)
})

jcc.classes.forEach(kelas => {
    console.log(kelas.graduate())
  })

jcc.runBatch()