export default class Student {
    constructor(name) {
        this._name = name
        this._scores = []
        this._finalScore = 0
    }

    get name() {
        return this._name
    }

    get scores() {
        return this._scores
    }

    set scores(a) {
        this._scores = a
    }

    get finalScore(){
        return this._finalScore
    }

    set finalScore(a){
        this._finalScore = a
    }

}
 

