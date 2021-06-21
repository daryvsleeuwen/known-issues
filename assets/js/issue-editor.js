let editor = document.querySelector('.issue-editor');
let editform = document.querySelector('issue-edit-form');
let submitter = document.querySelector('issue-edit-submitter');

new Quill(editor, {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false]}, 'bold', 'italic', 'underline', {'list': 'bullet'}, {'align': ['', 'center', 'right']}, 'link']
        ]
    },
    placeholder: 'Voeg een known issue beschrijving toe',
    theme: 'snow'
});

let qleditor = editor.querySelector('.ql-editor');
qleditor.innerHTML = editor.dataset.content;

// submitter.addEventListener('submit', (e) =>{
//     e.preventDefault();
//
//
//
//     editform.submit();
// })
