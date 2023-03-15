<script>
    import moment from "moment"
    import { page } from "$app/stores"
    import { initFlash } from "sveltekit-flash-message/client"

    const flash = initFlash(page)
    
    /** @type {import("./$types").PageData} */
    export let data
</script>

{#if $flash}
    {#if $flash.type === "success"}
        <h1 style="color: chartreuse">
            {$flash.message}
        </h1>
    {:else}
        <h1 style="color: crimson">
            {$flash.message}
        </h1>
    {/if}
{/if}

<h1>{data.data.name}</h1>
<hr>
<p>Price: {data.data.price}€</p>
<p>Quantity: {data.data.quantity}</p>
<p>Created at: {moment(data.data.createdAt).format("DD.MM.YYYY. HH:mm")}</p>
<p>Last updated at: {moment(data.data.updatedAt).format("DD.MM.YYYY. HH:mm")}</p>
<br>

<a href="{$page.url}/edit">
    <input type="button" value="Edit"/>
</a>
<a href="{$page.url}/delete">
    <input type="button" value="Delete" />
</a>