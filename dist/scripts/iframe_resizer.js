window.addEventListener('load', function() {

    let iframes = document.getElementsByTagName('iframe')

    console.log(iframes.length)

    for (var i = 0; i < iframes.length; i++) {
        console.log(iframes[i])
        resizeIframe(iframes[i])
        iframes[i].addEventListener('load', resizeIframe)
    }
})

function resizeIframe(iframe) {
    const iframeBody = iframe.contentWindow.document.body
    const height = Math.max(iframeBody.scrollHeight, iframeBody.offsetHeight)
    iframe.style.height = `${height}px`
}