import Kelas from './kelas.js'

export default class Bootcamp {
    constructor(name) {
        this.name = name,
        this.classes = []
    }

    get bname() {
        return this.name;
    }

    createClass(name,level,instructor) {
        var kelas = new Kelas(name,level,instructor)
        this.classes.push(kelas)
    }

    get bclasses() {
        return this.classes;
    }

    register(kelas,newStud) {
        for (var i = 0 ; i < this.classes.length; i++) {
            if (this.classes[i].name === kelas) {
                this.classes[i].students.push(newStud)
            }
        }
    }

    runBatch() {
        for(var i = 0; i < 4; i++) {
            this.classes.forEach(kelas => {
                kelas.students.forEach(student => {
                    let a = Math.round(Math.random()*101)
                    student.scores.push(a)
                    let b = student.scores.reduce((a,b)=> {
                        return a+b;
                    })
                    student.finalScore = Math.round(b/(i+1))
               })
               
            })
        }
        this.classes.forEach(kelas => {
            console.log(kelas.graduate())
        })
    }

}