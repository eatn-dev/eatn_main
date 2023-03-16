import { error } from "@sveltejs/kit"
import { loadFlashMessage } from "sveltekit-flash-message/server"
import { GATEWAY_URL } from "$env/static/private"

/** @type {import("./$types").PageLoad} */
export const load = loadFlashMessage( async ({ fetch, params }) => {
    const url = `${GATEWAY_URL}/items/${params.id}`

    const response = await fetch(url)

    const body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    return body 
})