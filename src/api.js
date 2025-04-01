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

export async function fetchExperienceData(language) {
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/experience`)
    
    let result = await response.json()
    let main_response = result[language]

    sessionStorage.setItem('experienceData', JSON.stringify(result));

    return main_response;
}

export async function fetchFormationData(language) {
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/formation`)
    
    let result = await response.json()
    let main_response = result[language]

    sessionStorage.setItem('formationData', JSON.stringify(result));

    return main_response;
}

export async function fetchRootData(language) {
    let response = await fetch(process.env.REACT_APP_ENDPOINT_API)
    
    let result = await response.json()
    let main_response = result[language]

    sessionStorage.setItem('rootData', JSON.stringify(result));

    return main_response;
}