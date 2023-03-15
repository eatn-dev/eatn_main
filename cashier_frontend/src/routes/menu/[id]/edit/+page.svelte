<script>
    import { page } from "$app/stores"

    let backUrl = $page.url.toString().split("/").slice(0, - 1).join("/")
    
    /** @type {import("./$types").ActionData} */
    export let form


    /** @type {import("./$types").PageData} */
    export let data
</script>

{#if !!form}
    {#if !form.success}
        <h1 style="color: crimson">
            {form.message}
        </h1>
    {:else}
        <h1 style="color: chartreuse">
            {form.message}
        </h1>
    {/if}
    
{/if}

<h1>
    Edit menu item
</h1>
<hr>
<form method="POST">
    <label>
        Name
        <br>
        <input type="text" name="name" placeholder="Name" value={data.data.name} required />
    </label>
    <br><br>
    
    <label>
        Quantity
        <br>
        <input type="text" name="quantity" placeholder="Quantity" value={data.data.quantity} required />
    </label>
    <br><br>

    <label>
        Price
        <br>
        <input type="number" name="price" placeholder="Price" min="0.01" step=".01" value={data.data.price} required />
    </label>
    <br><br>
    
    <a href="{backUrl}">
        <input type="button" value="Go back"/>
    </a>
    <input type="submit" />
</form>