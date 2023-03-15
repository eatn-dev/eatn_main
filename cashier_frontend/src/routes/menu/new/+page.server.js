import { redirect } from "sveltekit-flash-message/server"

/** @type {import("./$types").Actions} */
export const actions = {
    default: async (event) => {

        const formData = await event.request.formData();

        let data = Object.fromEntries(formData)

        // cast price to numeric because form sends it as string
        data.price = parseFloat(data.price)

        const url = `http://menu_items_api:5000/items`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await event.fetch(url, options)

        if(!response.ok){
            return { success: false, message: "Something went wrong."}
        }

        throw redirect(
            301,
            "/menu",            {
                type: "success",
                message: "Menu item added successfully"
            },
            event
        )
    }
}