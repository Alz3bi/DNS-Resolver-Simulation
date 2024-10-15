document.getElementById('resolveBtn').addEventListener('click', async () => {
    const domain = document.getElementById('domainInput').value;
    const ipAddressElement = document.getElementById('ipAddress');
    const tldServerElement = document.getElementById('tldServer');
    const authServerElement = document.getElementById('authServer');
    const cacheStatusElement = document.getElementById('cacheStatus');

    if (!domain) {
        alert('Please enter a domain name.');
        return;
    }

    try {
        // Perform DNS query using Google's DNS API
        const response = await fetch(`https://dns.google/resolve?name=${domain}`);
        const data = await response.json();

        if (data.Answer) {
            const ipAddress = data.Answer[0].data;
            ipAddressElement.innerText = ipAddress;

            // Simulate DNS hierarchy
            const tld = domain.split('.').slice(-1)[0];
            tldServerElement.innerText = `${tld.toUpperCase()} Server`;

            const authServer = `${domain} NS Server`;
            authServerElement.innerText = authServer;

            // Simulate DNS caching
            const ttl = data.Answer[0].TTL;
            cacheStatusElement.innerText = `Cached (TTL: ${ttl} seconds)`;
        } else {
            ipAddressElement.innerText = 'Not found';
            cacheStatusElement.innerText = 'Not cached';
        }
    } catch (error) {
        ipAddressElement.innerText = 'Error';
        cacheStatusElement.innerText = 'Failed to resolve';
    }
});
