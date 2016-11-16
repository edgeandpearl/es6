class Task {

    constructor(title = Task.getDefaultTitle()){
        this.title = title;
        this.done = false;
        Task.count +=1;
        console.log('Создание задачи');
    }

    complete(){
        this.done = true;
        console.log(`Задача "${this.title}" выполнена`);
    }

    static getDefaultTitle(){
        return 'Задача';
    }
}

Task.count = 0;

let task = new Task('Убрать комнату');
let task2 = new Task('Купить продукты');
let task3 = new Task();



console.log(task.title);
console.log(task2.title);
console.log(task3.title);
console.log(Task.count);

task2.complete();












