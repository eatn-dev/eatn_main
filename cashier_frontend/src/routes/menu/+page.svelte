<script>
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

<a href="{$page.url}/new">
    <input type="button" value="Create new menu item"/>
</a>
<br>

{#each data.data as item}
    <a href="{$page.url}/{item.id}"><h1>{item.name}</h1></a>
    <hr>
    <p>Price: {item.price}€</p>
    <p>Quantity: {item.quantity}</p>
    <br>
{/each}
