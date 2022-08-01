
class Book{
    constructor(g,t,a,p){
        this.genre=g;
        this.title=t;
        this.author=a;
        this.price=p;
    }
}

class UI{
    static addbooktolist(book){
        const list=document.querySelector("#book-list"); //<tbody></tbody>
        const row=document.createElement("tr"); //<tr></tr>
        row.innerHTML=`
        <td>${book.genre}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row);
    }

    static clearallfields(){
        document.querySelector("#genre").value='';
        document.querySelector("#title").value='';
        document.querySelector("#author").value='';
        document.querySelector("#price").value='';
    }

    static displaybooks(){
        // const storedBooks=[
        //     {
        //         genre:"Genre 1",
        //         title:"Title 1",
        //         author:"Author 1",
        //         price:"Price 1"
        //     },
        //     {
        //         genre:"Genre 2",
        //         title:"Title 2",
        //         author:"Author 2",
        //         price:"Price 2"
        //     },
        //     {
        //         genre:"Genre 3",
        //         title:"Title 3",
        //         author:"Author 3",
        //         price:"Price 3"
        //     }
        // ]
        const storedBooks=Store.getbooks();
        console.log(storedBooks);

        storedBooks.forEach((book)=>{              
            UI.addbooktolist(book);
        })
    }

    static showalert(msg, className){
    const div=document.createElement("div");  //<div></div>
       div.className=`alert alert-${className}`; //<div class=alert alert-success></div>
       div.appendChild(document.createTextNode(msg));
       const form=document.querySelector("#book-form");
       const container=document.querySelector(".container");
       container.insertBefore(div,form);
       setTimeout(function(){
        document.querySelector(".alert").remove();
       },2000);
    }

    static deletebook(et){                                      //et takes e.target as parameter as in line104
        if(et.classList.contains("delete")){
            if(confirm("Are you sure you want to delete this item"))
            et.parentElement.parentElement.remove();
            else
            UI.showalert("Item not deleted","info");
        }
    }
}

class Store{

    static getbooks(){
        let books;
        if(localStorage.getItem("books")===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem("books"))
        }
        return books;
    }

    static addbooks(book){                                          //book here is the constructor we made above
        const books=Store.getbooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static removebook(price){
        const books=Store.getbooks();
        books.forEach((book,index)=>{
            if(book.price==price){
                books.splice(index,1);
            }
        })
        localStorage.setItem("books",JSON.stringify(books));
    }
}

// let book1=new Book("Romance","Two States","Chetan Bhagat","500");

document.querySelector("#book-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const genre=document.querySelector("#genre").value;
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const price=document.querySelector("#price").value;
    if (genre=="" || title=="" || author=="" || price==""){
        UI.showalert("Please fill all required fields","danger")
    }
    else{
        const book=new Book(genre,title,author,price);   //object of Book created(book)
        // console.log(book);

       UI.addbooktolist(book);
       UI.clearallfields();
    //    alert("Book Added Successfully")
       UI.showalert("Book Added Successfully","success");
       Store.addbooks(book);
    }
})

document.querySelector("#book-list").addEventListener("click",function(e){
   UI.deletebook(e.target)
   Store.removebook(e.target.parentElement.previousElementSibling.textContent);
})

document.addEventListener("DOMContentLoaded",UI.displaybooks);
