export const getUsers = ({ limit, offset, keyword}) => {
    console.log('shivsoni')
    return fetch(`http://localhost:8000/getusers?limit=${limit}&offset=${offset}&keyword=${keyword}`)
        .then(res => res.json())
        .catch(err => {
            console.log('API Error:', err);
            throw err;
        });
}