export const getUsers = ({ limit, offset }) => {
    console.log('shivsoni')
    return fetch(`http://localhost:8000/getusers?limit=${limit}&offset=${offset} `)
        .then(res => res.json())
        .catch(err => {
            console.log('API Error:', err);
            throw err;
        });
}