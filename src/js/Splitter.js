class Splitter{
    constructor(){
        this.isInputEmpty();
        this.clickableTip();
    }
    
    checkAllFields(){
        let bill = document.querySelector("input[name='bill']");
        let tip = document.querySelector(".tips > .tip.active");
        let people = document.querySelector("input[name='people']");
        
        if( bill.value == 0 || people.value == 0 || tip == null) return false;
       
        if(tip != null && tip.classList.contains("tip-custom")){
            if(tip.value == 0) return false;
        }

        return true;
    }

    isInputEmpty(){
        let inputs = document.querySelectorAll("input[name='bill'], input[name='people']")
        
        inputs.forEach((input) => {
            input.addEventListener("input", function () {
                if(this.value === "" || this.value === "0"){
                    this.closest("label").classList.add("error")
                }else{
                    this.closest("label").classList.remove("error")
                }
            });
            input.addEventListener("blur", function () {
                if(this.value === "" || this.value === "0"){
                    this.closest("label").classList.add("error")
                }else{
                    this.closest("label").classList.remove("error")
                }
            })
        })
    }

    clickableTip(){
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
            })
        })
    }

    caluclate(){
        if(this.checkAllFields == false) return;
        
        let textBill = document.querySelector("input[name='bill']").value;
        let textTip = document.querySelector(".tips > .tip.active").textContent;
        let textPeople = document.querySelector("input[name='people']").value;

        let bill = parseInt(textBill);
        let tip = parseInt(textTip.replace("%", ""));
        let people = parseInt(textPeople);
console.log("bill: ", bill, "tip: ", tip, " people: ", people)

        let costs = bill + (bill * (tip / 100));
        let personTip = tip / people;
        let personTotal = costs / people;
        console.log("costs: ", costs, "personTip: ", personTip, " personTotal: ", personTotal)

        document.querySelector(".summary-amount h2").textContent = `$${personTip.toFixed(2)}`;
        document.querySelector(".summary-total h2").textContent = `$${personTotal.toFixed(2)}`;
    }
}
window.addEventListener('DOMContentLoaded', () => {
    new Splitter;
});

// document.querySelector(".btn").addEventListener("click", function () {
//     console.log("kilk")
//     let test = Splitter.checkAllFields();
//     console.log("wynik: ", test)
// })