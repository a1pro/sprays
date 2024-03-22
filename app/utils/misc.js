function removeTrailingSlash(s) {
    return s.endsWith('/') ? s.slice(0, -1) : s
}

function getDomainUrl(request) {
    const host =
        request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
    if (!host) {
        throw new Error('Could not determine domain URL.')
    }
    const protocol = host.includes('localhost') ? 'http' : 'https'
    return `${protocol}://${host}`
}

function typedBoolean(value) {
    return Boolean(value)
}

function createFacebookShareLink(blogPostUrl) {
    const facebookShareBaseUrl = "https://www.facebook.com/sharer/sharer.php";
    return `${facebookShareBaseUrl}?u=${encodeURIComponent(blogPostUrl)}`;
}

function shareThisBlogPostViaEmail(currentUrl, emailSubject) {
    const emailBody = `Hi,\n\nI wanted to share this link with you: ${currentUrl}`;
    return `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}


export {
    shareThisBlogPostViaEmail,
    createFacebookShareLink,
    removeTrailingSlash,
    getDomainUrl,
    typedBoolean
}