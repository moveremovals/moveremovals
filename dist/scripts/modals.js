const modal = {

    init: () => {
        modal.initOpeners()
        modal.initClosers()
        modal.initFfListeners()
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

    initFfListeners: () => {
        const ffForm = document.getElementById('ff-compose')
        const observer = new MutationObserver(() => {
            let ffSuccess = document.getElementById('ff-success')

            if (ffSuccess) {
                let dismissFFBtn = document.createElement('button')
                dismissFFBtn.dataset.modalTarget = window.activeModalId
                dismissFFBtn.classList.add('modal-closer-btn')
                dismissFFBtn.innerText = 'Dismiss'
                modal.addBtnCloserListener(dismissFFBtn, window.activeModalId)
                ffSuccess.parentElement.appendChild(dismissFFBtn)
            }
        })
        observer.observe(ffForm, {childList: true})
    },

    showModal: (modalId) => {
        document.querySelector(modalId).classList.add('show')
        document.body.classList.add('modal-showing')
        window.activeModalId = modalId
    },

    closeModal: (modalId) => {
        document.querySelector(modalId).classList.remove('show')
        document.body.classList.remove('modal-showing')
        delete window.activeModalId
    }

}

window.addEventListener('load', modal.init)
