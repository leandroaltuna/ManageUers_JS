import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user"


/**
 * 
 * @param { Like<User> } userLike 
 */
export const saveUser = async ( userLike ) => {

    const user = new User( userLike );
    const userToSave = userModelToLocalhost( user );

    let updatedUser;

    if ( user.id ) {
        updatedUser = await updateUser( userToSave );

    } else {
        updatedUser = await createUser( userToSave );
    }

    return localhostUserToModel( updatedUser );
}

/**
 * 
 * @param { Like<User> } user 
 */
const createUser = async ( user ) => {
    
    const url = `${ import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch( url, {
        method: 'POST',
        body: JSON.stringify( user ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();

    return newUser;

}

/**
 * 
 * @param { Like<User> } user 
 */
const updateUser = async ( user ) => {
    
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`;
    const res = await fetch( url, {
        method: 'PATCH', // PATCH solo actualiza lo que envio, PUT actualiza todo el objeto por el id.
        body: JSON.stringify( user ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();

    return updatedUser;

}