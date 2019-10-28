export async function GetProduct(id) {
    if (id.length == 10) {

        let response = await (await fetch("https://europe-west2-ikea-mau-eu.cloudfunctions.net/api/getProduct/" + id)).json();


        let product = response.product;


        if(!product.error){
            return product;
        }
    }
}
