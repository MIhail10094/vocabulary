const inputsEn = document.getElementById('inputs-en'),
      inputsRu = document.getElementById('inputs-ru'),
      inputs = document.querySelectorAll('input'),
      btn = document.getElementById('btn'),
      table = document.getElementById('total');

let words;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

console.log(words)

let addWordTable = index => {
    if(words[index].translate.length > 0 && words[index].rusian.length > 0){
        table.innerHTML += `
        <div class="total-wrap">
            <div>${words[index].translate}</div> -
            <div>${words[index].rusian}</div>
            <button class="btn-delete">Удалить слово</button>
        </div>`
    } 
}

words.forEach((el, i)=>{
    addWordTable(i)
});

class CreateWord {
    constructor (translate, russian){
        this.translate = translate;
        this.rusian = russian;
    }
}

btn.addEventListener('click', () => {
    if(
        inputsEn.value.length < 1 ||
        inputsRu.value.length < 1 ||
        !isNaN(inputsEn.value)    ||
        !isNaN(inputsRu.value)
    ){
        for(let key of inputs){
            key.classList.add('error')
        }
        inputsEn.value = '';
        inputsRu.value = '';
    } else {
        for(let key of inputs){
            key.classList.remove('error')
        }
        words.push(new CreateWord(inputsEn.value, inputsRu.value))
        localStorage.setItem('words', JSON.stringify(words));
        addWordTable(words.length - 1);
    }
    inputsEn.value = '';
    inputsRu.value = '';
    delet()
})

let btnDelete;

const deleteWord = e =>{
    const totalIndex = e.target.parentNode.rowIndex;
    e.target.parentNode.remove();
    words.splice(totalIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
}
const delet = () =>{
    btnDelete = document.querySelectorAll('.btn-delete')
    for(let key of btnDelete){
    key.addEventListener('click', e =>{
        deleteWord(e)
    })
}}

delet();


