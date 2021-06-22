let editor = document.querySelector('.issue-editor');
let editform = document.querySelector('.issue-edit-form');
let submitter = document.querySelector('.issue-edit-submitter');

new Quill(editor, {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false]}, 'bold', 'italic', 'underline', {'list': 'bullet'}, {'align': ['', 'center', 'right']}, 'link', 'image', 'code']
        ]
    },
    placeholder: 'Voeg hier je documentatie toe',
    theme: 'snow'
});

let qleditor = editor.querySelector('.ql-editor');
qleditor.innerHTML = editor.dataset.content;
editor.removeAttribute('data-content');

submitter.addEventListener('click', (e) =>{
    e.preventDefault();

    let titleinput = editform.querySelector('.issue-title-input');

    if(titleinput.value !== ""){
        let submitinput = document.querySelector('#known_issue_content');
        submitinput.value =  qleditor.innerHTML;
        editform.submit();
    }
});
