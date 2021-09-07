export default class Kelas {
    constructor(name,level,instructor) {
        this._name = name
        this._students = []
        this._level = level
        this._instructor = instructor
    }

    get name() {
        return this._name
    }

    get students() {
        return this._students
    }

    graduate() {
        let participant = []
        let completed = []
        let mastered = []
        this._students.forEach(students => {
            let a = students.finalScore
            if (a <= 60){
                participant.push(students)
            }else if(a >=85 ){
                mastered.push(students)
            }else{
                completed.push(students)
            }
        })
        var obj ={participant,completed,mastered}
        return obj
    }

}


