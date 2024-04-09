src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"
let button = document.getElementById('button')
let printButton = document.getElementById("print-pdf-button");
let DATE = document.getElementById('dateInput')
let AMOUNT = document.getElementById('amountInput')
let DESCRIPTION = document.getElementById('descriptionInput')
let TYPE= document.getElementById('type')
let table = document.getElementById('table')
let class_name;
let expense_records =[];//local storage
//check to see if there is any date already stored in local storage
if(localStorage.getItem('expense_records')){

    expense_records=JSON.parse(localStorage.getItem('expense_records'))
    renderTable()// we initialize this function in a little bit, but run it doesn't exit yet XD
}
let inputs=[DATE,AMOUNT,DESCRIPTION]// useful to have these inputs in  an array if we need to loop over it
function add_expense(date='N/A',amount='N/A',type='N/A',description='N/A'){
    //essentially we created default parameters which will take precedence if the user doesn't input anything
    let DATE_OBJECT =new Date(DATE.value)//'Date' and 'DATE'may be spelled the same but have different meanings in js
    let FORMATTED_DATE = DATE_OBJECT.toLocaleDateString ('en-US',{month: '2-digit',day:'2-digit',year: 'numeric'})
     
    //now we assigning values to the parameters, otherwise they will store  "N/A" since that is defaulted
    date=FORMATTED_DATE
    type=TYPE.value
    amount =AMOUNT.value
    description=DESCRIPTION.value
    
    
    //this logic shown is responsible for  color-coding our different types of expenses to help you
    //get a good idea of which category you are spending the most on

    switch(TYPE.value){
        case 'Food':
            class_name ='food';
            break;
        case 'Clothing':
            class_name= 'clothing';
            break;
        case 'Debt':
            class_name ='debt';
            break;
        case 'Education':
            class_name ='education';
            break;
        case 'Miscellaneous':
            class_name ='miscellaneous';
            break;
    }
    //Adds the expense to the expense_records array
    expense_records.push({date,type,amount,description,class_name})
    //updates the local storage with the expense_records array
    updatelocalstorage()//we also need to init this function  as well in a little bit
    // Render the table with the update expense_records array
    renderTable();

function generateAndPrintPDF() {
        const doc = new jsPDF();
        // Add your expense details to the PDF
        doc.text("Expense Statement", 10, 10);
        // ... Add more content as needed

        // Save and print the PDF
        doc.save("expense-statement.pdf");
    }
}
function delete_expense(index){
    //this function might be useful in case you typed in the  wrong expense which will allow you to delete it
    // similar to a TO-DO list
    expense_records.splice(index,1)
    updatelocalstorage()
    //render the table with the update expense-records array
    renderTable()
}
function renderTable(){
    //clear the table  before rendering the updated  data
    table.innerHTML = '<tr>\
                   <th>Date</th>\
                   <th>Type</th>\
                   <th>Amount</th>\
                   <th>Description</th>\
                   <th>Action</th>\
                   </tr>';
 //render each expense record to the table
   expense_records.forEach((expense,index) => {
   let color_code=expense.class_name
   table.innerHTML += `<tr>
                    <td class="${color_code}">${expense.date}</td>
                    <td class="${color_code}">${expense.type}</td>
                    <td class="${color_code}">K${expense.amount}</td>
                    <td class="${color_code}">${expense.description}</td>
                    <td class="${color_code}"><button onclick="delete_expense(${index})" class="btn btn-primary btn-sm">Delete</button></td>
                   </tr>`;
   })
}
 function updatelocalstorage(){
    localStorage.setItem('expense_records',JSON.stringify(expense_records));
 }
 button.addEventListener('click',add_expense)
 // Event listener for printing PDF
 printButton.addEventListener("click", () => {
    generateAndPrintPDF();
});
 