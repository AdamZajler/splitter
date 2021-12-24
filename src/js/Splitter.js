class Splitter{
    constructor(){
        this.isInputEmpty();
        this.clickableTip();
    }
    
    isInputEmpty(){
        const self = this;
        
        // Get Bill & People input
        let inputs = document.querySelectorAll("input[name='bill'], input[name='people']")
        
        inputs.forEach((input) => {
            // If user is typing nothing or 0 add class error, 
            // otherwise remove those classes
            input.addEventListener("input", function () {
                if(this.value === "" || this.value === "0"){
                    this.closest("label").classList.add("error")
                }else{
                    this.closest("label").classList.remove("error")
                }
            });
            input.addEventListener("blur", function () {
                // On leave calculate result
                self.caluclate();

                // If user is leaving with nothing or 0 add class error, 
                // otherwise remove those classes
                if(this.value === "" || this.value === "0"){
                    this.closest("label").classList.add("error")
                }else{
                    this.closest("label").classList.remove("error")
                }
            });
            
            // When user is typing calculate everything
            input.addEventListener("input", function () {
                // When user is typing calculate result
                self.caluclate();
            })
        })
    }

    clickableTip(){
        const self = this;

        // Get all tip options
        let tips = document.querySelectorAll(".tips > .tip");

        // Check if any tip has "active" class, if there is any, remove it's class
        function checkOthers(tip){
            for(let i=0; i<tips.length; i++){
                if(tips[i].classList.contains("active") & tips[i] != tip){
                    tips[i].classList.remove("active")
                }
            }
        }

        tips.forEach((tip) => {
            tip.addEventListener("click", function() {
                checkOthers(tip);
                this.classList.toggle("active");

                // When user is clicking calculate result
                self.caluclate();
            })
        })
    }

    checkAllFields(){
        let bill = document.querySelector("input[name='bill']");
        let tip = document.querySelector(".tips > .tip.active");
        let people = document.querySelector("input[name='people']");
        
        if( bill.value == 0 || people.value == 0 || tip == null) {
            document.querySelector(".summary-amount h2").textContent = "$0.00";
            document.querySelector(".summary-total h2").textContent = "$0.00";
            return false;
        };
       
        // If tip is selected but it's custom 
        if(tip != null && tip.classList.contains("tip-custom")){
            if(tip.value == 0) {
                document.querySelector(".summary-amount h2").textContent = "$0.00";
                document.querySelector(".summary-total h2").textContent = "$0.00";
                return false;
            };
        }

        return true;
    }

    caluclate(){
        // If any field is filled wrong
        if(this.checkAllFields() == false) return;

        // Show RESET button
        document.querySelector(".reset > .btn").classList.add("active");

        // Get all fields values
        let textBill = document.querySelector("input[name='bill']").value;
        let textTip = document.querySelector(".tips > .tip.active");
        let textPeople = document.querySelector("input[name='people']").value;
        let tipHolder;

        // If tip field is custom get it's value
        if(textTip.classList.contains("tip-custom")){
            tipHolder = textTip.value / 100;
        }else{
            // If tip field is just div, then cut it's "%"
            textTip = textTip.textContent;
            tipHolder = textTip.replace("%", "");
            tipHolder = parseInt(tipHolder) / 100;
        }

        // Make every string a integer
        let bill = parseFloat(textBill);
        let tip = parseFloat(bill * tipHolder);
        let people = parseInt(textPeople);
console.log("bill: ", bill, "tip: ", tip, " people: ", people)

        let costs = bill + tip;
        let personTip = tip / people;
        let personTotal = costs / people;
        console.log("costs: ", costs, "personTip: ", personTip, " personTotal: ", personTotal)

        document.querySelector(".summary-amount h2").textContent = `$${personTip.toFixed(2)}`;
        document.querySelector(".summary-total h2").textContent = `$${personTotal.toFixed(2)}`;
    }

    static reset(){
        if(!document.querySelector(".reset > .btn.active")) return;

        document.querySelector("input[name='bill']").value = null;
        document.querySelector(".tips > .tip.active").classList.remove("active")
        document.querySelector("input[name='people']").value = null;

        document.querySelector(".summary-amount h2").textContent = "$0.00";
        document.querySelector(".summary-total h2").textContent = "$0.00";
        document.querySelector(".reset > .btn").classList.remove("active");
    }
}
window.addEventListener('DOMContentLoaded', () => {
    new Splitter;

    document.querySelector(".btn").addEventListener("click", function () {
        Splitter.reset()
    })
});