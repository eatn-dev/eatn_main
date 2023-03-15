import { error } from "@sveltejs/kit"
import { loadFlashMessage } from "sveltekit-flash-message/server"

/** @type {import("./$types").PageLoad} */
export const load = loadFlashMessage( async ({ fetch, params }) => {
    const url = `http://menu_items_api:5000/items/${params.id}`

    const response = await fetch(url)

    const body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    return body 
})