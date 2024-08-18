

/**
 * 
 * @param { String | Number } id 
 */
export const deleteUserById = async ( id ) => {
    
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
    const res = await fetch( url, {
        method: 'DELETE',
    });

    const deleteResult = await res.json(); // Necesita un mejor manejo en caso no se pueda eliminar el registro.
    // console.log(res);

    return true;

}