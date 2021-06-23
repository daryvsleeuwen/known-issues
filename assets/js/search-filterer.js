window.addEventListener('load', () =>{
    let issuesdashboard = document.querySelector('.issues-dashboard');
    let wrapper = document.querySelector('.issues-box-wrapper');
    let issues = document.querySelectorAll('.issue-box');
    let emptysearchstate = document.querySelector('.empty-search-state');
    let searcher = document.querySelector('.search-input');
    let full = wrapper.innerHTML;

    searcher.addEventListener('input', () =>{
        filterIssues(searcher.value);
    });

    searcher.focus();

    const filterIssues = (filterstring) =>{
        let filtered = [];
        wrapper.innerHTML = "";

        issues.forEach((issuebox) =>{
            let title = issuebox.querySelector('.issue-title').textContent;
            let content = issuebox.querySelector('.issue-content-box').innerHTML;

            if(title.toLowerCase().includes(filterstring.toLowerCase()) || content.toLowerCase().includes(filterstring.toLowerCase())){
                let copy = issuebox.cloneNode(true);
                filtered.push(copy);
            }
        });

        if(filtered.length === 0){
            wrapper.textContent = `Geen zoekresultaten voor '${filterstring}'`;
            emptysearchstate.classList.remove('hidden');
        }
        else{
            emptysearchstate.classList.add('hidden');

            filtered.forEach((filteredissue) =>{
                wrapper.appendChild(filteredissue);
            });
        }
    }

    issues.forEach((issue) =>{
        let header = issue.querySelector('.issue-header');
        let height = header.getBoundingClientRect().height;
        let expanded = false;

        header.addEventListener('click', () =>{
            if(expanded){
                issue.style.height = `unset`;
                expanded = false;
            }else{
                issue.style.height = `${height}px`;
                expanded = true;
            }
        });
    });
});
