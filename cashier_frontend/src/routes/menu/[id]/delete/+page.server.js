import { error } from "@sveltejs/kit"
import { redirect } from "sveltekit-flash-message/server"
import { GATEWAY_URL } from "$env/static/private"

/** @type {import("./$types").PageLoad} */
export async function load(event){
        const response = await event.fetch(`${GATEWAY_URL}/items/${event.params.id}`,
    {
        method: "DELETE"
    })

    if(!response.ok){
        throw error(response.status)
    }

    throw redirect(
        301,
        "/menu",
        {
            type: "success",
            message: "Menu item deleted successfully"
        },
        event
    )
}