<script>
    /** @type {import("./$types").PageData} */
    import { page } from "$app/stores"

    let backUrl = $page.url.toString().split("/").slice(0, - 1).join("/")
    
    /** @type {import("./$types").ActionData} */
    export let form

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
    Create new menu item
</h1>
<hr>
<form method="POST">
    <label>
        Name
        <br>
        <input type="text" name="name" placeholder="Name" required />
    </label>
    <br><br>
    
    <label>
        Quantity
        <br>
        <input type="text" name="quantity" placeholder="Quantity" required />
    </label>
    <br><br>

    <label>
        Price
        <br>
        <input type="number" name="price" placeholder="Price" min="0.01" value="0.01" step=".01" required />
    </label>
    <br><br>
    
    <a href="{backUrl}">
        <input type="button" value="Go back"/>
    </a>
    <input type="submit" />
</form>