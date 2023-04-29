const modal = {

    init: () => {
        modal.initOpeners()
        modal.initClosers()
        modal.initFrameWatchers()
    },

    initOpeners: () => document.querySelectorAll('.modal-btn').forEach(
        btn => modal.addBtnOpenerListener(btn, btn.dataset.modalTarget)
    ),

    initClosers: () => document.querySelectorAll('.modal-closer').forEach(
        btn => modal.addBtnCloserListener(btn, btn.parentElement.parentElement)
    ),

    initFrameWatchers: () => document.querySelectorAll('iframe').forEach(
        frame => frame.addEventListener('load', modal.frameLoaded)
    ),

    frameLoaded: loadEvent => window.scrollTo(0, 0),

    addBtnOpenerListener: (btn, modalTarget) => btn.addEventListener(
        'click',
        () => modal.showModal(document.querySelector(modalTarget))
    ),

    addBtnCloserListener: (btn, modalTarget) => btn.addEventListener(
        'click',
        () => modal.closeModal(modalTarget)
    ),

    showModal: modal => {
        modal.classList.add('show')
        window.activeModalId = modal.id
        window.scrollTo(0, 0)
    },

    closeModal: modal => {
        modal.classList.remove('show')
        delete window.activeModalId
        window.scrollTo(0, 0)
    }

}

window.addEventListener('load', modal.init)
