window.addEventListener('load', () =>{
    let issuesdashboard = document.querySelector('.issues-dashboard');
    let issues = document.querySelectorAll('.issue-box');
    let emptysearchstate = document.querySelector('.empty-search-state');
    let searcher = document.querySelector('.search-input');

    searcher.addEventListener('input', () =>{
        filterIssues(searcher.value);
    });

    searcher.focus();

    const filterIssues = (filterstring) =>{
        let filtered = [];
        issuesdashboard.innerHTML = "";

        issues.forEach((issuebox) =>{
            let title = issuebox.querySelector('.issue-title').textContent;
            let content = issuebox.querySelector('.issue-content-box').innerHTML;

            if(title.toLowerCase().includes(filterstring.toLowerCase()) || content.toLowerCase().includes(filterstring.toLowerCase())){
                let copy = issuebox.cloneNode(true);
                filtered.push(copy);
            }
        });

        if(filtered.length === 0){
            issuesdashboard.textContent = `Geen zoekresultaten voor '${filterstring}'`;
            issuesdashboard.classList.add('centered-text');
            emptysearchstate.classList.remove('hidden');
        }
        else{
            issuesdashboard.classList.remove('centered-text');
            emptysearchstate.classList.add('hidden');

            filtered.forEach((filteredissue) =>{
                issuesdashboard.appendChild(filteredissue);
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
