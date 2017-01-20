class mainPage extends Site {
    constructor() {
        super();
        //vars
        this.example_val = true;
        this.initFUn();
    }

    initFUn() {
        this.example_fun(this.example_val);
    }

}


new mainPage();
