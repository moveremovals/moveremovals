const modal = {

    init: () => {
        modal.initOpeners()
        modal.initClosers()
    },

    initOpeners: () => document.querySelectorAll('.modal-btn').forEach(
        (btn) => btn.addEventListener('click', () => modal.showModal(btn.dataset.modalTarget))
    ),

    initClosers: () => document.querySelectorAll('.modal-closer').forEach(
        (btn) => btn.addEventListener('click', () => modal.closeModal(btn.dataset.modalTarget))
    ),

    showModal: (modalId) => document.querySelector(modalId).classList.add('show'),

    closeModal: (modalId) => document.querySelector(modalId).classList.remove('show'),

}

window.addEventListener('load', modal.init)