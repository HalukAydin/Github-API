//Elementleri Seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUser = document.getElementById("clear-last-users");
const lastusers = document.getElementById("last-users");
const github = new Github(); 
const ui = new UI();
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUser.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    let username = nameInput.value.trim();

    if(username===""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz.");
    }
    else{
        github.getGithubData(username)
        .then(response=>{
            if(response.user.message==="Not Found"){
                ui.showError("Kullanıcı Bulunamadı");
            }
            else{

                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err=>ui.showError(err));
    }


    ui.clearInput();
    e.preventDefault();
}
function clearAllSearched(){
    //Tüm arananları temizle.
    if(confirm("Emin misiniz ?")){
        Storage.clearAllSearchedUserFromStorage();
        ui.clearAllSearchedUserFromUI();
    }
    


}
function getAllSearched(){
    //Arananları storagedan al ve UI ye ekle.
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user=>{
        result += `<li class="list-group-item">${user}</li> `;
    });

    lastusers.innerHTML = result;

}

