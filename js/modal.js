document.getElementById("open-modal-btn1").addEventListener("click", function() {
    document.getElementById("my-modal1").classList.add("open");
})
document.getElementById("close-my-modal-btn1").addEventListener("click", function() {
    document.getElementById("my-modal1").classList.remove("open");
})

document.querySelector("#my-modal1 .modal-box").addEventListener("click", event => {
    event._isClickWithinModal = true;
})
document.getElementById("my-modal1").addEventListener("click", event => {
    if (event._isClickWithinModal) return ;
    event.currentTarget.classList.remove("open");
});
document.getElementById("open-modal-btn2").addEventListener("click", function() {
    document.getElementById("my-modal2").classList.add("open");
})
document.getElementById("close-my-modal-btn2").addEventListener("click", function() {
    document.getElementById("my-modal2").classList.remove("open");
})

document.querySelector("#my-modal2 .modal-box").addEventListener("click", event => {
    event._isClickWithinModal = true;
})
document.getElementById("my-modal2").addEventListener("click", event => {
    if (event._isClickWithinModal) return ;
    event.currentTarget.classList.remove("open");
});