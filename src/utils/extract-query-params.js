
export function extractQueryParams(query){
    
    if(!query) return {}

    //console.log('query', query); query = "?search=Harry&order=desc"
    
    const splitParams = query.substr(1).split("&");
    //console.log('splitParams', splitParams); // ['search=Harry',  'order=desc']

    return splitParams.reduce((queryParams, param) => {
        
        const [key, value] = param.split("=");
        //console.log('key', key, '-', 'value', value);
        // 1 - key search - value Harry
        // 2 - key search - value Harry etc

        // Accumulate
        queryParams[key] = value;
        // 1 - { search: 'Harry' }
        // 2 - { search: 'Harry', order: 'desc' }

        return queryParams; // { search: 'Harry', order: 'desc' }
    }, {});
}