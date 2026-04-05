function animateCounter(id, target) {
    let current = 0;
    const element = document.getElementById(id);
    const step = () => {
        if (current < target) {
            current++;
            element.innerText = current + "%";
            setTimeout(step, 20);
        }
    };
    step();
}

window.onload = () => {
    animateCounter("num90", 90);
    animateCounter("num95", 95);

    const offset90 = 440 - (440 * 90) / 100;
    const offset95 = 440 - (440 * 95) / 100;

    document.getElementById("circle90").style.strokeDashoffset = offset90;
    document.getElementById("circle95").style.strokeDashoffset = offset95;
};