/**
 * Created by helgastogova on 20.01.17.
 */
class mainPage extends Site {
    constructor() {
        super();
        //vars
        this.example_val = true;
    }

    initFUn() {
        $('body').on('load', ()=>{
            this.example_fun(this.example_val);
        });
    }

}


new mainPage();
