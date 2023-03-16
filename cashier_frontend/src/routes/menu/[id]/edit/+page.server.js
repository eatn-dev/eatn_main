import { error } from "@sveltejs/kit"
import { redirect } from "sveltekit-flash-message/server"
import { GATEWAY_URL } from "$env/static/private"

/** @type {import("./$types").PageLoad} */
export async function load({ fetch, params }){
    const response = await fetch(`${GATEWAY_URL}/items/${params.id}`)

    const body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    return body 
}

export const actions = {
    default: async(event) => {
        const formData = await event.request.formData();

        // check if menu item exists before doing anything

        let response = await fetch(`${GATEWAY_URL}/items/${event.params.id}`)

        if(!response.ok){
            throw error(response.status)
        }
        
        let data = Object.fromEntries(formData)

        // cast price to numeric because form sends it as string
        data.price = parseFloat(data.price)

        response = await event.fetch(`${GATEWAY_URL}/items/${event.params.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            return { success: false, message: "Something went wrong."}
        }

        throw redirect(
            301,
            `/menu/${event.params.id}`,
            {
                type: "success",
                message: "Menu item edited successfully"
            },
            event
        )
    }
}
