const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.6NRiqq9P7KpR8Wrx2SWW6Xv4KMJkELoVBtoszBVcf1k"; // localStorage.getItem("jwtToken");

async function fetchWithAuth(url, method = "GET", body = null) {

    // Nastav hlavičky pro požadavek
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    // Nastav konfiguraci požadavku
    const requestOptions = {
        method,
        headers,
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    // Proveď požadavek a zpracuj odpověď
    const response = await fetch(url, requestOptions);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Chyba při získání dat z API");
    }
}

function decodeJwt(jwt) {
    try {
        // Rozdělení tokenu na části
        const tokenParts = jwt.split(".");
        if (tokenParts.length !== 3) {
            throw new Error("Neplatný JWT token.");
        }

        // Dekódování zatížení z Base64Url na normální řetězec
        const payloadBase64Url = tokenParts[1];
        const payloadBase64 = payloadBase64Url.replace("-", "+").replace("_", "/");
        const payloadJson = atob(payloadBase64);

        // Převod řetězce JSON na objekt
        const payload = JSON.parse(payloadJson);
        return payload;
    } catch (error) {
        console.error("Chyba při dekódování JWT:", error);
        return null;
    }
}

const jwt = token;
const decodedPayload = decodeJwt(jwt);

console.log(decodedPayload);


fetchWithAuth("/api/load").then((result) => {
    console.log(result); // Vypíše "Hello" po 2 sekundách
})
    .catch((error) => {
        console.error("Došlo k chybě:", error);
    });