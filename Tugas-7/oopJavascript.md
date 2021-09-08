Materi : Object Oriented Programming (OOP) in Javascript
 
Pada materi sebelumnya, telah dipelajari tentang Object Literals di Javascript. Dengan Object kita dapat merepresentasikan segala hal termasuk program yang akan kita buat dengan Javascript. Materi kali ini akan mempelajari object dalam bentuk Class.

Di dalam dunia pemrograman dikenal sebuah konsep dengan nama OOP atau Object Oriented Programming. Secara sederhana, dengan konsep OOP maka segala sesuatu dapat kita anggap sebagai sebuah Object atau cetakan (Blueprint). Contohnya terdapat Object Class bernama "Car" yang berarti mobil. Suatu (cetakan) mobil biasanya memiliki nama dan dibuat oleh sebuah pabrikan otomotif (factory). Selain itu mobil dapat memiliki fungsi untuk berjalan, mengerem, membunyikan klakson, dll.

Mendefinisikan Sebuah Class
Class sebetulnya adalah sebuah functions yang spesial, dan seperti function yang kita ketahui sebelumnya bahwa functions dapat dideklarasikan dan dipanggil begitu pula dengan Class.

Deklarasi Class
Cara yang pertama untuk membuat sebuah class yaitu dengan mendeklarasikannya. Caranya adalah tuliskan "Class" diikuti dengan nama class-nya.

class Car {
    constructor(brand,factory) {
        this.brand = brand
        this.factory = factory
        this.sound = "honk! honk!vroomvroom"
    }
}
Ekspresi Class
Cara lain untuk membuat sebuah class yaitu dengan cara membuat sebuah variabel. Class tersebut boleh diberikan nama atau tidak diberi nama. contohnya sebagai berikut:

// Tidak diberi nama 
var Car = class {
    constructor(brand, factory) {
        this.brand = brand
        this.factory = factory
    }
}
 
console.log(Car.name) // Car
 
// Diberi nama
var Car = class Car2 {
    constructor(brand, factory) {
        this.brand = brand
        this.factory = factory
    }
}
console.log(Car.name) // Car2
Nama sebuah Class biasanya menggunakan kapital pada huruf pertama nya. Jika terdapat dua kata atau lebih maka huruf pertama pada kata yang selanjutnya harus kapital.

class Car{} // BENAR
class car{} // SALAH
class SportsCar {} // BENAR
class sportscar {} // SALAH 
Struktur pada Class
 

Sebuah class memiliki bagian "body" yang merupakan isi dari class. Body dari class yaitu bagian yang dilingkupi oleh tanda kurung kurawal {} . Di dalam body tersebut kita mendefinisikan methods dan property pada class tersebut. ‌

Property pada sebuah class artinya suatu variabel atau atribut yang melekat di dalam class tersebut, sedangkan Methods di class adalah fungsi yang dapat dilakukan oleh class. Contohnya pada suatu class Car akan memiliki property berupa nama merk (brand) dan pabrikan pembuat mobilnya (factory). Selain itu, class Car mempunyai methods di antaranya berjalan (drive), mengerem (brake), atau membunyikan klakson (horn).

class Car {     
constructor(brand, factory) {
    this.brand = brand         
this.factory = factory         
this.sound = "honk! honk!"     
   }     
    
drive() {         
console.log("enjoy your ride with " + this.name)     
}         
brake() {         
console.log("the " + this.name + " car is about to stop, hang on!") 
}         
  horn() {         
console.log(this.sound)     
} 
}
this
//

Jika diperhatikan selalu terdapat sintaks this pada contoh class di atas. this tersebut adalah sintaks untuk menunjuk class atau seluruh body di class itu sendiri. Sintaks this hanya hidup di dalam deklarasi Class dan tidak bisa dipanggil di luar class. ‌

Di dalam deklarasi sebuah class maka cara untuk memanggil property atau methods adalah dengan menambahkan this lalu diikuti dengan titik dan nama property atau methodsnya. ‌

constructor()
Constructor adalah methods yang selalu dijalankan paling pertama ketika sebuah class dipanggil (instance). Constructor dapat menerima parameter yang mengirim nilai ke dalam class tersebut. ‌

Instance Class (membuat Object dari Class)
Seperti function pada umumnya yang terdapat deklarasi dan pemanggilan function atau instance. Deklarasi Class sudah dijelaskan pada point sebelumnya. Class juga memiliki cara untuk pemanggilannya contohnya sebagai berikut:

// Instance dari class Car 
var innovam = new Car("Innovam", "Toyotwo")
console.log(innovam) 
// Output: Car { brand: 'Innovam', factory: 'Toyotwo', sound: 'honk! honk!' }
‌

Instance dari class Car dapat diartikan kita membuat sebuah mobil baru dengan menggunakan "cetakan" Car yang sudah didefinisikan. Contohnya membuat mobil baru ke dalam sebuah variable bernama "innovam". Pada contoh di atas mobil innova memiliki nama "Innovam" dan berasal dari pabrikan "Toyotwo". Ketika ditampilkan di console maka dihasilkan sebuah Object Class dengan nama class Car dan berisi sebuah object dengan property yang kita definisikan pada methods constructor. ‌

Menyambung pada pembahasan constructor: ketika class Car dipanggil (di-instance) maka methods constructor akan dijalankan pertama kali. Jika diperhatikan, di dalam methods constructor yang dilakukan adalah mendefinisikan property atau atribut dan mengisinya dengan nilai yang dikirim melalui parameter ketika di-instance.‌

Karena class Car berupa blueprint atau cetakan, maka kita sebetulnya dapat membuat banyak mobil baru dengan melakukan instance seperti pada contoh di atas.

var expancer = new Car("Expancer", "Amitbishi")
var erlima = new Car("Erlima", "Suzuka") 
var bujero = new Car("Bujero", "Amitbishi")
Seperti dijelaskan sebelumnya bahwa setiap mobil yang kita buat akan memiliki property dan methods yang sesuai dengan cetakan yang sudah didefinisikan di awal. Untuk memanggil methods yang dimiliki oleh sebuah class Car maka kita tinggal menuliskan nama object class nya diikuti nama methodsnya dipisah dengan tanda titik (.). Contohnya sebagai berikutexit:

expancer.drive() // enjoy your ride with expancer
erlima.brake() // the erlima car is about to stop, hang on!
bujero.horn() // "honk! honk!"
Method
Sintaks constructor pada class merupakan method khusus, dimana dilakukan inisialisasi properties, yang akan dieksekusi secara otomatis ketika class dibuat, dan ia harus memiliki nama "constructor". (Jika tidak dituliskan, maka Javascript akan menambahkan method constructor kosong secara otomatis).

Kita juga dapat membuat method sendiri, dengan sintaks yang sudah biasa kita gunakan:

class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present() {
    return "I have a " + this.carname;
  }
}

mycar = new Car("Ford");
console.log(mycar.present()) // I have a Ford
Seperti yang terlihat pada contoh di atas, method dapat digunakan dengan cara memanggil nama class dan method nya ditambah dengan kurung buka dan kurung tutup. Parameter bisa dimasukan di dalam tanda kurung jika diperlukan, seperti pada contoh di bawah.

class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present(x) {
    return x + ", I have a " + this.carname;
  }
}

mycar = new Car("Ford");
console.log(mycar.present("Hello"));
Static Method
Static methods didefinisikan hanya untuk class itu sendiri. sehingga, jika melihat pada contoh sebelumnya static method hanya bisa diakses melalui Car, dan tidak bisa melalui mycar:

 class Car {
  constructor(brand) {
    this.carname = brand;
  }
  static hello() {
    return "Hello!!";
  }
}

mycar = new Car("Ford");

// memanggil 'hello()' pada class Car:
console.log(Car.hello());

// dan tidak bisa pada 'mycar':
// console.log(mycar.hello());
// jika menggunakan sintaks tersebut akan memunculkan error.
Inheritance
Untuk membuat inheritance dari suatu class, gunakan keyword extends. Class yang dibuat dengan metode inheritance, akan memiliki method yang sama dengan class asalnya. Contoh berikut adalah class Model yang merupakan inheritance dari class Car:

 class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present() {
    return 'I have a ' + this.carname;
  }
}

class SuperCar extends Car {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

mycar = new SuperCar("Ford", "Mustang");
console.log(mycar.show());
Method super() mengacu pada class asalnya, dimana dengan menggunakan method super()  di dalam method constructor, kita dapat memanggil constructor class asalnya dan mengakses property dan method nya.

Getters dan Setters
Pada class juga kita dapat menggunakan getter dan setter. getter dan setter dapat digunakan untuk melakukan proses tertentu pada suatu property, sebelum property tersebut digunakan. Untuk menambahak getter dan setter pada class, gunakan keyword get dan set. (Meskipun getter merupakan sebuah method, namun dalam menggunakannya tidak digunakan "( )" setelah memanggil method tersebut, seperti pada contoh di bawah).

 class Car {
  constructor(brand) {
    this.carname = brand;
  }
  get cnam() {
    return this.carname;
  }
  set cnam(x) {
    this.carname = x;
  }
}

mycar = new Car("Ford");
console.log(mycar.cnam); // Ford
// getter cnam digunakan tanpa "()"
Biasanya untuk membedakan method dengan property, property ditulis dengan menggunakan "_" di depan namanya, sementara method (termasuk getter dan setter) tidak.

class Car {
  constructor(brand) {
    this._carname = brand;
  }
  get carname() {
    return this._carname;
  }
  set carname(x) {
    this._carname = x;
  }
}

mycar = new Car("Ford");
mycar.carname = "Volvo"; // memanggil setter, mengubah Ford menjadi Volvo
console.log(mycar.carname); // Volvo

Relasi Antar class
Di dalam konsep pemrograman OOP kita dapat membuat suatu program dengan mengimplementasikan relasi antar class yang terdapat pada program tersebut. OOP menganggap segala sesuatu dapat digambarkan sebagai object yang mempunyai atribut dan metode tertentu dan dapat berinteraksi dengan object lainnya. 

Contohnya: sebuah object dari class University dapat memiliki atribut nama, alamat, tahun berdiri, dst. class University tersebut memiliki relasi dengan class Department dan class Student. Contoh relasinya yaitu suatu object University memiliki banyak object Department di dalamnya, dan University dapat mendaftarkan Student baru sebagai peserta didik nya. 

Terdapat tiga relasi antar class yaitu : Association, Aggregation, dan Composition.

Association
Assosiasi adalah sebuah relasi dimana semua object memiliki lifecycle nya sendiri dan tidak ada yang bertindak sebagai parent/owner atas class lainnya. Contohnya class Teacher dan class Student. Teacher dapat memiliki banyak Student. Begitu pun Student dapat memiliki banyak Teacher yang diikuti. Kedua class dapat membuat Object nya masing-masing tanpa tergantung oleh object lain. Ketika object Teacher dihapus maka object Student tetap ada.

class Teacher {

  constructor(name) {

    this._name = name

    this._students = []

  }

  addStudent(student) {

    this._students.push(student)

  }

  get students() {

    return this._students

  }

}

class Student {

  constructor(name) {

    this._name = name

    this._teachers = []

  }

  chooseTeachers(teacher) {

    this._teachers.push(teacher)

  }

  get teachers() {

    return this._teachers

  }

}

// Masing masing class dibuat object nya sendiri-sendiri

const abduh = new Teacher("abduh")

const regi = new Student("Regi")

// suatu object dapat memiliki object class lainnya 

abduh.addStudent(regi)

console.log(abduh.students)

regi.chooseTeachers(abduh)

console.log(regi.teachers)
 

Aggregation
Aggregation adalah relasi yang lebih khusus dari Association dimana suatu class dapat berdiri sendiri tapi terdapat class child dan class parent. class yang menjadi child  tidak dapat memiliki class parent sedangkan class Parent dapat memiliki class child. Kedua class dapat membuat object nya masing-masing tanpa tergantung oleh object lain. Ketika object Parent dihapus maka object child tetap ada (tidak ikut terhapus).

Contohnya adalah Teacher dan Department. Suatu Department dapat memiliki banyak Teacher. Tapi Teacher tidak dapat memiliki Department. Ketika object Department dihapus/tidak ada maka object Teacher tetap ada. 

class Teacher {

  constructor(name) {

    this._name = name

    this._students = []

  }

  addStudent(student) {

    this._students.push(student)

  }

  get students() {

    return this._students

  }

}

class Department {

  constructor(name) {

    this._name = name

    this._teachers = []

  }

  assignTeacher(teacher) {

    this._teachers.push(teacher)

  }

  get teachers() {

    return this._teachers

  }

}

// Object Creation
const abduh = new Teacher("abduh")
const fmipa = new Department("FMIPA")

fmipa.assignTeacher(abduh)

console.log(fmipa.teachers)
 

Composition
Composition adalah relasi antar dua object dimana lifecycle object child bergantung dengan object parent nya. Ciri dari relasi ini yaitu object child diinstance di dalam class parent nya. Berbeda dengan aggregation, di dalam composition ketika object parent nya tidak ada / dihapus maka object child akan ikut terhapus. 

Contohnya adalah University dan Department. suatu Department hanya akan eksis di suatu University tertentu. Ketika University nya dihapus/tidak ada maka Department akan ikut terhapus. 



class Department {

  constructor(name) {

    this._name = name

    this._teachers = []

  }

  assignTeacher(teacher) {

    this._teachers.push(teacher)

  }

  get teachers() {

    return this._teachers

  }

}


class University {

  constructor(name) {

    this._name = name

    this._departments = []

  }

  addDepartment(department_name) {
    var department = new Department(department_name)
 
    this._departments.push(department)

  }

  get departments() {

    return this._departments

  }

}
const itebe = new University("itebeh")

itebe.addDepartment("fmipa")

console.log(itebe.departments)
 
 

 

Sumber
1. https://adnansetiawan.com/2017/01/15/perbedaan-asosiasi-agregasi-dan-komposisi-pada-object-oriented-programming/

 