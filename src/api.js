export async function fetchBlogData(language) {
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/blog`)
    
    let result = await response.json()
    let main_response = result[language]

    sessionStorage.setItem('blogData', JSON.stringify(result));

    return main_response;
}

export async function fetchProjectsData(language) {
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/projects`)
    
    let result = await response.json()
    let main_response = result[language]

    sessionStorage.setItem('projectsData', JSON.stringify(result));

    return main_response;
}