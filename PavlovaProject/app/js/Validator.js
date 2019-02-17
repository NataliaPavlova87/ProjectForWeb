
class FormVal {
    constructor(mail, password){
        this.mail = this._selectMail(mail);
        this.password = this._selectPassword(password);
    }
    _selectMail(mail) {
        return document.getElementById('usermail').value;
    }
    _selectPassword(password) {
        return document.getElementById('password').value;
    }
    _allFields(mail, password) {
        if(this.mail === "" || this.password === "") {
            let newSpan = document.createElement("span");
            newSpan.innerHTML = "*";
            newSpan.classList.add("icon-star");
            document.getElementById("labelmail").appendChild(newSpan);
            let newSpanPas = document.createElement("span");
            newSpanPas.innerHTML = "*";
            newSpanPas.classList.add("icon-star");
            document.getElementById("labelpas").appendChild(newSpanPas);
            let newText = document.createElement('p');
            newText.innerHTML = "* Required Fileds";
            newText.classList.add('fileds');
            let submit = document.getElementById('submit');
            document.getElementById('myform').insertBefore(newText, submit);
            return;
        }
        return true;
    }
    _validMail(mail) {
        if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.mail)) {
            return true;
        }
        return false;
    }
    _classMailError() {
        let newSpanText = document.createElement("span");
        newSpanText.innerHTML = "Error";
        newSpanText.classList.add("icon-star-text");
        document.getElementById("labelmail").appendChild(newSpanText);
    }
    _removeClass() {
        let iconAll = document.querySelectorAll('.icon-star');
        for (let icon of iconAll) {
            icon.remove();
        }
        let textRemove = document.querySelectorAll('.fileds');
        for (let text of textRemove) {
            text.remove();
        }
    }
    _validCorrect() {
        return document.getElementById('valid').innerHTML = "Все заполнено верно.";
    }
    valid(mail, password) {
        this._removeClass();
        if (this._allFields((mail, password)) === true) {
            if(this._validMail(mail) === false) {
                return this._classMailError();
            }
            return this._validCorrect();
        }
    }
}
