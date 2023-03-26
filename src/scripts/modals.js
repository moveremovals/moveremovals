const modal = {

    init: () => {
        modal.initOpeners()
        modal.initClosers()
    },

    initOpeners: () => document.querySelectorAll('.modal-btn').forEach(
        (btn) => modal.addBtnOpenerListener(btn, btn.dataset.modalTarget)
    ),

    initClosers: () => document.querySelectorAll('.modal-closer').forEach(
        (btn) => modal.addBtnCloserListener(btn, btn.dataset.modalTarget)
    ),

    addBtnOpenerListener: (btn, modalTarget) => btn.addEventListener(
        'click',
        () => modal.showModal(modalTarget)
    ),

    addBtnCloserListener: (btn, modalTarget) => btn.addEventListener(
        'click',
        () => modal.closeModal(modalTarget)
    ),

    showModal: (modalId) => {
        document.querySelector(modalId).classList.add('show')
        window.activeModalId = modalId
        window.scrollTo(0, 0)
    },

    closeModal: (modalId) => {
        document.querySelector(modalId).classList.remove('show')
        delete window.activeModalId
        window.scrollTo(0, 0)
    }

}

window.addEventListener('load', modal.init)
