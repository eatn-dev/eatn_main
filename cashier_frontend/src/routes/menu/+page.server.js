import { error } from "@sveltejs/kit"
import { loadFlashMessage } from "sveltekit-flash-message/server"

/** @type {import("./$types").PageLoad} */
export const load = loadFlashMessage( async ({ fetch }) => {
    const url = "http://menu_items_api:5000/items"
    const options = {
        method: "GET"
    }

    const response = await fetch(url, options)

    const body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    return body 
})