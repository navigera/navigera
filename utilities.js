export async function GetProduct(id) {
    if (id.length == 10) {
        console.log('we have contact, id is ' + id);

        let response = await (await fetch("https://europe-west2-ikea-mau-eu.cloudfunctions.net/api/getProduct/" + id)).json();

        console.log('response: ', response);

        let product = response.product;

        console.log('product: ', product);

        if(!product.error){
            return product;
        }
    }
}