
//Elementlerin Seçim İşlemi
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const seconCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");


eventListeners();

//Tüm event listenerlar bu fonksiyonda çağırılır
function eventListeners(){
    form.addEventListener("submit",addTodo);
    //Sayfa yüklendiğinde çalışıcak olan event.
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);

    seconCardBody.addEventListener("click",deleteTodo);

    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}


//Tüm todoları temizleme işlemi.
function clearAllTodos(){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        //Arayüzden Todoları Temizleme 
        todoList.innerHTML="";

        //Local storageden tüm todoları silme işlemi.
        localStorage.removeItem("todos");
    }



}

//Todoları filtreler.
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();


    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem){
        const text=listItem.textContent.toLowerCase();
        //Eleman içinde geçmiyorsa gösterme geçiyorsa göster.
        if(text.indexOf(filterValue)===-1){
            //Bulunamadığı durumlarda
            listItem.setAttribute("style","display:none !important");
        }
        else{
            listItem.setAttribute("style","display:block");
        }
    });
}


//Todoları ui dan siler.
function deleteTodo(e){
    //Eğer tıkladığımız elementin class ismi fa fa remove ise 
    if(e.target.className=="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        textTodo= e.target.parentElement.parentElement.textContent;
        deleteTodoFromStorage(textTodo);
        showAlert("success","Todo Başarıyla Silindi...",firstCardBody);
    }

}


//local storagedan eleman silme işlemi.
function deleteTodoFromStorage(todo){
    let todos=getTodosFromStorage();
    todos.forEach(function (t,index){
        if(todo===t){
            //Verilen indexten itibaren bir eleman silinir.
            todos.splice(index,1);
            
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}





//Sayfa İlk Yüklendiğinde Ekrana Todoların Gelmesini Sağlar
function loadAllTodosUI(){
    let todos=getTodosFromStorage();


    //Todo üzerinde gezilerek storagedaki todolar ekrana gelir.
    todos.forEach(function (todo){
        addTodoToUI(todo);
    });

}



function addTodo(e){
        const newTodo=todoInput.value.trim();

        if(newTodo===""){
            showAlert("danger","Lutfen Alanı Boş Bırakmayınız...",firstCardBody);
        }
        else{
            //Gelen degerler bos degil ise ekleme islemi yapılır.
            showAlert("success","Todo Basarıyla Eklendi...",firstCardBody);
            addTodoToUI(newTodo);
            addTodoToStorage(newTodo);
        }
        

        //preventDefault eventın varsayılan özelliklerini sıfırlar.
        e.preventDefault();
}

//Bootstrap yardımı ile alert ekler değişkenler sayesinde alertin tipi alertin texti ve nereye ekleneceği belirlenebilir.
function showAlert(alertType,alertText,alertPosition){
    const alert=document.createElement("div");

    //Template Literal
    alert.className=`alert alert-${alertType}`;
    alert.textContent=alertText;
    alertPosition.appendChild(alert);

    //Bunun sayesinde 1.5 saniye oluşturulan alert silinebilir.
    setTimeout(function(){
        alert.remove();
    },1500);


}



//Alınan değeri UI a ekliyecek olan fonksiyon
function addTodoToUI(newTodo){  
    const newElement=document.createElement("li");
    const newLink=document.createElement("a");
   
    //Link Oluşturma Ve Özelliklerinin Verilmesi
    newLink.href="#";
    newLink.className="delete-item";
    newLink.innerHTML="<i class='fa fa-remove'></i>";

    //Li elemanını özelliklerinin verilme işlemi
    newElement.className="list-group-item d-flex justify-content-between";
    //text node olarak eklenmesinin sebebi içindeki çocukların silinmesinin engellenmesi
    newElement.appendChild(document.createTextNode(newTodo));
    //oluşturulan a elemanının li elemanına eklenmesi
    newElement.appendChild(newLink);

    //Todo Liste Eklenmesi
    todoList.appendChild(newElement);

    //Ekleme işleminden sonra inputun içi boşaltıldı.
    todoInput.value="";
}



//Storage dan Todoları getirir.
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")==null){
       todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

     return todos;
}


//Todoları Storage'a ekler 
function addTodoToStorage(newTodo){
    //Todoları storagedan çekme.
    let todos=getTodosFromStorage();

    todos.push(newTodo);

    //Local storage a array stringe çevrilerek eklendi.
    localStorage.setItem("todos",JSON.stringify(todos));
}





